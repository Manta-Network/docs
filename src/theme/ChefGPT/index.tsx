import React, { useCallback, useState } from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useEventListener } from "./hooks/useEventListener";
import { ChefGPTProvider } from "./context/index";
import { ChefGPTContainer } from "./components/ChefGPTContainer";
import { mergeConfig } from "./utils/mergeConfig";
import { CookbookDocsConfigKey } from "./defaultConfig";
import { useChefGPT } from "./hooks/useChefGPT";

import styles from "./index.module.css";
import { CookbookDocsBotConfig } from "./types";

export const ChefGPT = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const [textSelected, setTextSelected] = useState<string | null>(null);

  const { siteConfig } = useDocusaurusContext();
  if (!(CookbookDocsConfigKey in siteConfig.themeConfig)) {
    throw new Error(
      `Please add the ${CookbookDocsConfigKey} key to the "themeConfig" in docusaurus.config.js`
    );
  }
  const config = mergeConfig(
    siteConfig.themeConfig[CookbookDocsConfigKey] as CookbookDocsBotConfig
  ) as CookbookDocsBotConfig;

  const [messages, recommendations, askQuestion, helpers] = useChefGPT(config);

  const handleSelectionChange = useCallback(() => {
    if (!config.features?.enableExplainSnippet) return;

    const selection =
      (typeof window !== "undefined" && window?.getSelection()?.toString()) ||
      null;
    setTextSelected(selection);
  }, []);
  useEventListener(typeof window !== "undefined" && window?.document, "selectionchange", handleSelectionChange);
  const isAnalyzeMode =
    !!config.features?.enableExplainSnippet && !!textSelected && !modalOpen;

  const handleAnalyzeSnippet = (snippet: string) => {
    if (!askQuestion) return;
    const prompt = config.explainPromptTemplate?.replace("$1", snippet);
    if (!prompt) return;
    askQuestion(prompt);
  };

  const handleOpen = () => {
    setModalOpen(true);
    if (isAnalyzeMode) {
      handleAnalyzeSnippet(textSelected);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    setTextSelected(null);
  };

  return (
    <ChefGPTProvider
      value={{
        askQuestion,
        messages,
        recommendations,
        config,
        helpers,
        typing: helpers?.typing,
      }}
    >
      <button
        onClick={handleOpen}
        className={clsx(
          "clean-btn button button--secondary",
          styles.openModalButton,
          config.ui?.openModalButton?.className,
          {
            "button--secondary": !isAnalyzeMode,
            [clsx("button--success", styles.openModalButtonActive)]:
              isAnalyzeMode,
          }
        )}
      >
        {textSelected ? "Explain" : "ChefGPT"}
      </button>

      {modalOpen && <ChefGPTContainer onClose={handleClose} />}
    </ChefGPTProvider>
  );
};
