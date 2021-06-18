import { keyframes } from "@emotion/core";
import { RefreshIcon } from "@heroicons/react/solid";
import React from "react";

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
        {loading && <RefreshIcon className="h-6 w-6 ml-2 animate-spin" />}
      </button>
    );
  }
);

export default Button;
