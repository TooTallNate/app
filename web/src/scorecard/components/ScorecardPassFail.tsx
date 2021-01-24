import React, { useEffect } from "react";

import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import StackedInput from "../../common/components/input/StackedInput";
import StackedRadioButton from "../../common/components/input/StackedRadioButton";
import { FormValue, useScorecard } from "../contexts/scorecard";
import { useFormContext } from "react-hook-form";
import VerticalSpacer from "../../common/components/layout/VerticalSpacer";
import { Spacing } from "../../common/components/layout/spacing";
import MultilineTextInput from "../../common/components/input/MultilineTextInput";

export interface ScorecardPassFailProps {
  label: string;
  id: string;
}

const ScorecardPassFail: React.FC<ScorecardPassFailProps> = ({ label, id }) => {
  const { formState } = useScorecard();
  const { setValue } = useFormContext();
  const name = `${id}.numericValue`;
  const commentsName = `${id}.stringValue`;
  const { stringValue, numericValue } = formState[id] || {};

  useEffect(() => {
    setValue(name, numericValue);
  }, [numericValue, name, setValue]);

  useEffect(() => {
    setValue(commentsName, stringValue ? stringValue : undefined);
  }, [commentsName, setValue, stringValue]);

  return (
    <>
    <FormField name={name}>
      <FormFieldLabel>{label}</FormFieldLabel>
      <FormFieldInput>
        <StackedInput orientation="horizontal">
          <StackedRadioButton value={1}>Pass</StackedRadioButton>
          <StackedRadioButton value={-1}>Fail</StackedRadioButton>
        </StackedInput>
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

export default ScorecardPassFail;
