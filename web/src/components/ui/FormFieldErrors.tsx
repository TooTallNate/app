import React from "react";
import { useField } from "./FormField";
import { useFormContext, ErrorMessage } from "react-hook-form";

interface FormFieldErrors {
  className?: string;
}

const FormFieldErrors: React.FC<FormFieldErrors> = ({ className }) => {
  const { errors } = useFormContext();
  const fieldConfig = useField();

  if (!fieldConfig) {
    throw new Error("FormFieldErrors must be a descendant of FormField.");
  }

  const { name, errorId } = fieldConfig;

  return (
    <ErrorMessage name={name} errors={errors}>
      {({ message }) => (
        <div
          id={errorId}
          className={`
            my-2 text-sm font-bold text-red-700 leading-none
            ${className}
          `}
        >
          {message}
        </div>
      )}
    </ErrorMessage>
  );
};

export default FormFieldErrors;
