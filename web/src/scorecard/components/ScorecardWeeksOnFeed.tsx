import React, { useEffect } from "react";
import lastDayOfWeek from "date-fns/lastDayOfWeek";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict"

import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import { FormValue } from "../contexts/scorecard";
import { useFormContext } from "react-hook-form";
import StaticValue from "../../common/components/input/StaticValue";
import usePigJob from "./usePigJob";
import { start } from "repl";
import { getDate } from "date-fns";

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
    if (pigJob && pigJob.groupStartDate) {
      const groupStartDate = new Date(pigJob.groupStartDate);
      const diff = formatDistanceToNowStrict(groupStartDate, { unit: 'day'}).split(' ')[0];
      weeksOnFeed = Math.floor(Math.ceil(Number(diff)) / 7);
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
