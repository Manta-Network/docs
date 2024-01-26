import { createContext, useContext } from "react";
import { type Message, type askQuestionFn } from "./types";
import type { CookbookDocsBotConfig } from "../types";
import { CookbookDocsDefaultConfig } from "../defaultConfig";
import { useChefGPT } from "../hooks/useChefGPT";

export type ChefGPTContextType = {
  messages: Message[];
  recommendations: string[];
  pendingMessage: Message | null;
  askQuestion: askQuestionFn | null;
  config: CookbookDocsBotConfig;
  helpers: ReturnType<typeof useChefGPT>[3] | null;
};

const defaultValue: ChefGPTContextType = {
  messages: [],
  recommendations: [],
  pendingMessage: null,
  askQuestion: null,
  config: CookbookDocsDefaultConfig,
  helpers: null,
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
