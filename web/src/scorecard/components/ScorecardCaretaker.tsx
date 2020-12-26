import React, { useEffect } from "react";

import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import { useScorecardPeopleQuery } from "../graphql/index";
import TypeaheadInput from "../../common/components/input/TypeaheadInput";
import { useScorecard, FormValue } from "../contexts/scorecard";
import { useFormContext } from "react-hook-form";

export interface ScorecardCaretakerProps {
  label: string;
  id: string;
}

const ScorecardCaretaker: React.FC<ScorecardCaretakerProps> = ({
  label,
  id
}) => {
  const { job, formState } = useScorecard();
  const { setValue } = useFormContext();
  const { data } = useScorecardPeopleQuery();
  const name = `${id}.stringValue`;
  const { stringValue } = formState[id] || {};

  useEffect(() => {
    setValue(name, stringValue ? stringValue : job ? job.caretaker : undefined);
  }, [job, name, setValue, stringValue]);

  return (
    <FormField name={name}>
      <FormFieldLabel>{label}</FormFieldLabel>
      <FormFieldInput>
        <TypeaheadInput
          items={((data && data.people) || []).map(person => ({
            title: person.name,
            value: person.number
          }))}
        />
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export const isComplete = ({ stringValue }: FormValue) => !!stringValue;

export default ScorecardCaretaker;
