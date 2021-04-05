import React from "react";
import FormField from "../../common/components/form/FormField";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";

export interface JobFieldProps {
  number: string;
  description: string;
}

const JobField: React.FC<JobFieldProps> = ({ number, description }) => {
  return (
    <FormField name="job">
      <FormFieldLabel>{`${number} ${description}`}</FormFieldLabel>
      <FormFieldErrors />
    </FormField>
  );
};

export default JobField;
