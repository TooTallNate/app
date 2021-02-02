import React, { useEffect } from "react";

import FormField from "../../common/components/form/FormField";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import NumberInput from "../../common/components/input/NumberInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import { FormValue, useScorecard } from "../contexts/scorecard";
import { useFormContext } from "react-hook-form";

export interface ScorecardHealthInputProps {
  label: string;
  id: string;
  min: number;
  max: number;
}

const ScorecardHealthInput: React.FC<ScorecardHealthInputProps> = ({
  label,
  id,
  min,
  max
}) => {
  const { formState } = useScorecard();
  const { setValue } = useFormContext();
  const name = `${id}.numericValue`;
  const { numericValue } = formState[id] || {};

  useEffect(() => {
    setValue(name, numericValue);
  }, [name, numericValue, setValue]);

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
      <FormFieldLabel>{label} (%)</FormFieldLabel>
      <FormFieldInput>
        <NumberInput className="w-16" />
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export const isComplete = ({ numericValue }: FormValue) =>
  typeof numericValue === "number";

export default ScorecardHealthInput;