import React from "react";

import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import { useScorecardPeopleQuery } from "../graphql/index";
import TypeaheadInput from "../../common/components/input/TypeaheadInput";

export interface ScorecardSupervisorProps {
  label: string;
  id: string;
}

const ScorecardSupervisor: React.FC<ScorecardSupervisorProps> = ({
  label,
  id
}) => {
  const { data } = useScorecardPeopleQuery();

  const name = `${id}.stringValue`;

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

export default ScorecardSupervisor;
