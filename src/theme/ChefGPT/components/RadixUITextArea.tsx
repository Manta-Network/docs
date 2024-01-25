const sizes = ["1", "2", "3"] as const;
const variants = ["classic", "surface", "soft"] as const;

import clsx from "clsx";
import React from "react";

type TextAreaElement = React.ElementRef<"textarea">;
interface TextAreaProps extends React.HTMLAttributes<TextAreaElement> {
  size: (typeof sizes)[number];
  variant: (typeof variants)[number];
}
export const RadixUITextArea = React.forwardRef<TextAreaElement, TextAreaProps>(
  (props, forwardedRef) => {
    const { className, style, ...textAreaProps } = props;
    return (
      <div
        className={clsx("rt-TextAreaRoot", className)}
        style={style}
      >
        <textarea
          className="rt-TextAreaInput"
          ref={forwardedRef}
          {...textAreaProps}
        />
        <div className="rt-TextAreaChrome" />
      </div>
    );
  }
);
RadixUITextArea.displayName = "TextArea";

export type { TextAreaProps };
