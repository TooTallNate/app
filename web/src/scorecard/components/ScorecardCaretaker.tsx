import React, { useEffect } from "react";

import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import { useScorecardPeopleQuery } from "../graphql/index";
import TypeaheadInput from "../../common/components/input/TypeaheadInput";
import { useGrowFinish } from "../contexts/growFinish";
import { useFormContext } from "react-hook-form";

export interface ScorecardCaretakerProps {
  label: string;
  id: string;
}

const ScorecardCaretaker: React.FC<ScorecardCaretakerProps> = ({
  label,
  id
}) => {
  const { job } = useGrowFinish();
  const { setValue } = useFormContext();
  const { data } = useScorecardPeopleQuery();

  const name = `${id}.stringValue`;

  useEffect(() => {
    setValue(name, job ? job.caretaker : null);
  }, [job, name, setValue]);

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

export default ScorecardCaretaker;
