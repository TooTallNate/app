import React from "react";
import { useField } from "./FormField";

interface FormFieldLabelProps {
  id?: string;
  className?: string;
}

const FormFieldLabel: React.FC<FormFieldLabelProps> = ({
  className,
  children,
  ...props
}) => {
  const fieldConfig = useField();

  const id = props.id || (fieldConfig && fieldConfig.labelId);

  return (
    <label
      id={id}
      className={`
        pt-3 pb-2 pl-1 leading-none inline-block text-base font-bold
        ${className}
      `}
    >
      {children}
    </label>
  );
};

export default FormFieldLabel;
