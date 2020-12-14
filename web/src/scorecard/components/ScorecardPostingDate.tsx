import React, { useEffect } from "react";

import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import { useScorecardPigJobLazyQuery } from "../graphql/index";
import { useGrowFinish } from "../contexts/growFinish";
import { useFormContext } from "react-hook-form";
import StaticValue from "../../common/components/input/StaticValue";
import TextInput from "../../common/components/input/TextInput";

export interface ScorecardPostingDateProps {
  label: string;
  id: string;
}

const ScorecardPostingDate: React.FC<ScorecardPostingDateProps> = ({
  label,
  id
}) => {
  const { formState } = useGrowFinish();
  const { setValue, register, unregister, watch } = useFormContext();
  const [loadJob, { data }] = useScorecardPigJobLazyQuery();
  const name = `${id}.stringValue`;
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
    if (data && data.job && data.job.startDate) {
      setValue(name, data.job.startDate);
    } else {
      setValue(name, "Enter Date");
    }
  }, [data, setValue, name]);

  let startDate = watch(name);

  return (
    <FormField name={name}>
      <FormFieldLabel>{label}</FormFieldLabel>
      <FormFieldInput noRegister>
        <StaticValue
          // value={
          //   typeof startDate === "string" ? `${data?.job?.startDate}` : "Enter Date"
          // }
          value="45"
        />
        <TextInput />
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export default ScorecardPostingDate;
