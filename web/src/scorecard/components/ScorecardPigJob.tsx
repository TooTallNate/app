import React, { useEffect } from "react";

import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import { useScorecardPigJobsLazyQuery } from "../graphql/index";
import TypeaheadInput from "../../common/components/input/TypeaheadInput";
import { useGrowFinish } from "../contexts/growFinish";

export interface ScorecardPigJobProps {
  label: string;
  id: string;
}

const ScorecardPigJob: React.FC<ScorecardPigJobProps> = ({ label, id }) => {
  const { job } = useGrowFinish();
  const [loadJobs, { data }] = useScorecardPigJobsLazyQuery();

  const name = `${id}.stringValue`;

  useEffect(() => {
    if (job) {
      loadJobs({ variables: { location: job.location } });
    }
  }, [job, loadJobs]);

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

export default ScorecardPigJob;
