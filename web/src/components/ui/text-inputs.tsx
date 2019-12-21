/** @jsx jsx */
import React, { useImperativeHandle, useRef } from "react";
import { jsx } from "@emotion/core";
import { FocusTarget, FocusInTarget } from "../styled";
import { ComponentProps } from "react";
import tw from "tailwind.macro";
import { useField } from "./Field";
import { setRef } from "../../utils";

const BaseTextInput = tw.styled(FocusTarget.withComponent("input"))`
  py-2 px-4 h-10 w-full block
  text-base text-black leading-none 
  border border-gray-500 rounded-lg
`;

const BaseTextarea = tw.styled(FocusInTarget.withComponent("textarea"))`
  py-2 px-4 h-24 w-full block
  text-base text-black leading-none 
  border border-gray-500 rounded-lg
  resize-y
`;

interface TextInputProps
  extends Omit<ComponentProps<typeof BaseTextInput>, "value" | "onChange"> {
  value?: string;
  onChange?(value?: string): void;
}

interface MultilineTextInputProps
  extends Omit<ComponentProps<typeof BaseTextarea>, "value" | "onChange"> {
  value?: string;
  onChange?(value?: string): void;
}

export const TextInput: React.FC<TextInputProps> = ({
  onChange = () => {},
  ...props
}) => <BaseTextInput {...props} onChange={e => onChange(e.target.value)} />;

export const MultilineTextInput: React.FC<MultilineTextInputProps> = ({
  onChange = () => {},
  ...props
}) => <BaseTextarea {...props} onChange={e => onChange(e.target.value)} />;

type NumberInputProps = Omit<ComponentProps<"input">, "value" | "type"> & {
  value?: number;
};

export const NumberInput = React.forwardRef<
  HTMLInputElement | null,
  NumberInputProps
>(function NumberInput({ className, ...props }, ref) {
  const fieldConfig = useField();

  const labelId =
    props["aria-labelledby"] || (fieldConfig && fieldConfig.labelId);
  const name = props.name || (fieldConfig && fieldConfig.name);
  const register = fieldConfig && fieldConfig.register;

  return (
    <input
      {...props}
      aria-labelledby={labelId}
      name={name}
      className={`
          py-2 px-4 h-10 w-full block no-spinner
          text-base text-black leading-none 
          border border-gray-500 rounded-lg
          focus:shadow-outline focus:outline-none
          ${className}
        `}
      type="number"
      ref={e => {
        register && register(e);
        setRef<HTMLInputElement>(e, ref);
      }}
    />
  );
});
