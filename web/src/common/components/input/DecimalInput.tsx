import React, { ComponentProps } from "react";
import { useField } from "../form/FormField";

type DecimalInputProps = Omit<
  ComponentProps<"input">,
  "value" | "type" | "onChange"
> & {
  value?: number;
  onChange?(value?: number): void;
  decimalPlaces?: number;
  addon?: string;
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
      addon,
      ...props
    },
    ref
  ) {
    const fieldConfig = useField();

    const labelId =
      props["aria-labelledby"] || (fieldConfig && fieldConfig.labelId);
    const name = props.name || (fieldConfig && fieldConfig.name);

    return (
      <div className={addon && "flex"}>
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
          ${addon && "rounded-r-none"}
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
        {addon && (
          <span className="flex items-center rounded-r-lg border border-l-0 border-gray-500 bg-gray-50 text-base text-black px-3">
            {addon}
          </span>
        )}
      </div>
    );
  }
);

export default DecimalInput;
