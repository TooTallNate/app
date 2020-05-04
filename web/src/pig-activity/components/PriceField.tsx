import React from "react";
import FormField from "../../components/form/FormField";
import FormFieldLabel from "../../components/form/FormFieldLabel";
import FormFieldInput from "../../components/form/FormFieldInput";
import FormFieldErrors from "../../components/form/FormFieldErrors";
import NumberInput from "../../components/input/NumberInput";

const PriceField: React.FC = () => {
  return (
    <FormField
      name="price"
      rules={{
        required: "The price field is required."
      }}
    >
      <FormFieldLabel>Price/pig</FormFieldLabel>
      <FormFieldInput>
        <NumberInput />
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export default PriceField;
