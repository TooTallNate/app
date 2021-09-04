import React, { ComponentProps } from "react";
import { useField } from "../form/FormField";

type DecimalInputProps = Omit<
  ComponentProps<"input">,
  "value" | "type" | "onChange"
> & {
  value?: number;
  onChange?(value?: number): void;
  decimalPlaces?: number;
};

const DecimalInput = React.forwardRef<HTMLInputElement, DecimalInputProps>(
  function DecimalInput(
    {
      className,
      value,
      onChange,
      autoComplete = "off",
      step = "any",
      decimalPlaces,
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
          flex items-center px-4 h-11 no-spinner
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
              : parseFloat(e.target.valueAsNumber.toFixed(decimalPlaces))
          )
        }
        ref={ref}
      />
    );
  }
);

export default DecimalInput;
