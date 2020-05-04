import React from "react";
import FormField from "../../common/components/form/FormField";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import StaticValue from "../../common/components/input/StaticValue";

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
