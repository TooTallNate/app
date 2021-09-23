import React, { useEffect } from "react";

import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import { useScorecardLivestockJobsLazyQuery } from "../graphql/index";
import TypeaheadInput from "../../common/components/input/TypeaheadInput";
import { useScorecard, FormValue } from "../contexts/scorecard";
import { useFormContext } from "react-hook-form";

export interface ScorecardLivestockJobProps {
  label: string;
  id: string;
}

const ScorecardLivestockJob: React.FC<ScorecardLivestockJobProps> = ({
  label,
  id
}) => {
  const { job, formState } = useScorecard();
  const { setValue } = useFormContext();
  const [loadJobs, { data }] = useScorecardLivestockJobsLazyQuery();
  const name = `${id}.stringValue`;
  const { stringValue } = formState[id] || {};

  useEffect(() => {
    if (job) {
      loadJobs({ variables: { location: job.location } });
    }
  }, [job, loadJobs]);

  useEffect(() => {
    setValue(name, stringValue);
  }, [stringValue, name, setValue]);

  return (
    <FormField name={name}>
      <FormFieldLabel>{label}</FormFieldLabel>
      <FormFieldInput>
        <TypeaheadInput
          items={((data && data.jobs) || []).map(job => ({
            title: `${job.number} ${job.description}`,
            value: job.number
          }))}
        />
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export const isComplete = ({ stringValue }: FormValue) => !!stringValue;

export default ScorecardLivestockJob;
