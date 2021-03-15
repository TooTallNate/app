import React, { useEffect } from "react";

import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import { FormValue } from "../contexts/scorecard";
import { useFormContext } from "react-hook-form";
import StaticValue from "../../common/components/input/StaticValue";
import usePigJob from "./usePigJob";

export interface ScorecardMortalityProps {
  label: string;
  id: string;
}

const ScorecardMortality: React.FC<ScorecardMortalityProps> = ({
  label,
  id
}) => {
  const { job: pigJob } = usePigJob();
  const { setValue, register, unregister, watch } = useFormContext();
  const name = `${id}.numericValue`;

  useEffect(() => {
    register({ name, type: "custom" });
    return () => unregister(name);
  }, [register, name, unregister]);

  useEffect(() => {
    if (pigJob && pigJob.deadQuantity && pigJob.deadQuantity > 0) {
      setValue(name, pigJob.deadQuantity);
    } else {
      setValue(name, "Unknown");
    }
  }, [pigJob, setValue, name]);

  let deadQuantity = watch(name);

  return (
    <FormField name={name}>
      <FormFieldLabel>{label}</FormFieldLabel>
      <FormFieldInput noRegister>
        <StaticValue
          value={
            typeof deadQuantity === "number" ? `${deadQuantity} deads` : "None"
          }
        />
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export const isMortalityComplete = true;

export default ScorecardMortality;
