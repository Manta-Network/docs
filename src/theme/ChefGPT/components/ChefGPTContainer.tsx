import React, { useMemo } from "react";
import { useEffect, useState, forwardRef, useRef } from "react";
import { Message, TypingDots } from "./Message";
import clsx from "clsx";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import { useChefGPTConsumer } from "../context/index";
import { TextArea } from "../components/TextArea";

import { Cross1Icon } from "./icons/Cross1Icon";
import { TrashIcon } from "./icons/TrashIcon";
import { GoIcon } from './icons/GoIcon';
import ReactScrollToBottom from "./react-scroll-to-bottom/src/index";
import styles from "./ChefGPTContainer.module.css";
import "./react-scroll-to-bottom/src/styles.css";
import { type Message as TMessage } from "../context/types";

export const ChefGPTContainer = forwardRef(
  (
    {
      expanded = false,
      onClose,
    }: {
      expanded?: boolean;
      onClose: () => void;
    },
    ref
  ) => {
    const {
      suggestions: premadeQuestions,
      messageInputPlaceholder,
      dialogTitle,
      ui,
    } = useChefGPTConsumer().config;
    useLockBodyScroll();
    const [input, setInput] = useState("");
    const { askQuestion, messages, recommendations, pendingMessage, helpers } =
      useChefGPTConsumer();
    const isTyping = !!pendingMessage?.typing;
    const { threads, setCurrentThreadId, currentThreadId } = helpers || {};
    const suggestedQuestions = recommendations.length ? recommendations : premadeQuestions
    console.log(suggestedQuestions)
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
      event
    ) => {
      setInput(event.target.value);
    };

    const handleSubmitPremade = async (question: string) => {
      setTimeout(() => {
        scrollToBottom(false);
      }, 100);
      await askQuestion?.(question);
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
      event
    ) => {
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

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [lastMouseDownElement, setLastMouseDownElement] =
      useState<HTMLElement | null>(null);

    const messagesToRender = [...messages, isTyping && pendingMessage].filter(Boolean);

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
          ui?.outerContainer?.className
        )}
        onMouseDown={(e) => {
          console.log(e.target);
          setLastMouseDownElement(e.target as HTMLElement);
        }}
        onClick={(e) => {
          if (e.target !== lastMouseDownElement || e.target !== e.currentTarget)
            return;
          onClose();
        }}
      >
        <div
          // onClick={(e) => e.stopPropagation()}
          // onMouseDownCapture={(e) => {
          //   console.log(e);
          //   e.stopPropagation();
          //   e.preventDefault();
          // }}
          // onMouseOut={(e) => {
          //   console.log('mouseOut');
          //   e.preventDefault();
          // }}
          className={clsx(
            styles.container,
            expanded ? styles.container__expanded : "",
            ui?.modalContainer?.className
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
          <div
            className={clsx(
              styles.header,
              "padding-top--sm",
              "padding-bottom--sm"
            )}
          >
            <a
              className={clsx(
                "breadcrumbs__link",
                styles.notActive,
                styles.poweredByCookbook
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

          <button
            onClick={onClose}
            className={clsx("clean-btn", styles.closeBtn)}
          >
            <Cross1Icon width={18} height={18} />
          </button>

          <div className={styles.row}>
            <div
              className={clsx([
                styles.sidebarWrapper,
                sidebarOpen && styles.sidebarWrapper__open,
              ])}
            >
              <div className={styles.sidebarContent}>
                <div
                  style={{
                    flexGrow: 1,
                    overflowX: "hidden",
                    overflowY: "scroll",
                  }}
                >
                  <h5
                    className={styles.option}
                    style={{
                      color: "var(--ifm-font-color-base)",
                      fontSize: "var(--ifm-h4-font-size)",
                      pointerEvents: "none",
                      marginBottom: 0,
                      paddingLeft: 12,
                    }}
                  >
                    History
                  </h5>
                  {threads?.map((thread) => (
                    <div
                      className={clsx([
                        styles.option,
                        currentThreadId === thread._id && styles.option__active,
                      ])}
                      key={thread._id}
                      onClick={() => {
                        setCurrentThreadId?.(thread._id);
                      }}
                    >
                      <span className={styles.optionLabel}>
                        {thread.firstQuestion ||
                          thread.messages?.[0]?.content ||
                          "Thread"}
                      </span>
                      <div className={styles.optionIcons}>
                        <div
                          role="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            if (
                              confirm(
                                "Are you sure you want to delete this thread? This action cannot be undone."
                              )
                            ) {
                              helpers?.deleteThread(thread);
                            }
                          }}
                          className={styles.buttonIcon}
                        >
                          <TrashIcon />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.sidebarBottomContainer}>
                  <button
                    onClick={() => setCurrentThreadId?.(null)}
                    style={{
                      width: "100%",
                    }}
                    className="clean-btn button button--secondary"
                  >
                    Start new chat
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.mainContentContainer}>
              {/* Sidebar Toggle Button */}
              <div className={styles.sidebarToggleContainer}>
                <button
                  style={{
                    width: "max-content",
                    padding: "0 10px",
                  }}
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={clsx("clean-btn button button--secondary", [
                    styles.sidebarToggleButton,
                    sidebarOpen && styles.sidebarToggleButton__open,
                  ])}
                />
              </div>

              <ReactScrollToBottom
                className={clsx(
                  styles.readSection,
                  ui?.messagesContainer?.className
                )}
                initialScrollBehavior="smooth"
              >
                {messagesToRender.map((message) => ((
                  <Message
                    key={message.uuid}
                    text={message.content !== "" ? message.content : undefined}
                    isUser={message.role === "user"}
                  />
                )))}
                {!isTyping &&
                  <div
                    className={clsx(
                      styles.suggestionsContainer,
                      "margin-bottom--sm",
                      ui?.suggestionsContainer?.className
                    )}
                  >
                    <div className={styles.tags}>
                      {suggestedQuestions
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
                }
              </ReactScrollToBottom>
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  bottom: 20,
                  left: 0,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className={styles.column}>
                  <form
                    className={clsx(
                      styles.writeSection,
                      ui?.messageInputContainer?.className
                    )}
                    onSubmit={handleSubmit}
                  >
                    <TextArea
                      $size={2}
                      type="text"
                      $variant="surface"
                      placeholder={messageInputPlaceholder}
                      value={input}
                      onChange={handleChange}
                      $withButton
                      dynamicHeight
                    />
                    <button
                      type="submit"
                      disabled={isTyping}
                      className={clsx(
                        "clean-btn button",
                        styles.sendButton
                      )}
                    >
                      {isTyping ?
                        <TypingDots />
                        :
                        <div>
                          <GoIcon style={{marginTop: "4px"}}/>
                        </div>
                      }
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
ChefGPTContainer.displayName = "ChefGPTContainer";
