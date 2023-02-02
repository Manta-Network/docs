import React, { useState } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import styles from "./styles.module.css";
import mehFace from "../../static/img/face-meh-regular.svg";
import smileFace from "../../static/img/face-smile-regular.svg";
import frownFace from "../../static/img/face-frown-regular.svg";


const DocsRating = ({ label }) => {
	if (!ExecutionEnvironment.canUseDOM) {
		return null;
	}

	const [haveVoted, setHaveVoted] = useState(false);
	const giveFeedback = (value) => {
		if (window.ga) {
			window.ga("send", {
				hitType: "event",
				eventCategory: "button",
				eventAction: "feedback",
				eventLabel: label,
				eventValue: value,
			});
		}
		setHaveVoted(true);
	};

	return (
		<div className={styles.content}>
			{haveVoted ? "Thanks for letting us know!" : "Helpful?"}
			<div className={styles.button} onClick={() => giveFeedback(1)}>
				Good
			</div>
			<img src="smileFace" />
			<img src="mehFace" />
			<img src="frownFace" />
			<div className="rate-button" onClick={() => giveFeedback(0)}>
				Bad
			</div>
		</div>
	);
};

export default DocsRating;
