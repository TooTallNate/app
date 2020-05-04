import React from "react";
import { useFormContext } from "react-hook-form";
import Button from "../input/Button";
import Spinner from "../Spinner";

const FormSubmit: React.FC = ({ children }) => {
  const { formState } = useFormContext();
  return (
    <Button
      type="submit"
      className="w-full"
      disabled={
        (!formState.isValid && formState.isSubmitted) || formState.isSubmitting
      }
    >
      {formState.isSubmitting ? (
        <>
          <span className="mr-2">Loading</span>
          <Spinner size={22} color="white" className="align-middle" />
        </>
      ) : (
        children || "Submit"
      )}
    </Button>
  );
};

export default FormSubmit;
