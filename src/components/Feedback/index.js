import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { useColorMode } from "@docusaurus/theme-common";
import clsx from "clsx";
import React, { useState } from "react";
import Bad from "./Bad";
import Good from "./Good";
import Normal from "./Normal";
import styles from "./styles.module.css";

const RatingEnum = { GOOD: 1, NORMAL: 0, BAD: -1 };

const DocsRating = ({ label }) => {
    const { colorMode, setColorMode } = useColorMode();
    const isDark = colorMode === "dark";
    const isLight = colorMode === "light";
    const darkColor = "rgba(255,255,255,0.6)";
    const lightColor = "rgba(0,0,0,0.6)";
    const isTop = label === "top";
    const helpfulString = isTop ? "Helpful" : "Was this page helpful?";
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
            <div
                style={{
                    backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "",
                }}
                className={clsx(
                    styles.innerContent,
                    isTop ? styles.topContainer : null
                )}
            >
                <div
                    className={styles.font}
                    style={{
                        color: isDark
                            ? "rgba(255, 255, 255, 0.6)"
                            : "rgba(0, 0, 0, 0.6)",
                    }}
                >
                    {unVoted ? helpfulString : "Thanks for letting us know!"}
                </div>
                {unVoted || vote === RatingEnum.GOOD ? (
                    <Good
                        style={{
                            cursor: unVoted ? "pointer" : "unset",
                            backgroundColor:
                                vote === RatingEnum.GOOD ? "#97E910" : "",
                            borderRadius: 16,
                        }}
                        fill={isLight || !unVoted ? lightColor : darkColor}
                        onClick={() => unVoted && giveFeedback(RatingEnum.GOOD)}
                    />
                ) : null}
                {unVoted || vote === RatingEnum.NORMAL ? (
                    <Normal
                        style={{
                            cursor: unVoted ? "pointer" : "unset",
                            backgroundColor:
                                vote === RatingEnum.NORMAL ? "#FFE606" : "",
                            borderRadius: 16,
                        }}
                        fill={isLight || !unVoted ? lightColor : darkColor}
                        onClick={() =>
                            unVoted && giveFeedback(RatingEnum.NORMAL)
                        }
                    />
                ) : null}
                {unVoted || vote === RatingEnum.BAD ? (
                    <Bad
                        style={{
                            cursor: unVoted ? "pointer" : "unset",
                            backgroundColor:
                                vote === RatingEnum.BAD ? "#FF431A" : "",
                            borderRadius: 16,
                        }}
                        fill={isLight || !unVoted ? lightColor : darkColor}
                        onClick={() => unVoted && giveFeedback(RatingEnum.BAD)}
                    />
                ) : null}
            </div>
        </div>
    );
};

export default DocsRating;
