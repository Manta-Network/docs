import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import track from "../track";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { CookbookDocsBotConfig } from "../types";
import { openDB } from "idb";
import { createChunkDecoder } from "../utils/createChunkDecoder";
import { useChat } from "../components/ai/hooks/useChat";
import { nanoid } from "../components/ai/shared/utils";
/**
 *
 * @param props -
 *  We could either pass in the contract name to be included in the default message
 *  or the initial message as a whole
 * @example
 * useChefGPT({ contractName: "UniswapV2Router02" }); // "Hey, I'm Richard. I can help answer any question about UniswapV2Router02 you might have. Ask away!"
 * useChefGPT({ initialMessage: "What is the address of UniswapV2Router02?" }); // "What is the address of UniswapV2Router02?"
 */
export const useChefGPT = (config: CookbookDocsBotConfig) => {
  const { siteMetadata } = useDocusaurusContext();
  const {
    greetingMessage: initialMessage,
    apiBaseUrl,
    preTextPrompt,
    dataSources,
    extraTrackingData,
  } = config;
  const defaultMessage = useRef({
    role: "assistant" as const,
    content: initialMessage,
    id: nanoid(),
  }).current;

  const [currentId, setCurrentId] = useState<string>(nanoid);
  const [currentThreadId, setCurrentThreadId] = useState<string | null>(null);
  const [currentThreadUUID, setCurrentThreadUUID] = useState<string | null>(
    null
  );

  const {
    append,
    messages,
    setMessages,
    isLoading: typing,
    stop: stopMessageStreaming,
  } = useChat({
    api: `${apiBaseUrl}/chefgpt/new-message`,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    id: currentId,
    initialMessages: [
      {
        id: uuidv4(),
        role: "assistant",
        content: initialMessage,
      },
    ],
  });

  const [recommendations, setRecommendations] = useState([]);

  const [threads, setThreads] = useState<Thread[]>([]);

  const getDb = async () => {
    return await openDB("chefgpt", 1, {
      upgrade(db) {
        db.createObjectStore("threads", {
          keyPath: "_id",
        });
      },
    });
  };
  const saveThread = async (thread: Thread) => {
    const db = await getDb();
    db.add("threads", thread);
    await updateThreads();
  };
  const getThreads = async () => {
    const db = await getDb();
    return await db.getAll("threads");
  };
  const updateThreads = async () => {
    return getThreads().then((threads) => {
      setThreads(threads);
    });
  };
  const updateThread = async (thread: Thread) => {
    const db = await getDb();
    db.put("threads", thread);
    await updateThreads();
  };
  const deleteThread = async (thread: Thread) => {
    const db = await getDb();
    db.delete("threads", thread._id);
    await updateThreads();
  };

  useEffect(() => {
    updateThreads();
  }, []);

  useEffect(() => {
    return () => {
      stopMessageStreaming();
    };
  }, [currentThreadId]);

  const handleChangeThread = (threadId: string | null) => {
    if (typing) {
      return alert('Please wait for Chef GPT to finish typing before switching threads.');
    };

    if (threadId === null) {
      setCurrentThreadId(null);
      setCurrentThreadUUID(null);
      setCurrentId(nanoid());
      setMessages([defaultMessage]);
      return;
    }

    const currentThread = threads?.find((thread) => thread._id === threadId);
    if (!currentThread) {
      throw new Error("Thread not found");
    }
    const currentThreadUUID = currentThread?.uuid ?? null;
    setCurrentThreadUUID(currentThreadUUID);

    getThread({ _id: threadId, uuid: currentThreadUUID }).then(
      async (thread) => {
        const messages =
          thread?.messages?.map((message) => ({
            id: message._id,
            ...message,
          })) ?? [];
        setCurrentThreadId(threadId);
        setMessages([defaultMessage, ...messages]);
        await updateThread(thread);
        await updateThreads();
      }
    );
    setCurrentThreadUUID(currentThread?.uuid ?? null);
  };

  const createNewThread = async (): Promise<Thread> => {
    return await fetch(`${apiBaseUrl}/chefgpt/thread/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        type: "docsbot",
      }),
    })
      .then((res) => res.json())
      .then((data) => data.thread)
      .then((thread) => {
        return thread;
      });
  };

  const getThread = async ({
    _id,
    uuid,
  }: {
    _id: string;
    uuid: string;
  }): Promise<Thread> => {
    return await fetch(`${apiBaseUrl}/chefgpt/thread/${_id}?uuid=${uuid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => data.thread)
      .then((thread) => {
        return thread;
      });
  };

  const getOrCreateThread = async (): Promise<Thread> => {
    if (!currentThreadId) {
      const thread = await createNewThread();
      setCurrentThreadId(thread._id);
      if (thread.uuid) setCurrentThreadUUID(thread.uuid); // uuid is added to threads created by anonymous users
      return thread;
    } else {
      // If thread already exists, we will just construct thread object from state
      return {
        _id: currentThreadId,
        ...(currentThreadUUID && { uuid: currentThreadUUID }), // uuid is added to threads created by anonymous users
      };
    }
  };

  const askQuestion: AskQuestionFn = async (question) => {
    if (typing) {
      alert(
        // TODO: convert to toast
        "Please wait for Chef GPT to finish typing before asking another question."
      );
      return;
    }
    if (!apiBaseUrl) throw new Error("apiBaseUrl is not defined");
    track(apiBaseUrl, "ChefGPT Used", {
      ...extraTrackingData,
      // We put extraTrackingData first, so it won't override the default values
      query: question,
      type: "docs",
      siteMetadata,
    });

    // // Add user message to messages array
    // const messageUUID = addMessage({
    //   role: "user" as const,
    //   content: question,
    //   typing: false,
    // });

    try {
      const payload = {
        preTextPrompt,
        dataSources: dataSources.map(({ name, hostname }) => ({
          name,
          hostname: `${hostname}/sitemap.xml`,
        })),
      };
      const thread = await getOrCreateThread();
      saveThread({
        ...thread,
        firstQuestion: question,
        messages: [],
      });

      const body = {
        type: "docsbot",
        question,
        data: payload,
        threadId: thread._id,
        ...(thread.uuid && { threadUUID: thread.uuid }), // uuid is added to threads created by anonymous users
      };
      append(
        {
          role: "user",
          content: question,
        },
        {
          options: {
            body,
          },
        }
      );
      const finalizedRecommendations = await getRecommendations(JSON.stringify(body)).catch((err) => {
        console.error("Error getting recommendations", err);
        return [];
      });
      setRecommendations(finalizedRecommendations);
      return;
      // const newMessagePromise = fetch(`${apiBaseUrl}/chefgpt/new-message`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //   // @ts-ignore
      //   priority: "high",
      //   credentials: "include",
      //   body,
      //   signal: signal.signal,
      // });

      // if (!response.ok) {
      //   throw new Error(response.statusText);
      // }

      // /* Processing stream start */
      // const reader = (response.body as any).getReader();
      // const decode = createChunkDecoder();
      // let content = "";
      // const uuid = pendingMessage.uuid;
      // async function readChunk() {
      //   const { done, value } = await reader.read();
      //   if (!done) {
      //     content += decode(value);
      //   }
      //   setPendingMessage({
      //     role: "assistant",
      //     content, // Concatenate new message content received from server to previous message content
      //     typing: true,
      //     uuid,
      //   });
      //   if (done) {
      //     reader.releaseLock();
      //     return;
      //   }

      //   if (done) {
      //     return;
      //   }
      //   await readChunk();
      // }

      // await readChunk();
      // /* Processing stream end */
      // fetchSignals.current = fetchSignals.current.filter(
      //   (signal) => signal !== signal
      // );
      // getThread(thread).then(async (thread) => {
      //   await updateThread(thread);
      // });
      // setRecommendations(finalizedRecommendations);
    } catch (err) {
      if (err.name === "AbortError") {
        // Do nothing
      } else {
        console.error("Error while asking question", err);
        alert("Something went wrong while asking question. Please try again.");
      }
    } finally {
      // stream ended
      // finishedTyping();
    }
  };

  const getRecommendations = async (body) => {
    const response = await fetch(`${apiBaseUrl}/chefgpt/get-recommendations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      priority: "high",
      credentials: "include",
      body,
    }).then((res) => res.json());
    const data = response.response;
    if (typeof data === "string") {
      return JSON.parse(data);
    } else {
      return data;
    }
  };

  return [
    messages,
    recommendations,
    askQuestion,
    {
      currentThreadId,
      setCurrentThreadId: handleChangeThread,
      threads,
      deleteThread,
      updateThread,
      typing,
    },
  ] as const;
};

// export type Message = {
//   uuid: string; // Unique identifier for each message, to be used in the key prop
//   role: "user" | "assistant";
//   content: string;
//   typing: boolean;
// };
export type Message = ReturnType<typeof useChat>["messages"][number];
export type Thread = {
  _id: string;
  uuid?: string;
  messages: Message[];
  firstQuestion?: string;
};
export type AskQuestionFn = (question: string) => Promise<void>;
