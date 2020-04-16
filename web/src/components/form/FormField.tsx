import React, { useContext } from "react";

interface FormFieldContextValue {
  rules?: object;
  name: string;
  labelId: string;
  errorId: string;
}

const FormFieldContext = React.createContext<FormFieldContextValue>({
  rules: {},
  name: "input",
  labelId: "input-id",
  errorId: "error-id"
});

interface FormFieldProps {
  name: string;
  rules?: object;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  rules,
  children,
  className
}) => {
  const labelId = `${name}-label`;
  const errorId = `${name}-error`;

  return (
    <div className={className}>
      <FormFieldContext.Provider value={{ name, rules, labelId, errorId }}>
        {children}
      </FormFieldContext.Provider>
    </div>
  );
};

export const useField = (): FormFieldContextValue | undefined => {
  return useContext(FormFieldContext);
};

export default FormField;
