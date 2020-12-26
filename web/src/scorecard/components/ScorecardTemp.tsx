import React, { useEffect } from "react";

import FormField from "../../common/components/form/FormField";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import NumberInput from "../../common/components/input/NumberInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import { FormValue, useScorecard } from "../contexts/scorecard";
import { useFormContext } from "react-hook-form";

export interface ScorecardTempProps {
  label: string;
  id: string;
}

const ScorecardTempInput: React.FC<ScorecardTempProps> = ({ label, id }) => {
  const { formState } = useScorecard();
  const { setValue } = useFormContext();
  const name = `${id}.numericValue`;
  const { numericValue } = formState[id] || {};

  useEffect(() => {
    setValue(name, numericValue);
  }, [numericValue, name, setValue]);

  return (
    <FormField
      name={name}
      rules={{
        min: {
          value: -30,
          message: `Must be at least -30ºF.`
        },
        max: {
          value: 110,
          message: `Must be at most 110ºF.`
        }
      }}
    >
      <FormFieldLabel>{label} (ºF)</FormFieldLabel>
      <FormFieldInput>
        <NumberInput className="w-16" />
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export const isComplete = ({ numericValue }: FormValue) =>
  typeof numericValue === "number";

export default ScorecardTempInput;
