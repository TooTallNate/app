import React, { useEffect } from "react";

import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import { useScorecardPigJobLazyQuery } from "../graphql/index";
import { useGrowFinish } from "../contexts/growFinish";
import { useFormContext } from "react-hook-form";
import StaticValue from "../../common/components/input/StaticValue";

export interface ScorecardMortalityProps {
  label: string;
  id: string;
}

const ScorecardMortality: React.FC<ScorecardMortalityProps> = ({
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
    if (data && data.job && data.job.deadQuantity) {
      setValue(name, data.job.deadQuantity);
    } else {
      setValue(name, "Unknown");
    }
  }, [data, setValue, name]);

  let deadQuantity = watch(name);

  return (
    <FormField name={name}>
      <FormFieldLabel>{label}</FormFieldLabel>
      <FormFieldInput noRegister>
        <StaticValue
          value={
            typeof deadQuantity === "number" && (data && data.job)
              ? `${data.job.deadQuantity} deads`
              : "Unknown"
          }
        />
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export default ScorecardMortality;
