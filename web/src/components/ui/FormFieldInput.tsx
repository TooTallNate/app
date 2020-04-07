import React from "react";
import { useField } from "./FormField";
import { Controller, ControllerProps, useFormContext } from "react-hook-form";

interface FormFieldInput extends Omit<ControllerProps, "as"> {
  className?: string;
  children: React.ReactElement | React.ElementType | string;
}

const FormFieldInput: React.FC<FormFieldInput> = ({ children, ...props }) => {
  const formContext = useFormContext();
  const fieldConfig = useField();

  if (!fieldConfig) {
    throw new Error("FormFieldInput must be a descendant of FormField.");
  }

  const { name, rules, labelId, errorId } = fieldConfig;

  if (formContext) {
    return (
      <Controller
        {...props}
        as={children}
        name={name}
        rules={rules}
        aria-labelledby={labelId}
        aria-describedby={errorId}
      />
    );
  } else {
    const child = React.Children.only(children);
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { name, "aria-labelledby": labelId });
    } else {
      return null;
    }
  }
};

export default FormFieldInput;
