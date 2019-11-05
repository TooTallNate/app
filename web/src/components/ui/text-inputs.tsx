/** @jsx jsx */
import { jsx } from "@emotion/core";
import { BaseTextInput, BaseTextarea } from "../styled";
import { ComponentProps } from "react";

type TextInputProps = Omit<
  ComponentProps<typeof BaseTextInput>,
  "value" | "onChange"
> & {
  value?: string;
  onChange(value?: string): void;
};

export const TextInput: React.FC<TextInputProps> = ({
  onChange = () => {},
  ...props
}) => <BaseTextInput {...props} onChange={e => onChange(e.target.value)} />;

type NumberInputProps = Omit<
  ComponentProps<typeof BaseTextInput>,
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

type TextareaProps = Omit<
  ComponentProps<typeof BaseTextarea>,
  "value" | "onChange"
> & {
  value?: string;
  onChange(value?: string): void;
};

export const Textarea: React.FC<TextareaProps> = ({
  onChange = () => {},
  ...props
}) => <BaseTextarea {...props} onChange={e => onChange(e.target.value)} />;
