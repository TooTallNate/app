import React from "react";

import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import StackedInput from "../../common/components/input/StackedInput";
import StackedRadioButton from "../../common/components/input/StackedRadioButton";

export interface ScorecardYesNoProps {
  label: string;
  name: string;
}

const ScorecardYesNo: React.FC<ScorecardYesNoProps> = ({ label, name }) => {
  return (
    <FormField name={name}>
      <FormFieldLabel>{label}</FormFieldLabel>
      <FormFieldInput>
        <StackedInput orientation="horizontal">
          <StackedRadioButton value="yes">Yes</StackedRadioButton>
          <StackedRadioButton value="no">No</StackedRadioButton>
        </StackedInput>
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export default ScorecardYesNo;
