import React from "react";
import FormField from "../../components/form/FormField";
import FormFieldLabel from "../../components/form/FormFieldLabel";
import FormFieldInput from "../../components/form/FormFieldInput";
import FormFieldErrors from "../../components/form/FormFieldErrors";
import NumberInput from "../../components/input/NumberInput";

const QuantityField: React.FC = () => {
  return (
    <FormField
      name="quantity"
      rules={{
        required: "The quantity field is required."
      }}
    >
      <FormFieldLabel>Quantity</FormFieldLabel>
      <FormFieldInput>
        <NumberInput />
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export default QuantityField;
