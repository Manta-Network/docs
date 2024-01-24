import React, { KeyboardEvent, forwardRef, useRef } from "react";
import { RadixUITextArea } from "./RadixUITextArea";
import { useEventListener } from "../hooks/useEventListener";
import clsx from "clsx";
import "./TextArea.css";

export const TextArea = forwardRef(
  ({
    className,
    onKeyPress,
    onChange: _onChange,
    dynamicHeight = false,
    ...props
  }: {
    className?: string;
    dynamicHeight?: boolean;
    onKeyPress?: (e: KeyboardEvent<HTMLAreaElement>) => void;
  } & React.ComponentProps<typeof RadixUITextArea>) => {
    const ref = useRef<HTMLTextAreaElement>(null);

    /* Dynamic height */
    // If text area is dynamic we need to update its height on every change
    const updateHeight = () => {
      const el = ref.current;
      if (!el) return;
      console.log("updateHeight", el.style.height, el.scrollHeight);
      el.style.height = "";
      console.log("updateHeight2", el.style.height, el.scrollHeight);
      el.style.height = el.scrollHeight + 2 + "px";
      console.log("updateHeight3", el.style.height, el.scrollHeight);
    };
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (_onChange) {
        _onChange(e);
      }
      if (dynamicHeight) {
        updateHeight();
      }
    };

    /* Submit form on enter, but only if there is no other key pressed */
    const handleUserKeyPress = (_e: Event) => {
      const e = _e as unknown as KeyboardEvent<HTMLAreaElement>;
      if (onKeyPress) {
        onKeyPress(e);
      }

      // We only want to submit the form if the user presses enter without any other key
      if (
        e.key === "Enter" &&
        !e.ctrlKey &&
        !e.shiftKey &&
        !e.altKey &&
        !e.metaKey
      ) {
        e.preventDefault();
        (e.target as HTMLInputElement).form?.requestSubmit();
      }
    };
    // @ts-ignore
    useEventListener(ref.current, "keydown", handleUserKeyPress);

    return (
      <RadixUITextArea
        ref={ref}
        onChange={onChange}
        data-gramm_editor="false"
        data-enable-grammarly="false"
        data-gramm="false"
        {...props}
      />
    );
  }
);
