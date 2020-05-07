import React, { useEffect } from "react";
import { FormContext, OnSubmit, FormContextValues } from "react-hook-form";
import { useFlash } from "../../contexts/flash";
import Stack from "../layout/Stack";
import { Spacing } from "../layout/spacing";

interface FormProps<T> {
  className?: string;
  onSubmit?: OnSubmit<T>;
  children: React.ReactNode;
  context?: FormContextValues<T>;
}

function Form<T = Record<string, any>>({
  className,
  onSubmit,
  context,
  children
}: FormProps<T>): React.ReactElement {
  const { setMessage } = useFlash();

  const isValid =
    !context || !context.formState.isSubmitted || context.formState.isValid;

  useEffect(() => {
    if (!isValid) {
      setMessage({
        level: "error",
        message: "Please fix errors before submitting."
      });
    }
  }, [isValid, setMessage]);

  if (context) {
    const { handleSubmit } = context;
    return (
      <FormContext {...context}>
        <form
          onSubmit={onSubmit && handleSubmit(onSubmit)}
          className={`child:mb-4 ${className}`}
        >
          <Stack spacing={Spacing.XS}>{children}</Stack>
        </form>
      </FormContext>
    );
  } else {
    return <form className={`child:mb-4 ${className}`}>{children}</form>;
  }
}

export default Form;
