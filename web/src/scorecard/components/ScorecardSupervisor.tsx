import React, { useEffect } from "react";

import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import { useScorecardPeopleQuery } from "../graphql/index";
import TypeaheadInput from "../../common/components/input/TypeaheadInput";
import { FormValue, useGrowFinish } from "../contexts/growFinish";
import { useFormContext } from "react-hook-form";

export interface ScorecardSupervisorProps {
  label: string;
  id: string;
}

const ScorecardSupervisor: React.FC<ScorecardSupervisorProps> = ({
  label,
  id
}) => {
  const { data } = useScorecardPeopleQuery();
  const { formState } = useGrowFinish();
  const { setValue } = useFormContext();

  const name = `${id}.stringValue`;
  const elementState = formState[id] || {};

  useEffect(() => {
    setValue(
      name,
      elementState.stringValue ? elementState.stringValue : undefined
    );
  }, [elementState, id, name, setValue]);

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

export default ScorecardSupervisor;
