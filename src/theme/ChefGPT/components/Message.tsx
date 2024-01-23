import React from "react";
import MDParser from "./MDParser";
import styles from "./Message.module.css";
import clsx from "clsx";
import { useChefGPTConsumer } from "../context/index";

export const TypingDots = () => (
  <div className="flex">
    <span className={styles.typingDot}>.</span>
    <span className={styles.typingDot}>.</span>
    <span className={styles.typingDot}>.</span>
  </div>
);

export const Message = ({
  text,
  typing = false,
  isUser,
  className,
  messageTextClassName,
}: {
  text: string | undefined;
  typing?: boolean;
  isUser: boolean;
  className?: string;
  messageTextClassName?: string;
}) => {
  const { config } = useChefGPTConsumer();

  return (
    <div className={clsx(styles.messageContainer, className)}>
      <img
        width={40}
        height={40}
        style={{ borderRadius: "10px" }}
        src={
          isUser ? config.avatars.User : config.avatars.ChefGPT
        }
        alt="NFT icon"
      />
      {isUser ? (
        <div className={clsx(styles.messsageText, messageTextClassName)}>
          <MDParser typing={typing} content={text} />
        </div>
      ) : !text ? (
        <div className={clsx(styles.messsageText, messageTextClassName)}>
          <div className={styles.typingAnimationContainer}>
            <p>ChefGPT is typing</p>
            <TypingDots />
          </div>
        </div>
      ) : (
        <div className={clsx(styles.messsageText, messageTextClassName)}>
          <MDParser typing={typing} content={text} />
        </div>
      )}
    </div>
  );
};
