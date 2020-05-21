import React, { forwardRef } from "react";
import { useStackedInputContext } from "./StackedInput";

export interface StackedButtonProps {
  value: any;
  children?: React.ReactNode;
}

const StackedButton = forwardRef<HTMLButtonElement, StackedButtonProps>(
  function StackedRadioButton({ children, value }, ref) {
    const context = useStackedInputContext();

    if (!context) {
      throw new Error();
    }
    const { orientation, onChange } = context;

    return (
      <button
        ref={ref}
        type="button"
        className={`
          h-11 text-base font-medium border-gray-500 px-4
          focus:outline-none focus:bg-blue-300
          ${
            orientation === "vertical"
              ? "border-b last:border-b-0 text-left"
              : "text-center border-r last:border-r-0"
          }
        `}
        onClick={() => onChange && onChange(value)}
      >
        {children}
      </button>
    );
  }
);

export default StackedButton;
