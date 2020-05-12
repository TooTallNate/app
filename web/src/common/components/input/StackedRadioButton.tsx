import React, { forwardRef } from "react";
import { useStackedInputContext } from "./StackedInput";

export interface StackedRadioButtonProps {
  value: any;
  children?: React.ReactNode;
}

const StackedRadioButton = forwardRef<
  HTMLInputElement,
  StackedRadioButtonProps
>(function StackedRadioButton({ value, children }, ref) {
  const context = useStackedInputContext();

  if (!context) {
    throw new Error();
  }
  const { orientation, selected, onChange, name } = context;

  return (
    <label
      className={`
        h-11 text-base font-medium border-gray-500
        focus:outline-none focus:bg-blue-300
        ${
          orientation === "vertical"
            ? "border-b last:border-b-0 text-left"
            : "flex-1 text-center border-r last:border-r-0"
        }
      `}
    >
      <input
        ref={ref}
        className="absolute opacity-0"
        type="radio"
        value={value}
        name={name}
        checked={selected === value}
        onChange={e => onChange && onChange(e.target.value)}
      />
      <div className="flex items-center h-full px-4 checked:bg-blue-300">
        {children}
      </div>
    </label>
  );
});

export default StackedRadioButton;
