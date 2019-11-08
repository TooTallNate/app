/** @jsx jsx */
import { jsx } from "@emotion/core";
import { FocusTarget } from "../styled";
import { ComponentProps } from "react";
import tw from "tailwind.macro";

const BaseTextInput = tw.styled(FocusTarget.withComponent("input"))`
  py-2 px-4 h-10 w-full block
  text-base text-black leading-none 
  border border-gray-500 rounded-lg
`;

const BaseTextarea = tw.styled(BaseTextInput.withComponent("textarea"))`
  resize-y h-24
`;

type TextInputProps = Omit<ComponentProps<"input">, "value" | "onChange"> & {
  value?: string;
  onChange(value?: string): void;
  multiline?: boolean;
};

export const TextInput: React.FC<TextInputProps> = ({
  onChange = () => {},
  multiline = false,
  ...props
}) =>
  multiline ? (
    <BaseTextarea {...props} onChange={e => onChange(e.target.value)} />
  ) : (
    <BaseTextInput {...props} onChange={e => onChange(e.target.value)} />
  );

type NumberInputProps = Omit<
  ComponentProps<"input">,
  "value" | "onChange" | "type"
> & {
  value?: number;
  onChange(value?: number): void;
};

export const NumberInput: React.FC<NumberInputProps> = ({
  onChange = () => {},
  ...props
}) => (
  <BaseTextInput
    {...props}
    type="number"
    onChange={e => {
      const value = e.target.valueAsNumber;
      onChange(Number.isNaN(value) ? undefined : value);
    }}
  />
);
