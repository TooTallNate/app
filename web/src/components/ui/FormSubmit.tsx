import React, { Fragment } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../styled";
import Spinner from "./Spinner";

const FormSubmit: React.FC = ({ children }) => {
  const { formState } = useFormContext();
  return (
    <Button
      type="submit"
      disabled={
        (!formState.isValid && formState.isSubmitted) || formState.isSubmitting
      }
    >
      {formState.isSubmitting ? (
        <Fragment>
          <span className="mr-2">Loading</span>
          <Spinner size={22} color="white" className="align-middle" />
        </Fragment>
      ) : (
        children || "Submit"
      )}
    </Button>
  );
};

export default FormSubmit;
