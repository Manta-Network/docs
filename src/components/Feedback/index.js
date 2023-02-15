import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { useColorMode } from "@docusaurus/theme-common";
import React, { useState } from "react";
import styles from "./styles.module.css";

const RatingEnum = { GOOD: 1, NORMAL: 0, BAD: -1 };

const DocsRating = ({ label }) => {
    const { colorMode, setColorMode } = useColorMode();
    const helpfulString =
        label === "top" ? "Helpful" : "Was this page helpful?";
    if (!ExecutionEnvironment.canUseDOM) {
        return null;
    }
    const [vote, setVote] = useState(undefined);
    const unVoted = vote === undefined;
    const giveFeedback = (value) => {
        if (window.gtag) {
            window.gtag("event", "feedback_event", {
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
                    {unVoted
                        ? "Thanks for letting us know!"
                        : helpfulString}
                </div>
                {unVoted || vote === RatingEnum.GOOD ? (
                    <img
                        style={{
                            cursor: unVoted ? "pointer" : "unset",
                            backgroundColor:
                                vote === RatingEnum.GOOD ? "#97E910" : "",
                            borderRadius: 16,
                        }}
                        onClick={() => !vote && giveFeedback(RatingEnum.GOOD)}
                        height={16}
                        src="/img/face-smile-regular.svg"
                    />
                ) : null}
                {unVoted || vote === RatingEnum.NORMAL ? (
                    <img
                        style={{
                            cursor: unVoted ? "pointer" : "unset",
                            backgroundColor:
                                vote === RatingEnum.NORMAL ? "#FFE606" : "",
                            borderRadius: 16,
                        }}
                        onClick={() =>
                            unVoted && giveFeedback(RatingEnum.NORMAL)
                        }
                        height={16}
                        src="/img/face-meh-regular.svg"
                    />
                ) : null}
                {unVoted || vote === RatingEnum.BAD ? (
                    <img
                        style={{
                            cursor: unVoted ? "pointer" : "unset",
                            backgroundColor:
                                vote === RatingEnum.BAD ? "#FF431A" : "",
                            borderRadius: 16,
                        }}
                        onClick={() => unVoted && giveFeedback(RatingEnum.BAD)}
                        height={16}
                        src="/img/face-frown-regular.svg"
                    />
                ) : null}
            </div>
        </div>
    );
};

export default DocsRating;
