import React from "react";

import FormField from "../../common/components/form/FormField";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import NumberInput from "../../common/components/input/NumberInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";

export interface ScorecardNumberInputProps {
  label: string;
  id: string;
  min: number;
  max: number;
}

const ScorecardNumberInput: React.FC<ScorecardNumberInputProps> = ({
  label,
  id,
  min,
  max
}) => {
  const name = `${id}.numericValue`;

  return (
    <FormField
      name={name}
      rules={{
        min: {
          value: min,
          message: `Must be at least ${min}.`
        },
        max: {
          value: max,
          message: `Must be at most ${max}.`
        }
      }}
    >
      <FormFieldLabel>{label}</FormFieldLabel>
      <FormFieldInput>
        <NumberInput />
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export default ScorecardNumberInput;
