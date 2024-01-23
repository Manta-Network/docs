import React from "react";
import { useEffect, useState, forwardRef, useRef } from "react";
import { Message, TypingDots } from "./Message";
import { Cross1Icon } from "./icons/Cross1Icon";
import styles from "./ChefGPTContainer.module.css";
import clsx from "clsx";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import { useChefGPTConsumer } from "../context/index";

export const ChefGPTContainer = forwardRef(
  ({
    expanded = false,
    onClose,
  }: {
    expanded?: boolean;
    onClose: () => void;
  }, ref) => {
    const {
      suggestions: premadeQuestions,
      messageInputPlaceholder,
      dialogTitle,
      ui,
    } = useChefGPTConsumer().config;
    useLockBodyScroll();
    const [input, setInput] = useState("");
    const { askQuestion, messages, pendingMessage } = useChefGPTConsumer();
    const isTyping = !!pendingMessage?.typing;

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      setInput(event.target.value);
    };

    const handleSubmitPremade = async (question: string) => {
      setTimeout(() => {
        scrollToBottom(false);
      }, 100);
      await askQuestion?.(question);
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
      event.preventDefault();
      if (input === "") {
        return alert("Please enter your question"); // TODO: replace with toast component
      }
      setInput("");
      setTimeout(() => {
        scrollToBottom(false);
      }, 100);
      await askQuestion?.(input);
    };

    const messagesRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = (checkIfAtBottom = true) => {
      if (!messagesRef.current) return;

      const { scrollHeight, scrollTop } = messagesRef.current as HTMLDivElement;
      if (!checkIfAtBottom || scrollTop >= -50) {
        messagesRef.current?.scrollTo(0, scrollHeight);
      }
    };

    useEffect(() => {
      scrollToBottom();
    }, [pendingMessage?.content, messages.map((message) => message.content)]);

    return (
      <div
        ref={ref}
        role="button"
        aria-expanded="true"
        aria-haspopup="listbox"
        aria-labelledby="docsearch-label"
        tabIndex={0}
        className={clsx(
          styles.modalOuterContainer,
          ui?.outerContainer?.className,
        )}
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={clsx(
            styles.container,
            expanded ? styles.container__expanded : "",
            ui?.modalContainer?.className,
          )}
          style={
            ui?.modalContainer &&
            ({
              "--cookbook-modal-width": ui?.modalContainer?.width,
              "--cookbook-modal-height": ui?.modalContainer?.height,
              "--cookbook-modal-shadow": ui?.modalContainer?.shadow,
              "--cookbook-modal-background": ui?.modalContainer?.background,
            } as any)
          }
        >
          <button
            onClick={onClose}
            className={clsx("clean-btn", styles.closeBtn)}
          >
            <Cross1Icon width={18} height={18} />
          </button>
          {/* {expand && (
            <div className={styles.maximizeButton} onClick={expand}>
              <EnterFullScreenIcon className={styles.buttonIcon} />
            </div>
          )} */}
          <div
            className={clsx(
              styles.poweredByContainer,
              "padding-top--sm",
              "padding-bottom--sm",
            )}
          >
            <a
              className={clsx(
                "breadcrumbs__link",
                styles.notActive,
                styles.poweredByCookbook,
              )}
            >
              <img
                className={styles.poweredByCookbookLogo}
                src="https://cookbook.dev/img/logo.svg"
                alt="Cookbook.dev"
              />
              {dialogTitle}
            </a>

            {/* <a
              href="https://cookbook.dev"
              target="_blank"
              className={clsx("breadcrumbs__link", styles.poweredByCookbook)}>
              Powered by
              <img
                className={styles.poweredByCookbookLogo}
                src="https://cookbook.dev/img/logo.svg"
                alt="Cookbook.dev"
              />
              Cookbook.dev
            </a> */}
          </div>
          <div
            ref={messagesRef}
            className={clsx(
              styles.readSection,
              ui?.messagesContainer?.className,
            )}
          >
            {" "}
            {/* css={[tw`gradient-mask-t-90`]} */}
            {isTyping && (
              <Message
                key={pendingMessage.uuid}
                text={
                  pendingMessage.content !== ""
                    ? pendingMessage.content
                    : undefined
                }
                typing={true}
                isUser={false}
              />
            )}
            {messages.map((message) => (
              <Message
                key={message.uuid}
                text={message.content}
                isUser={message.role === "user"}
                typing={false}
              />
            ))}
          </div>
          <div
            className={clsx(
              styles.suggestionsContainer,
              "margin-bottom--sm",
              ui?.suggestionsContainer?.className,
            )}
          >
            <div className={styles.tags}>
              {premadeQuestions
                .filter(
                  (question: string) =>
                    !input // if input is empty, show all premade questions
                      ? true
                      : question.toLowerCase().includes(input.toLowerCase()), // else, show only premade questions that match the input
                )
                .map((question: string) => (
                  <button
                    className="button button--secondary button--block"
                    onClick={() => handleSubmitPremade(question)}
                    key={question}
                  >
                    {question}
                  </button>
                ))}
            </div>
          </div>
          <div className={styles.column}>
            <form
              className={clsx(
                styles.writeSection,
                ui?.messageInputContainer?.className,
              )}
              onSubmit={handleSubmit}
            >
              <input
                aria-autocomplete="both"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                enterKeyHint="search"
                spellCheck="false"
                maxLength={64}
                type="search"
                className={clsx(
                  styles.inputField,
                  ui?.messageInputField?.className,
                )}
                value={input}
                placeholder={messageInputPlaceholder}
                onChange={handleChange}
              />
              <button
                type="submit"
                disabled={isTyping}
                className="clean-btn button button--primary"
                style={{ minWidth: 85 }}
              >
                {isTyping ? <TypingDots /> : "Send"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  },
);
ChefGPTContainer.displayName = "ChefGPTContainer";
