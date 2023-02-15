import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { useColorMode } from "@docusaurus/theme-common";
import React, { useState } from "react";
import styles from "./styles.module.css";

const DocsRating = ({ label }) => {
    const { colorMode, setColorMode } = useColorMode();
    const helpfulString =
        label === "top" ? "Helpful" : "Was this page helpful?";
    if (!ExecutionEnvironment.canUseDOM) {
        return null;
    }
    const [vote, setVote] = useState(undefined);
    const giveFeedback = (value) => {
        if (window.gtag) {
            window.gtag("send", {
                hitType: "event",
                eventCategory: "button",
                eventAction: "feedback",
                eventLabel: label,
                eventValue: value,
            });
        }
        setVote(value);
    };

    return (
        <div className={styles.content}>
            <div className={styles.innerContent}>
                <div
                    className={styles.font}
                    style={{
                        color:
                            colorMode === "dark"
                                ? "rgba(255, 255, 255, 0.6)"
                                : "rgba(0, 0, 0, 0.6)",
                    }}
                >
                    {vote !== undefined
                        ? "Thanks for letting us know!"
                        : helpfulString}
                </div>
                {vote === undefined || vote === 1 ? (
                    <img
                        style={{
                            cursor: vote === undefined ? "pointer" : "unset",
                            backgroundColor: "#97E910",
                            borderRadius: 16,
                        }}
                        onClick={() => !vote && giveFeedback(1)}
                        height={16}
                        src="/img/face-smile-regular.svg"
                    />
                ) : null}
                {vote === undefined || vote === 0 ? (
                    <img
                        style={{
                            cursor: vote === undefined ? "pointer" : "unset",
                            backgroundColor: "#FFE606",
                            borderRadius: 16,
                        }}
                        onClick={() => !vote && giveFeedback(0)}
                        height={16}
                        src="/img/face-meh-regular.svg"
                    />
                ) : null}
                {vote === undefined || vote === -1 ? (
                    <img
                        style={{
                            cursor: vote === undefined ? "pointer" : "unset",
                            backgroundColor: "#FF431A",
                            borderRadius: 16,
                        }}
                        onClick={() => !vote && giveFeedback(-1)}
                        height={16}
                        src="/img/face-frown-regular.svg"
                    />
                ) : null}
            </div>
        </div>
    );
};

export default DocsRating;
