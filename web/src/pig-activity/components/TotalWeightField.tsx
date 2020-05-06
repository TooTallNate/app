import React from "react";
import FormField from "../../common/components/form/FormField";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import NumberInput from "../../common/components/input/NumberInput";

const TotalWeightField: React.FC = () => {
  return (
    <FormField
      name="totalWeight"
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

export default TotalWeightField;
