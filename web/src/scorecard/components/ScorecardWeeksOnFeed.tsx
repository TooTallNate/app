import React, { useEffect } from "react";

import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import { FormValue } from "../contexts/scorecard";
import { useFormContext } from "react-hook-form";
import StaticValue from "../../common/components/input/StaticValue";
import usePigJob from "./usePigJob";

export interface ScorecardWeeksOnFeedProps {
  label: string;
  id: string;
}

const ScorecardWeeksOnFeed: React.FC<ScorecardWeeksOnFeedProps> = ({
  label,
  id
}) => {
  const { job: pigJob } = usePigJob();
  const { setValue, register, unregister, watch } = useFormContext();
  const name = `${id}.numericValue`;
  const weeksOnFeed = watch(name);

  useEffect(() => {
    register({ name, type: "custom" });
    return () => unregister(name);
  }, [register, name, unregister]);

  useEffect(() => {
    let weeksOnFeed;
    if (pigJob && pigJob.startDate) {
      const today = new Date();
      const postingDate = new Date(pigJob.startDate);
      const diff = Math.abs(today.valueOf() - postingDate.valueOf());
      weeksOnFeed = Math.floor(Math.ceil(diff / (1000 * 3600 * 24)) / 7);
    } else {
      weeksOnFeed = undefined;
    }
    setValue(name, weeksOnFeed);
  }, [pigJob, setValue, name]);

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
