import React, { ComponentProps } from "react";
import { useField } from "../form/FormField";

type NumberInputProps = Omit<
  ComponentProps<"input">,
  "value" | "type" | "onChange"
> & {
  value?: number;
  onChange?(value?: number): void;
};

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput(
    {
      className,
      value,
      onChange,
      autoComplete = "off",
      step = "any",
      ...props
    },
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
        step={step}
        className={`
          flex items-center px-4 h-11 w-full no-spinner
          text-base text-black leading-none 
          border border-gray-500 rounded-lg
          focus:shadow-outline focus:outline-none
          ${className}
        `}
        type="number"
        value={typeof value === "number" && !Number.isNaN(value) ? value : ""}
        onChange={e =>
          onChange &&
          onChange(
            Number.isNaN(e.target.valueAsNumber)
              ? undefined
              : e.target.valueAsNumber
          )
        }
        ref={ref}
      />
    );
  }
);

export default NumberInput;
