import React from "react";
import FormField from "../../components/form/FormField";
import FormFieldLabel from "../../components/form/FormFieldLabel";
import FormFieldInput from "../../components/form/FormFieldInput";
import FormFieldErrors from "../../components/form/FormFieldErrors";
import NumberInput from "../../components/input/NumberInput";

const WeightField: React.FC = () => {
  return (
    <FormField
      name="weight"
      rules={{
        required: "The total weight field is required."
      }}
    >
      <FormFieldLabel>Total Weight</FormFieldLabel>
      <FormFieldInput>
        <NumberInput />
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export default WeightField;
