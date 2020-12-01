import React, { useEffect } from "react";

import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import { useScorecardPigJobLazyQuery } from "../graphql/index";
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
  const { setValue, register, unregister, watch } = useFormContext();
  const [loadJob, { data }] = useScorecardPigJobLazyQuery();
  const name = `${id}.numericValue`;
  const [, jobElement] =
    Object.entries(formState).find(([id, entry]) => id.slice(4) === "JOB") ||
    [];

  useEffect(() => {
    if (jobElement && jobElement.stringValue) {
      loadJob({ variables: { job: jobElement.stringValue } });
    }
  }, [jobElement, loadJob]);

  useEffect(() => {
    register({ name, type: "custom" });
    return () => unregister(name);
  }, [register, name, unregister]);

  useEffect(() => {
    let weeksOnFeed;
    if (data && data.job && data.job.startDate) {
      const today = new Date();
      const postingDate = new Date(data.job.startDate);
      const diff = Math.abs(today.valueOf() - postingDate.valueOf());
      weeksOnFeed = Math.floor(Math.ceil(diff / (1000 * 3600 * 24)) / 7);
    } else {
      weeksOnFeed = undefined;
    }
    setValue(name, weeksOnFeed);
  }, [data, setValue, name]);

  let weeksOnFeed = watch(name);

  return (
    <FormField name={name}>
      <FormFieldLabel>{label}</FormFieldLabel>
      <FormFieldInput noRegister>
        <StaticValue
          value={
            typeof weeksOnFeed === "number" ? `${weeksOnFeed} weeks` : "Unknown"
          }
        />
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export const isComplete = ({ numericValue }: FormValue) =>
  typeof numericValue === "number";

export default ScorecardWeeksOnFeed;
