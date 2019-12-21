import React from "react";
import { useField } from "./Field";

interface FieldErrors {
  id?: string;
  className?: string;
  name?: string;
  errors: any;
}

const FieldErrors: React.FC<FieldErrors> = ({
  className,
  children,
  errors,
  ...props
}) => {
  const fieldConfig = useField();

  const name = props.name || (fieldConfig && fieldConfig.name);
  let error: { message: string } | undefined;
  if (name) {
    error = errors[name];
  }

  return error ? (
    <span
      id={props.id}
      className={`
        mt-2 mb-3 ml-4 inline-block text-red-700 leading-none
        ${className}
      `}
    >
      {error.message}
    </span>
  ) : null;
};

export default FieldErrors;
