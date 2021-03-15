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
    const { deadQuantity } = pigJob || {};
    if (typeof deadQuantity === "number" && deadQuantity > 0) {
      setValue(name, deadQuantity);
    } else if (typeof deadQuantity === "number" && deadQuantity === 0) {
      setValue(name, "0");
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
            parseInt(deadQuantity) && typeof parseInt(deadQuantity) === "number"
              ? `${parseInt(deadQuantity)} deads`
              : "Unknown"
          }
        />
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export const isComplete = ({ numericValue }: FormValue) =>
  typeof numericValue === "number" || !numericValue;

export default ScorecardMortality;
