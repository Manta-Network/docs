import type { CookbookDocsConfigKey } from "./defaultConfig.js";
export type CookbookDocsBotDataSources = "Linea" | "Infura" | "Metamask";

type TFeatures = {
  enableExplainSnippet?: boolean;
} & {
  [key: string]: boolean;
};

export type CookbookDocsBotConfig = {
  // Optional
  features?: TFeatures,
  ui?: {
    outerContainer?: {
      className?: string;
    };
    modalContainer?: {
      width?: string;
      height?: string;
      background?: string;
      shadow?: string;
      className?: string;
    };
    messagesContainer?: {
      className?: string;
    };
    suggestionsContainer?: {
      className?: string;
    };
    messageInputContainer?: {
      className?: string;
    };
    messageInputField?: {
      className?: string;
    };
    openModalButton?: {
      className?: string;
    };
  };
  preTextPrompt?: null | string;
  apiBaseUrl?: string;
  extraTrackingData?: Record<string, any>;
  messageInputPlaceholder?: string;
  explainPromptTemplate?: string;

  // Mandatory
  dataSources: Array<{
    name: CookbookDocsBotDataSources;
    hostname: string;
  }>;
  greetingMessage: string;
  dialogTitle: string;
  suggestions: string[];
  avatars: {
    ChefGPT: string;
    User: string;
  }
};

export type TCookbookDocsConfigKey = typeof CookbookDocsConfigKey;