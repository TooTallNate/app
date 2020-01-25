import React from "react";
import { useField } from "./FormField";
import { Controller, ControllerProps } from "react-hook-form";

interface FormFieldInput extends Omit<ControllerProps, "as"> {
  className?: string;
  children: React.ReactElement | React.ElementType | string;
}

const FormFieldInput: React.FC<FormFieldInput> = ({ children, ...props }) => {
  const fieldConfig = useField();

  if (!fieldConfig) {
    throw new Error("FormFieldInput must be a descendant of FormField.");
  }

  const { name, rules, labelId } = fieldConfig;

  return (
    <Controller
      {...props}
      as={children}
      name={name}
      rules={rules}
      aria-labelledby={labelId}
    />
  );
};

export default FormFieldInput;
