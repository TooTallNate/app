import React, { useEffect, useState } from "react";

import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import {
  useScorecardPigJobLazyQuery,
  useScorecardTargetTempLazyQuery
} from "../graphql/index";
import { useGrowFinish } from "../contexts/growFinish";
import { useFormContext } from "react-hook-form";
import StaticValue from "../../common/components/input/StaticValue";

export interface ScorecardTargetTempProps {
  label: string;
  id: string;
}

const ScorecardTargetTemp: React.FC<ScorecardTargetTempProps> = ({
  label,
  id
}) => {
  const { formState } = useGrowFinish();
  const { setValue, register, unregister, watch } = useFormContext();
  const [loadResource, { data }] = useScorecardTargetTempLazyQuery();
  const [loadJob, { data: jobData }] = useScorecardPigJobLazyQuery();
  const name = `${id}.numericValue`;
  const [weeksOnFeed, setWeeksOnFeed] = useState(Number);
  const [, jobElement] =
    Object.entries(formState).find(([id, entry]) => id.slice(4) === "JOB") ||
    [];

  useEffect(() => {
    if (jobElement && jobElement.stringValue) {
      loadJob({ variables: { job: jobElement.stringValue } });
    }
  }, [jobElement, loadJob]);

  useEffect(() => {
    if (jobData && jobData.job && jobData.job.startDate) {
      const today = new Date();
      const postingDate = new Date(jobData.job.startDate);
      const diff = Math.abs(today.valueOf() - postingDate.valueOf());
      const tempWeeks = Math.floor(Math.ceil(diff / (1000 * 3600 * 24)) / 7);
      if (tempWeeks > 16) {
        setWeeksOnFeed(16);
      } else {
        setWeeksOnFeed(tempWeeks);
      }
      const resourceNo = `${weeksOnFeed}TARGETTEMP`;
      loadResource({ variables: { code: resourceNo } });
    }
  }, [jobData, weeksOnFeed, loadResource]);

  useEffect(() => {
    if (data && data.resource && data.resource.unitPrice) {
      setValue(name, data.resource.unitPrice);
    }
  }, [data, setValue, name]);

  useEffect(() => {
    register({ name, type: "custom" });
    return () => unregister(name);
  }, [register, name, unregister]);
  let targetTemp = watch(name);

  return (
    <FormField name={name}>
      <FormFieldLabel>{label}</FormFieldLabel>
      <FormFieldInput noRegister>
        <StaticValue
          value={typeof targetTemp === "number" ? `${targetTemp} Degrees` : ""}
        />
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export default ScorecardTargetTemp;
