import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import FormField from "../../common/components/form/FormField";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import StaticValue from "../../common/components/input/StaticValue";
import { FormValue } from "../contexts/scorecard";
import useLivestockJob from "./useLivestockJob";

export interface ScorecardWeeksOnFeedProps {
  label: string;
  id: string;
}

const MS_TO_DAYS_MULTIPLIER = 1000 * 60 * 60 * 24;

const ScorecardWeeksOnFeed: React.FC<ScorecardWeeksOnFeedProps> = ({
  label,
  id
}) => {
  const { job: livestockJob } = useLivestockJob();
  const { setValue, register, unregister, watch } = useFormContext();
  const name = `${id}.numericValue`;
  const weeksOnFeed = watch(name);

  useEffect(() => {
    register({ name, type: "custom" });
    return () => unregister(name);
  }, [register, name, unregister]);

  useEffect(() => {
    let weeksOnFeed: number | undefined;
    if (livestockJob && livestockJob.groupStartDate) {
      const groupStartDate = new Date(livestockJob.groupStartDate).getTime();
      const nowDate = new Date().getTime();
      const diff = (nowDate - groupStartDate) / MS_TO_DAYS_MULTIPLIER;
      const value = Math.floor(Number(diff) / 7);

      // defaulting 0 value to 0.5 to accommodate NAV
      weeksOnFeed = value > 0 ? value : 0.5;
    } else {
      weeksOnFeed = 0.5;
    }
    setValue(name, weeksOnFeed);
  }, [livestockJob, setValue, name]);

  const displayValue = (v: number | undefined): number =>
    typeof v === "number" && v >= 1 ? v : 0;

  return (
    <FormField name={name}>
      <FormFieldLabel>{label}</FormFieldLabel>
      <FormFieldInput noRegister>
        <StaticValue value={displayValue(weeksOnFeed)} />
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export const isComplete = ({ numericValue }: FormValue) =>
  typeof numericValue === "number";

export default ScorecardWeeksOnFeed;
