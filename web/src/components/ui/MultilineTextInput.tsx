/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef } from "react";

interface MultilineTextInputProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}

const MultilineTextInput = forwardRef<
  HTMLTextAreaElement,
  MultilineTextInputProps
>(({ ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      {...props}
      css={{
        fontSize: "1rem",
        padding: "12px",
        border: "1px solid #9ca1b1",
        borderRadius: 8,
        display: "block",
        width: "100%",
        boxSizing: "border-box",
        resize: "vertical",
        minHeight: 88,
        "&:focus": {
          boxShadow: "0 0 0 1px #9ca1b1",
          outline: "none"
        }
      }}
    />
  );
});

export default MultilineTextInput;
