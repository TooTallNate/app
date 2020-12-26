import React, { useEffect } from "react";

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

  useEffect(() => {
    if (pigJob && pigJob.startDate) {
      const today = new Date();
      const postingDate = new Date(pigJob.startDate);
      const diff = Math.abs(today.valueOf() - postingDate.valueOf());
      const tempWeeks = Math.min(
        16,
        Math.floor(Math.ceil(diff / (1000 * 3600 * 24)) / 7)
      );
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
