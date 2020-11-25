import React from "react";

import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import StackedInput from "../../common/components/input/StackedInput";
import StackedRadioButton from "../../common/components/input/StackedRadioButton";

export interface ScorecardYesNoProps {
  label: string;
  id: string;
}

const ScorecardYesNo: React.FC<ScorecardYesNoProps> = ({ label, id }) => {
  const name = `${id}.numericValue`;

  return (
    <FormField name={name}>
      <FormFieldLabel>{label}</FormFieldLabel>
      <FormFieldInput>
        <StackedInput orientation="horizontal">
          <StackedRadioButton value={1}>Yes</StackedRadioButton>
          <StackedRadioButton value={-1}>No</StackedRadioButton>
        </StackedInput>
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export default ScorecardYesNo;
