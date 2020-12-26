import React, { useEffect } from "react";
import isMatch from "date-fns/isMatch";
import format from "date-fns/format";

import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import { FormValue, useScorecard } from "../contexts/scorecard";
import { useFormContext } from "react-hook-form";
import TextInput from "../../common/components/input/TextInput";

export interface ScorecardPostingDateProps {
  label: string;
  id: string;
}

const DATEFORMAT = "MM/dd/yyyy";

const ScorecardPostingDate: React.FC<ScorecardPostingDateProps> = ({
  label,
  id
}) => {
  const { formState } = useScorecard();
  const { setValue } = useFormContext();
  const name = `${id}.stringValue`;
  const { stringValue } = formState[id] || {};

  useEffect(() => {
    setValue(name, stringValue ? stringValue : format(new Date(), DATEFORMAT));
  }, [name, setValue, stringValue]);

  return (
    <FormField
      name={name}
      rules={{
        validate: {
          isDate: (value: string) =>
            !value ||
            isMatch(value, DATEFORMAT) ||
            "Date must be in format MM/DD/YYYY"
        }
      }}
    >
      <FormFieldLabel>{label}</FormFieldLabel>
      <FormFieldInput>
        <TextInput />
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export const isComplete = ({ stringValue }: FormValue) => !!stringValue;

export default ScorecardPostingDate;
