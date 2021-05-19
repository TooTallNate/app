import React from "react";
/** @jsx jsx */
import { jsx, keyframes } from "@emotion/core";

const spinner = keyframes({
  "0%": {
    transform: "rotate(0deg)"
  },
  "100%": {
    transform: "rotate(360deg)"
  }
});

interface CustomButtonProps extends React.ComponentProps<"button"> {
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, type = "button", loading, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        type={type}
        className={`
        inline-flex
        items-center
        justify-center
        px-4 h-11
        text-base font-bold text-white leading-4 
        bg-black border border-black rounded-lg
        active:border-gray-500 active:text-black active:bg-white
        focus:shadow-outline focus:outline-none
        disabled:opacity-50
        ${className}
      `}
      >
        {props.children}
        {loading && (
          <div className="animate-spin">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-2 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              css={{
                animation: `${spinner} 1.2s linear infinite`
              }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
        )}
      </button>
    );
  }
);

export default Button;
