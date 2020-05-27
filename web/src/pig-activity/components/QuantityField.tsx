import React from "react";
import FormField from "../../common/components/form/FormField";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import NumberInput from "../../common/components/input/NumberInput";

const QuantityField: React.FC = () => {
  return (
    <FormField
      name="quantity"
      rules={{
        required: "The total quantity field is required."
      }}
    >
      <FormFieldLabel>Total Quantity</FormFieldLabel>
      <FormFieldInput>
        <NumberInput className="w-32" />
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export default QuantityField;
