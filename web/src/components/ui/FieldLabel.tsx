import React from "react";
import { useField } from "./Field";

interface FieldLabelProps {
  id?: string;
  className?: string;
}

const FieldLabel: React.FC<FieldLabelProps> = ({
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
        mt-2 mb-3 leading-none inline-block text-base font-bold
        ${className}
      `}
    >
      {children}
    </label>
  );
};

export default FieldLabel;
