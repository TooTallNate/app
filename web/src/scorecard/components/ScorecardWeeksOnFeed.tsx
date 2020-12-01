import React, { useEffect } from "react";

import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import { useScorecardJobLazyQuery } from "../graphql/index";
import { useGrowFinish, FormValue } from "../contexts/growFinish";
import { useFormContext } from "react-hook-form";
import StaticValue from "../../common/components/input/StaticValue";

export interface ScorecardWeeksOnFeedProps {
  label: string;
  id: string;
}

const ScorecardWeeksOnFeed: React.FC<ScorecardWeeksOnFeedProps> = ({
  label,
  id
}) => {
  const { formState } = useGrowFinish();
  const { setValue } = useFormContext();
  const [loadJob, { data }] = useScorecardJobLazyQuery();
  const name = `${id}.stringValue`;
  const elementState = formState[id] || {};
  const jobElement = formState["0002JOB"] || {};
  console.log(jobElement.stringValue);

  useEffect(() => {
    if (jobElement.stringValue) {
      loadJob({ variables: { job: jobElement.stringValue } });
    }
  }, [jobElement, loadJob]);

  useEffect(() => {
    setValue(
      name,
      elementState.numericValue ? elementState.numericValue : undefined
    );
  }, [elementState, id, data, setValue, jobElement, name]);

  let weeksOnFeed = undefined;
  if (data && data.job && data.job.startDate) {
    const today = new Date();
    const postingDate = new Date(data.job.startDate);
    const diff = Math.abs(today.valueOf() - postingDate.valueOf());
    weeksOnFeed = Math.floor(Math.ceil(diff / (1000 * 3600 * 24)) / 7);
  } else {
    weeksOnFeed = "Unknown";
  }

  return (
    <FormField name={name}>
      <FormFieldLabel>{label}</FormFieldLabel>
      <FormFieldInput noRegister>
        <StaticValue value={weeksOnFeed} />
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export const isComplete = ({ numericValue }: FormValue) =>
  typeof numericValue === "number";

export default ScorecardWeeksOnFeed;
