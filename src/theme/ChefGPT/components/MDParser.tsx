import React from "react";
import MDXComponents from "@theme/MDXComponents";
import "./MDParser.css";
import ReactMarkdown from "react-markdown";

const MDParser = ({ content }) => {
  return (
    <ReactMarkdown
      className="markdown-body"
      components={{
        ...MDXComponents,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MDParser;
