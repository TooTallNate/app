import React from "react";
import FormField from "../../components/form/FormField";
import FormFieldLabel from "../../components/form/FormFieldLabel";
import FormFieldInput from "../../components/form/FormFieldInput";
import FormFieldErrors from "../../components/form/FormFieldErrors";
import StaticValue from "../../components/input/StaticValue";

export interface JobFieldProps {
  number: string;
  description: string;
}

const JobField: React.FC<JobFieldProps> = ({ number, description }) => {
  return (
    <FormField name="job">
      <FormFieldLabel>Job</FormFieldLabel>
      <FormFieldInput noRegister>
        <StaticValue value={`${number} ${description}`} />
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export default JobField;
