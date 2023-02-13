import React, { useState } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import styles from "./styles.module.css";

const DocsRating = ({ label }) => {
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
                <div className={styles.font}>
                    {vote ? "Thanks for letting us know!" : "Helpful?"}
                </div>
                {vote === undefined || vote === 1 ? (
                    <img
                        onClick={() => giveFeedback(1)}
                        height={25}
                        src="/img/face-smile-regular.svg"
                    />
                ) : null}
                {vote === undefined || vote === 0 ? (
                    <img
                        onClick={() => giveFeedback(0)}
                        height={25}
                        src="/img/face-meh-regular.svg"
                    />
                ) : null}
                {vote === undefined || vote === -1 ? (
                    <img
                        onClick={() => giveFeedback(-1)}
                        height={25}
                        src="/img/face-frown-regular.svg"
                    />
                ) : null}
            </div>
        </div>
    );
};

export default DocsRating;
