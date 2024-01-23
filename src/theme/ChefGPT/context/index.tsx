import { createContext, useContext } from "react";
import { type Message, type askQuestionFn } from "./types";
import type { CookbookDocsBotConfig } from "../types";
import { CookbookDocsDefaultConfig } from "../defaultConfig";

export type ChefGPTContextType = {
  messages: Message[];
  pendingMessage: Message | null;
  askQuestion: askQuestionFn | null;
  config: CookbookDocsBotConfig;
};

const defaultValue: ChefGPTContextType = {
  messages: [],
  pendingMessage: null,
  askQuestion: null,
  config: CookbookDocsDefaultConfig,
};
export const ChefGPTContext = createContext<ChefGPTContextType>(defaultValue);
export const ChefGPTProvider = ChefGPTContext.Provider;
export function useChefGPTConsumer() {
  const context = useContext(ChefGPTContext);

  if (!context) {
    throw new Error("useChefGPTConsumer must be used within a ChefGPTProvider");
  }

  return context;
}
