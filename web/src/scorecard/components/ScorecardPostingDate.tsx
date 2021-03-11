import isMatch from "date-fns/isMatch";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import FormField from "../../common/components/form/FormField";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import DateInput from "../../common/components/input/DateInput";
import { dateInputDate, formInputDate } from "../../common/utils";
import { FormValue, useScorecard } from "../contexts/scorecard";

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
    setValue(name, stringValue || formInputDate(dateInputDate(new Date())));
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
        <DateInput separator="/" />
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export const isComplete = ({ stringValue }: FormValue) => !!stringValue;

export default ScorecardPostingDate;
