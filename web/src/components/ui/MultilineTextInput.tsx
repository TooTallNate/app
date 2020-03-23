import React, { ComponentProps } from "react";
import { useField } from "./FormField";

interface MultilineTextInputProps
  extends Omit<ComponentProps<"textarea">, "value" | "onChange"> {
  value?: string;
  onChange?(value: string): void;
}

const MultilineTextInput = React.forwardRef<
  HTMLTextAreaElement,
  MultilineTextInputProps
>(function MultilineTextInput(
  { className, onChange, maxLength, value, ...props },
  ref
) {
  const fieldConfig = useField();

  const labelId =
    props["aria-labelledby"] || (fieldConfig && fieldConfig.labelId);
  const name = props.name || (fieldConfig && fieldConfig.name);

  let counterClasses = "bg-black text-white";
  if (maxLength && value) {
    if (value.length === maxLength) {
      counterClasses = "bg-red-500 text-black";
    } else if (value.length > 0.8 * maxLength) {
      counterClasses = "bg-yellow-500 text-black";
    }
  }

  return (
    <div>
      <textarea
        {...props}
        value={value}
        aria-labelledby={labelId}
        maxLength={maxLength}
        name={name}
        className={`
          block py-3 px-4 h-24 w-full no-spinner
          text-base text-black leading-none 
          border border-gray-500 rounded-lg rounded-br-none
          focus:shadow-outline focus:outline-none
          ${className}
        `}
        onChange={e => onChange && onChange(e.target.value)}
        ref={ref}
      />
      {maxLength && (
        <div className="flex flex-row-reverse" aria-hidden>
          <div
            className={`
              py-1 px-4 font-bold rounded-b-lg border-t-0
              ${counterClasses}
            `}
          >
            {maxLength - (value ? value.length : 0)}
          </div>
        </div>
      )}
    </div>
  );
});

export default MultilineTextInput;
