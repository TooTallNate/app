import React from "react";
import { useFormContext } from "react-hook-form";
import FormField from "../../common/components/form/FormField";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import NumberInput from "../../common/components/input/NumberInput";

interface FormData {
  quantity: number;
  smallPigQuantity?: number;
}

const SmallPigField: React.FC = () => {
  const { getValues, watch } = useFormContext<FormData>();
  const { quantity = 0, smallPigQuantity = 0 } = watch([
    "quantity",
    "smallPigQuantity"
  ]);
  const smallPigRatio =
    100 * Math.min(1, quantity ? smallPigQuantity / quantity : 0);
  const smallPigPercent = `${smallPigRatio.toFixed(2)}%`;

  return (
    <FormField
      name="smallPigQuantity"
      rules={{
        validate: (value: number = 0) =>
          value <= getValues().quantity ||
          "The small pig quantity field must not be more than the total quantity."
      }}
    >
      <FormFieldLabel>Small Pig Quantity</FormFieldLabel>
      <div className="flex items-center">
        <FormFieldInput className="flex-grow">
          <NumberInput />
        </FormFieldInput>
        <div className="ml-4">{smallPigPercent}</div>
      </div>
      <FormFieldErrors />
    </FormField>
  );
};

export default SmallPigField;
