import { CookbookDocsBotConfig } from "./types.js";

export const CookbookDocsConfigKey = "cookbookDocsBot" as const;
export const CookbookDocsDefaultConfig = {
  features: {
    enableExplainSnippet: true,
  },
  dataSources: [
    {
      name: "Linea",
      hostname: "https://docs.linea.build",
    },
    {
      name: "Infura",
      hostname: "https://docs.infura.io",
    },
    {
      name: "Metamask",
      hostname: "https://docs.metamask.io",
    },
  ],
  ui: {
    modalContainer: {
      width: "1000px",
      height: "800px",
      background: "rgba(47, 55, 69, 0.7)",
      shadow: "inset 1px 1px 0 0 #2c2e40, 0 3px 8px 0 #000309",
    },
    outerContainer: {},
    suggestionsContainer: {},
    messagesContainer: {},
    openModalButton: {},
    messageInputContainer: {},
    messageInputField: {},
  },
  explainPromptTemplate: "Please explain this part of the docs: ```$1```",
  preTextPrompt: null,
  greetingMessage: "Ask me anything about the docs!",
  dialogTitle: "ChefGPT",
  suggestions: [],
  apiBaseUrl: "https://simple-web3-api-staging.herokuapp.com",
  extraTrackingData: {},
  messageInputPlaceholder: "Ask a question",
  avatars: {
    ChefGPT: "/favicon.svg",
    User: "https://cookbook.dev/img/Richard.png"
  }
};
