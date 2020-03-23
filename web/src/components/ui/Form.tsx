import React from "react";
import { FormContext, OnSubmit, FormContextValues } from "react-hook-form";

interface FormProps<T> {
  className?: string;
  onSubmit?: OnSubmit<T>;
  children: React.ReactNode;
  context: FormContextValues<T>;
}

function Form<T = Record<string, any>>({
  className,
  onSubmit,
  context,
  children
}: FormProps<T>): React.ReactElement | null {
  const { handleSubmit } = context;

  return (
    <FormContext {...context}>
      <form
        onSubmit={onSubmit && handleSubmit(onSubmit)}
        className={`
          overflow-x-auto min-h-0 flex-grow p-4 pt-0 
          ${className}
        `}
      >
        {children}
      </form>
    </FormContext>
  );
}

export default Form;
