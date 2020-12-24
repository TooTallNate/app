import React, { useEffect } from "react";

import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import SliderInput from "../../common/components/input/SliderInput";
import VerticalSpacer from "../../common/components/layout/VerticalSpacer";
import { Spacing } from "../../common/components/layout/spacing";
import MultilineTextInput from "../../common/components/input/MultilineTextInput";
import { FormValue, useGrowFinish } from "../contexts/growFinish";
import { useFormContext } from "react-hook-form";

export interface ScorecardScoresProps {
  label: string;
  id: string;
  min: number;
  max: number;
  step: number;
}

const ScorecardScores: React.FC<ScorecardScoresProps> = ({
  label,
  id,
  min,
  max,
  step
}) => {
  const { formState } = useGrowFinish();
  const { setValue } = useFormContext();
  const scoreName = `${id}.numericValue`;
  const commentsName = `${id}.stringValue`;
  const { stringValue, numericValue } = formState[id] || {};

  useEffect(() => {
    setValue(scoreName, numericValue ? numericValue : min);
  }, [min, numericValue, scoreName, setValue]);

  useEffect(() => {
    setValue(commentsName, stringValue ? stringValue : undefined);
  }, [commentsName, setValue, stringValue]);

  return (
    <>
      <FormField name={scoreName}>
        <FormFieldLabel>{label}</FormFieldLabel>
        <FormFieldInput>
          <SliderInput min={min} max={max} step={step} labelStep={step} />
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

export default ScorecardScores;
