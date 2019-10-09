/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef } from "react";

interface ButtonInputProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const ButtonInput = forwardRef<HTMLButtonElement, ButtonInputProps>(
  ({ type = "button", children, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        type={type}
        css={{
          fontSize: "1rem",
          padding: "12px",
          border: "1px solid #9ca1b1",
          borderRadius: 8,
          backgroundColor: "inherit",
          display: "block",
          width: "100%",
          boxSizing: "border-box",
          "&:focus": {
            boxShadow: "0 0 0 1px #9ca1b1",
            outline: "none"
          }
        }}
      >
        {children}
      </button>
    );
  }
);

export default ButtonInput;
