import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { useField } from "./FormField";
import { Controller, ControllerProps, useFormContext } from "react-hook-form";

export interface FormFieldInputElement {
  focus(): void;
}

export interface FormFieldInputProps extends Omit<ControllerProps<any>, "as"> {
  className?: string;
  noRegister?: boolean;
  children:
    | React.ReactElement
    | React.ComponentType<any>
    | keyof JSX.IntrinsicElements;
}

const FormFieldInput = forwardRef<FormFieldInputElement, FormFieldInputProps>(
  ({ children, noRegister = false, ...props }, ref) => {
    const inputRef = useRef<any>();
    const formContext = useFormContext();
    const fieldConfig = useField();

    if (!fieldConfig) {
      throw new Error("FormFieldInput must be a descendant of FormField.");
    }

    const { name, rules, labelId, errorId } = fieldConfig;

    useImperativeHandle(
      ref,
      () => ({
        focus: () => inputRef.current!.focus && inputRef.current!.focus()
      }),
      []
    );

    if (formContext && !noRegister) {
      const input = React.Children.only(children);
      if (!React.isValidElement(input)) {
        throw new Error("Child of FormFieldInput must be a ReactElement.");
      }

      return (
        <Controller
          {...props}
          as={React.cloneElement(input, { ref: inputRef })}
          name={name}
          rules={rules}
          onFocus={() =>
            inputRef.current &&
            inputRef.current.focus &&
            inputRef.current.focus()
          }
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
  }
);

export default FormFieldInput;
