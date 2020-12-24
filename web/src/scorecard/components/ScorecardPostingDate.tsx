import React, { useEffect } from "react";
import isMatch from "date-fns/isMatch";
import format from "date-fns/format";

import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import { useGrowFinish } from "../contexts/growFinish";
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
  const { formState } = useGrowFinish();
  const { setValue } = useFormContext();
  const name = `${id}.stringValue`;
  const elementState = formState[id] || {};

  useEffect(() => {
    setValue(
      name,
      elementState.stringValue
        ? elementState.stringValue
        : format(new Date(), DATEFORMAT)
    );
  }, [elementState, name, setValue]);

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

export default ScorecardPostingDate;
