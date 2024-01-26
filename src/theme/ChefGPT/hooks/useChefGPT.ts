import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import track from "../track";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { CookbookDocsBotConfig } from "../types";
import { openDB } from "idb";

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

  const setDefaultMessages = (): [Message] => [
    {
      uuid: uuidv4(),
      role: "assistant",
      content: initialMessage,
      typing: false,
    },
  ];
  const [messages, setMessages] = useState<Message[]>(setDefaultMessages);

  const setDefaultPendingMessage = () =>
  ({
    role: "assistant",
    typing: false,
    content: "",
    uuid: uuidv4(),
  } as const);

  const [pendingMessage, setPendingMessage] = useState<Message>(
    setDefaultPendingMessage
  );
  const [recommendations, setRecommendations] = useState([])
  // Once the pending message is typed out, add it to the messages array and reset the pending message to default
  useEffect(() => {
    if (!pendingMessage.typing && pendingMessage.content.length > 0) {
      addMessage(pendingMessage);
      setPendingMessage(setDefaultPendingMessage);
    }
  }, [pendingMessage.typing]);

  const [threads, setThreads] = useState<Thread[]>([]);
  const fetchSignals = useRef<AbortController[]>([]);

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

  const [currentThreadId, setCurrentThreadId] = useState<string | null>(null);
  const [currentThreadUUID, setCurrentThreadUUID] = useState<string | null>(
    null
  );

  useEffect(() => {
    return () => {
      fetchSignals.current.forEach((signal) => signal.abort());
    };
  }, [currentThreadId]);

  const handleChangeThread = (threadId: string | null) => {
    if (threadId === null) {
      setCurrentThreadId(null);
      setCurrentThreadUUID(null);
      setMessages(setDefaultMessages());
      setPendingMessage(setDefaultPendingMessage);
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
            uuid: message._id,
            ...message,
          })) ?? [];
        setCurrentThreadId(threadId);
        setPendingMessage(setDefaultPendingMessage);
        setMessages(() => [...setDefaultMessages(), ...messages]);
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

  const finishedTyping = useCallback(() => {
    // Set typing to false which will trigger the useEffect above
    // to add the pending message to the messages array
    setTimeout(() => setPendingMessage((prevMessage) => ({ ...prevMessage, typing: false })));
  }, []);

  /**
   *
   * @param _message - Message to be added to messages array
   * @returns uuid of message
   */
  const addMessage = (_message: Omit<Message, "uuid">) => {
    const message = { uuid: uuidv4(), ..._message }; // Add uuid to message if it doesn't exist
    setMessages((prevMessages) => [...prevMessages, message]);
    return message.uuid;
  };

  const askQuestion: AskQuestionFn = async (question) => {
    if (pendingMessage.typing) {
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

    setPendingMessage((prev) => ({
      ...prev,
      typing: true,
    }));

    // Add user message to messages array
    const messageUUID = addMessage({
      role: "user" as const,
      content: question,
      typing: false,
    });

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

      const signal = new AbortController();
      const body = JSON.stringify({
        type: "docsbot",
        question,
        data: payload,
        threadId: thread._id,
        ...(thread.uuid && { threadUUID: thread.uuid }), // uuid is added to threads created by anonymous users
      });
      fetchSignals.current.push(signal);
      let recommendations = getRecommendations(body)
      const response = await fetch(`${apiBaseUrl}/chefgpt/new-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        priority: "high",
        credentials: "include",
        body,
        signal: signal.signal,
      });
      let [finalizedRecommendations] = await Promise.all([recommendations])

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      /* Processing stream start */
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const newValue = decoder.decode(value).split("\n\n").filter(Boolean);

        newValue.forEach((newVal) => {
          let serverMessage;
          try {
            setTimeout(() => {
              serverMessage = JSON.parse(newVal.replace("data: ", ""));
              setPendingMessage(({ content: prevContent, ...prevMessage }) => ({
                ...prevMessage,
                content: prevContent + serverMessage, // Concatenate new message content received from server to previous message content
                typing: true,
              }));
            });
          } catch (err) {
            console.error("Error parsing server message", newVal);
            return;
          }
        });
      }
      /* Processing stream end */
      fetchSignals.current = fetchSignals.current.filter(
        (signal) => signal !== signal
      );
      getThread(thread).then(async (thread) => {
        await updateThread(thread);
      });
      setRecommendations(finalizedRecommendations)
    } catch (err) {
      // Because we optimistaclly added the message to the messages array before, we need to remove it if the request fails
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message.uuid !== messageUUID)
      );
      if (err.name === "AbortError") {
        // Do nothing
      } else {
        console.error("Error while asking question", err);
        alert("Something went wrong while asking question. Please try again.");
      }
    } finally {
      // stream ended
      finishedTyping();
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
    }).then((res) => res.json())
    return JSON.parse(response.response) // error handling
  }

  const clearMessages = () => {
    setMessages(setDefaultMessages);
    setPendingMessage(setDefaultPendingMessage);
  };

  return [
    messages,
    recommendations,
    pendingMessage,
    askQuestion,
    {
      clearMessages,
      currentThreadId,
      setCurrentThreadId: handleChangeThread,
      threads,
      deleteThread,
      updateThread,
    },
  ] as const;
};

export type Message = {
  uuid: string; // Unique identifier for each message, to be used in the key prop
  role: "user" | "assistant";
  content: string;
  typing: boolean;
};
export type Thread = {
  _id: string;
  uuid?: string;
  messages: Message[];
  firstQuestion?: string;
};
export type AskQuestionFn = (question: string) => Promise<void>;
