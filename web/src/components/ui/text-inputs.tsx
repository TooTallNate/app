/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { ComponentProps } from "react";
import { useField } from "./FormField";

interface TextInputProps
  extends Omit<ComponentProps<"input">, "value" | "onChange"> {
  value?: string;
  onChange?(value: string): void;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
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
          py-2.5 px-4 h-11 w-full block no-spinner
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

type NumberInputProps = Omit<
  ComponentProps<"input">,
  "value" | "type" | "onChange"
> & {
  value?: number;
  onChange?(value?: number): void;
};

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
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
        py-2.5 px-4 h-11 w-full block no-spinner
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
