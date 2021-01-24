import React, { useEffect } from "react";
import lastDayOfWeek from "date-fns/lastDayOfWeek";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict"

import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import { useScorecardTargetTempLazyQuery } from "../graphql/index";
import { useFormContext } from "react-hook-form";
import StaticValue from "../../common/components/input/StaticValue";
import usePigJob from "./usePigJob";
import { FormValue } from "../contexts/scorecard";

export interface ScorecardTargetTempProps {
  label: string;
  id: string;
}

const ScorecardTargetTemp: React.FC<ScorecardTargetTempProps> = ({
  label,
  id
}) => {
  const { job: pigJob } = usePigJob();
  const { setValue, register, unregister, watch } = useFormContext();
  const [loadResource, { data }] = useScorecardTargetTempLazyQuery();
  const name = `${id}.numericValue`;
  const targetTemp = watch(name);

  const getDateOfISOWeek = (w: number, y: number) => {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
  };

  useEffect(() => {
    if (pigJob && pigJob.groupStartDate) {
      const year = Number(pigJob.groupStartDate.substr(0,4));
      const week = Number(pigJob.groupStartDate.substr(5,7));
      const date = getDateOfISOWeek(week, year);
      const startDate = lastDayOfWeek(date, {weekStartsOn: 2 });
      const diff = formatDistanceToNowStrict(startDate, { unit: 'day'}).split(' ')[0];
      const tempWeeks = Math.min(
        16,
        Math.floor(Math.ceil(Number(diff)) / 7)
      );
      console.log(`tempweeks ${tempWeeks}`);
      const resourceNo = `${tempWeeks}TARGETTEMP`;
      loadResource({ variables: { code: resourceNo } });
    }
  }, [pigJob, loadResource]);

  useEffect(() => {
    if (data && data.resource && data.resource.unitPrice) {
      setValue(name, data.resource.unitPrice);
    }
  }, [data, setValue, name]);

  useEffect(() => {
    register({ name, type: "custom" });
    return () => unregister(name);
  }, [register, name, unregister]);

  return (
    <FormField name={name}>
      <FormFieldLabel>{label}</FormFieldLabel>
      <FormFieldInput noRegister>
        <StaticValue
          value={
            typeof targetTemp === "number" ? `${targetTemp} Degrees` : "Unknown"
          }
        />
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export const isComplete = ({ numericValue }: FormValue) =>
  typeof numericValue === "number";

export default ScorecardTargetTemp;
