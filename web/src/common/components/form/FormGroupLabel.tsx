import React from "react";

interface FormGroupLabelProps {
  className?: string;
}

const FormGroupLabel: React.FC<FormGroupLabelProps> = ({
  className,
  children
}) => {
  return (
    <legend
      className={`
        pt-3 pb-2 pl-1 leading-none inline-block text-base font-bold
        ${className}
      `}
    >
      {children}
    </legend>
  );
};

export default FormGroupLabel;
