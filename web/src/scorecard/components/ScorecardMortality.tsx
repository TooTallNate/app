import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import FormField from "../../common/components/form/FormField";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import StaticValue from "../../common/components/input/StaticValue";
import useLivestockJob from "./useLivestockJob";

export interface ScorecardMortalityProps {
  label: string;
  id: string;
}

const ScorecardMortality: React.FC<ScorecardMortalityProps> = ({
  label,
  id
}) => {
  const { job: livestockJob } = useLivestockJob();
  const { setValue, register, unregister, watch } = useFormContext();
  const name = `${id}.numericValue`;

  useEffect(() => {
    register({ name, type: "custom" });
    return () => unregister(name);
  }, [register, name, unregister]);

  useEffect(() => {
    if (
      livestockJob &&
      livestockJob.deadQuantity &&
      livestockJob.deadQuantity > 0
    ) {
      setValue(name, livestockJob.deadQuantity);
    } else {
      setValue(name, null);
    }
  }, [livestockJob, setValue, name]);

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

export const isComplete = () => true;

export default ScorecardMortality;
