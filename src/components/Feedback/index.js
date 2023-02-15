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
                    backgroundColor:
                        isDark && isTop ? "rgba(255, 255, 255, 0.05)" : null,
                }}
                className={clsx(
                    styles.innerContent,
                    isTop ? styles.topContainer : null
                )}
            >
                <div
                    className={styles.font}
                    style={{
                        color: isDark ? darkColor : lightColor,
                    }}
                >
                    {unVoted ? helpfulString : "Thanks for letting us know!"}
                </div>
                <Good
                    style={{
                        backgroundColor:
                            vote === RatingEnum.GOOD ? "#97E910" : "",
                        borderRadius: 16,
                    }}
                    className={styles.good}
                    fill={isLight || !unVoted ? lightColor : darkColor}
                    onClick={() => giveFeedback(RatingEnum.GOOD)}
                />
                <Normal
                    style={{
                        backgroundColor:
                            vote === RatingEnum.NORMAL ? "#FFE606" : "",
                        borderRadius: 16,
                    }}
                    className={styles.normal}
                    fill={isLight || !unVoted ? lightColor : darkColor}
                    onClick={() => giveFeedback(RatingEnum.NORMAL)}
                />
                <Bad
                    style={{
                        backgroundColor:
                            vote === RatingEnum.BAD ? "#FF431A" : "",
                        borderRadius: 16,
                    }}
                    className={styles.bad}
                    fill={isLight || !unVoted ? lightColor : darkColor}
                    onClick={() => giveFeedback(RatingEnum.BAD)}
                />
            </div>
        </div>
    );
};

export default DocsRating;
