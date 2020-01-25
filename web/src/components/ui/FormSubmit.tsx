import React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../styled";

const FormSubmit: React.FC = ({ children }) => {
  const { formState } = useFormContext();
  return (
    <Button
      type="submit"
      className={"mt-10"}
      disabled={
        (!formState.isValid && formState.isSubmitted) || formState.isSubmitting
      }
    >
      {children || "Submit"}
    </Button>
  );
};

export default FormSubmit;
