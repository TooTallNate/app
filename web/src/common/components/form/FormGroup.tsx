import React from "react";

interface FormGroupProps {
  className?: string;
}

const FormGroup: React.FC<FormGroupProps> = ({ children, className }) => {
  return <fieldset className={className}>{children}</fieldset>;
};
export default FormGroup;
