import React, { useEffect } from "react";

import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import { useScorecardUsersQuery } from "../graphql/index";
import TypeaheadInput from "../../common/components/input/TypeaheadInput";
import { FormValue, useScorecard } from "../contexts/scorecard";
import { useFormContext } from "react-hook-form";

export interface ScorecardSupervisorProps {
  label: string;
  id: string;
}

const ScorecardSupervisor: React.FC<ScorecardSupervisorProps> = ({
  label,
  id
}) => {
  const { data } = useScorecardUsersQuery();
  const { job, formState } = useScorecard();
  const { setValue } = useFormContext();

  const name = `${id}.stringValue`;
  const { stringValue } = formState[id] || {};

  useEffect(() => {
    setValue(
      name,
      stringValue ? stringValue : job ? job.projectManager : undefined
    );
  }, [job, name, setValue, stringValue]);

  //comment

  return (
    <FormField name={name}>
      <FormFieldLabel>{label}</FormFieldLabel>
      <FormFieldInput>
        <TypeaheadInput
          items={((data && data.users) || [])
            .filter(person => {
              return person.name.length > 0;
            })
            .map(user => ({
              title:
                user.name ||
                (user.username || "").split("/")[1] ||
                user.username,
              value: user.username
            }))}
        />
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export const isComplete = ({ stringValue }: FormValue) => !!stringValue;

export default ScorecardSupervisor;
