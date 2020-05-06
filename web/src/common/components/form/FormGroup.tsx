import React from "react";

interface FormGroupProps {
  className?: string;
}

const FormGroup: React.FC<FormGroupProps> = ({ children, className }) => {
  return (
    <fieldset className={`pl-8 child:mb-4 ${className}`}>{children}</fieldset>
  );
};
export default FormGroup;
