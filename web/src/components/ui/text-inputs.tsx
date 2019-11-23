/** @jsx jsx */
import { jsx } from "@emotion/core";
import { FocusTarget, FocusInTarget } from "../styled";
import { ComponentProps } from "react";
import tw from "tailwind.macro";

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

type NumberInputProps = Omit<
  ComponentProps<typeof BaseTextInput>,
  "value" | "onChange" | "type"
> & {
  value?: number;
  onChange?(value?: number): void;
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
