import React, { useContext } from "react";

interface FieldContextValue {
  register: any;
  name: string;
  labelId: string;
}

const FieldContext = React.createContext<FieldContextValue>({
  register: () => {},
  name: "input",
  labelId: "label-id"
});

interface FieldProps {
  name: string;
  validation?: any;
  className?: string;
}

const Field: React.FC<FieldProps> = ({
  name,
  validation: register,
  children,
  className
}) => {
  const labelId = `${name}-label`;
  return (
    <div className={`p-0 m-0 mt-4 first:mt-0 ${className}`}>
      <FieldContext.Provider value={{ name, register, labelId }}>
        {children}
      </FieldContext.Provider>
    </div>
  );
};

export const useField = (): FieldContextValue | undefined => {
  return useContext(FieldContext);
};

export default Field;
