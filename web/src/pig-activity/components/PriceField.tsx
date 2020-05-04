import React from "react";
import FormField from "../../common/components/form/FormField";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import NumberInput from "../../common/components/input/NumberInput";

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
