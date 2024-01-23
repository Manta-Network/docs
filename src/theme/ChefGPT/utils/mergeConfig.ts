import { CookbookDocsBotConfig } from "../types";
import { CookbookDocsDefaultConfig } from "../defaultConfig";

/**
 * Merges provided config with default config taking care of nested objects
 * @param config - config provided in docusaurus.config.js
 * @returns merged config
 */
export const mergeConfig = (
  config: CookbookDocsBotConfig,
) => {
  const apiBaseUrl = config.apiBaseUrl || CookbookDocsDefaultConfig.apiBaseUrl;

  return {
    ...CookbookDocsDefaultConfig,
    features: {
      ...CookbookDocsDefaultConfig.features,
      ...config.features,
    },
    extraTrackingData: {
      ...CookbookDocsDefaultConfig.extraTrackingData,
      ...config.extraTrackingData,
    },
    ui: {
      ...CookbookDocsDefaultConfig.ui,
      ...config.ui,
      outerContainer: {
        ...CookbookDocsDefaultConfig.ui.outerContainer,
        ...config.ui?.outerContainer,
      },
      modalContainer: {
        ...CookbookDocsDefaultConfig.ui.modalContainer,
        ...config.ui?.modalContainer,
      },
      messageInputField: {
        ...CookbookDocsDefaultConfig.ui.messageInputField,
        ...config.ui?.messageInputField,
      },
      messagesContainer: {
        ...CookbookDocsDefaultConfig.ui.messagesContainer,
        ...config.ui?.messagesContainer,
      },
      openModalButton: {
        ...CookbookDocsDefaultConfig.ui.openModalButton,
        ...config.ui?.openModalButton,
      },
    },
    ...config,
    apiBaseUrl: apiBaseUrl.endsWith("/") ? apiBaseUrl.slice(0, -1) : apiBaseUrl, // Remove trailing slash if present
  };
};
