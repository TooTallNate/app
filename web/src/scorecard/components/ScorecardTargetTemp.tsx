import React, { useEffect } from "react";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import { useScorecardTargetTempLazyQuery } from "../graphql/index";
import { useFormContext } from "react-hook-form";
import StaticValue from "../../common/components/input/StaticValue";
import useLivestockJob from "./useLivestockJob";
import { FormValue } from "../contexts/scorecard";

export interface ScorecardTargetTempProps {
  label: string;
  id: string;
}

const ScorecardTargetTemp: React.FC<ScorecardTargetTempProps> = ({
  label,
  id
}) => {
  const { job: livestockJob } = useLivestockJob();
  const { setValue, register, unregister, watch } = useFormContext();
  const [loadResource, { data }] = useScorecardTargetTempLazyQuery();
  const name = `${id}.numericValue`;
  const targetTemp = watch(name);

  useEffect(() => {
    if (livestockJob && livestockJob.groupStartDate) {
      const groupStartDate = new Date(livestockJob.groupStartDate);
      const diff = formatDistanceToNowStrict(groupStartDate, {
        unit: "day"
      }).split(" ")[0];
      const tempWeeks = Math.min(16, Math.floor(Math.ceil(Number(diff)) / 7));
      const resourceNo = `${tempWeeks}TARGETTEMP`;
      loadResource({ variables: { code: resourceNo } });
    }
  }, [livestockJob, loadResource]);

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
