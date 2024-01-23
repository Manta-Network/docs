export type Message = {
  uuid: string; // Unique identifier for each message, to be used in the key prop
  role: "user" | "assistant";
  content: string;
  typing: boolean;
};

export type askQuestionFn = (question: string) => Promise<void>;
