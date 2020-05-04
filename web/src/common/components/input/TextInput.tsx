import React, { ComponentProps } from "react";
import { useField } from "../form/FormField";

interface TextInputProps
  extends Omit<ComponentProps<"input">, "value" | "onChange"> {
  value?: string;
  onChange?(value: string): void;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    { className, onChange, autoComplete = "off", ...props },
    ref
  ) {
    const fieldConfig = useField();

    const labelId =
      props["aria-labelledby"] || (fieldConfig && fieldConfig.labelId);
    const name = props.name || (fieldConfig && fieldConfig.name);

    return (
      <input
        {...props}
        autoComplete={autoComplete}
        aria-labelledby={labelId}
        name={name}
        className={`
          flex items-center px-4 h-11 w-full no-spinner
          text-base text-black leading-none 
          border border-gray-500 rounded-lg
          focus:shadow-outline focus:outline-none
          ${className}
        `}
        onChange={e => onChange && onChange(e.target.value)}
        ref={ref}
      />
    );
  }
);

export default TextInput;
