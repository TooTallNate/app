import React, { useEffect } from "react";

import FormField from "../../common/components/form/FormField";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import NumberInput from "../../common/components/input/NumberInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import { FormValue, useScorecard } from "../contexts/scorecard";
import { useFormContext } from "react-hook-form";
import { Spacing } from "../../common/components/layout/spacing";
import VerticalSpacer from "../../common/components/layout/VerticalSpacer";
import MultilineTextInput from "../../common/components/input/MultilineTextInput";

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
  const commentsName = `${id}.stringValue`;
  const { stringValue, numericValue } = formState[id] || {};

  useEffect(() => {
    setValue(name, numericValue);
  }, [name, numericValue, setValue]);

  useEffect(() => {
    setValue(commentsName, stringValue ? stringValue : undefined);
  }, [commentsName, setValue, stringValue]);

  return (
    <>
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
      <VerticalSpacer spacing={Spacing.S} />
      <FormField name={commentsName}>
        <FormFieldLabel>Comments</FormFieldLabel>
        <FormFieldInput>
          <MultilineTextInput rows={2} maxLength={50} />
        </FormFieldInput>
      </FormField>
    </>
  );
};

export const isComplete = ({ numericValue }: FormValue) =>
  typeof numericValue === "number";

export default ScorecardHealthInput;
