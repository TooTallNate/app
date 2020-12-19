import React, { useEffect } from "react";

import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import { useScorecardTargetTempLazyQuery } from "../graphql/index";
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
  const name = `${id}.numericValue`;
  const [, jobElement] =
    Object.entries(formState).find(([id, entry]) => id.slice(4) === "JOB") ||
    [];

  //calculate weeks on feed, use that to query resource

  useEffect(() => {
    if (jobElement && jobElement.numericValue) {
      let weeksOnFeed = "16TARGETTEMP";
      if (jobElement.numericValue >= 16 || !jobElement.numericValue) {
        weeksOnFeed = `${jobElement.numericValue}TARGETTEMP`;
      }
      console.log();
      loadResource({ variables: { code: weeksOnFeed } });
    }
  }, [jobElement, loadResource]);

  useEffect(() => {
    register({ name, type: "custom" });
    return () => unregister(name);
  }, [register, name, unregister]);

  useEffect(() => {
    if (data && data.resource) {
      setValue(name, data.resource.unitPrice);
    }
  }, [data, setValue, name]);

  let targetTemp = watch(name);

  return (
    <FormField name={name}>
      <FormFieldLabel>{label}</FormFieldLabel>
      <FormFieldInput noRegister>
        <StaticValue value={targetTemp} />
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export default ScorecardTargetTemp;
