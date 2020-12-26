import React, { useRef } from "react";
import { useFormContext } from "react-hook-form";
import Button from "../input/Button";
import Spinner from "../Spinner";

export interface FormSubmitProps {
  onClick?(): void;
}

const FormSubmit: React.FC<FormSubmitProps> = ({ children, onClick }) => {
  const element = useRef<HTMLButtonElement>(null);
  const { formState } = useFormContext();

  const width = element.current ? element.current.clientWidth : 1000;

  return (
    <Button
      ref={element}
      type="submit"
      className="w-full"
      disabled={formState.isSubmitting}
      onClick={onClick}
    >
      {formState.isSubmitting ? (
        <>
          {width > 140 ? <span className="mr-2">Loading</span> : null}
          <Spinner size={22} color="white" className="align-middle" />
        </>
      ) : (
        children || "Submit"
      )}
    </Button>
  );
};

export default FormSubmit;
