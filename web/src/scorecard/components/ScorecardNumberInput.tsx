import React, { useEffect } from "react";

import FormField from "../../common/components/form/FormField";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import NumberInput from "../../common/components/input/NumberInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import { FormValue, useGrowFinish } from "../contexts/growFinish";
import { useFormContext } from "react-hook-form";

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
  const { formState } = useGrowFinish();
  const { setValue } = useFormContext();
  const name = `${id}.numericValue`;
  const elementState = formState[id] || {};

  useEffect(() => {
    setValue(
      name,
      elementState.numericValue ? elementState.numericValue : undefined
    );
  }, [elementState, id, name, setValue]);

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

export const isComplete = ({ numericValue }: FormValue) =>
  typeof numericValue === "number";

export default ScorecardNumberInput;
