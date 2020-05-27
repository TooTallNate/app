import React from "react";
import { useFormContext } from "react-hook-form";
import FormField from "../../common/components/form/FormField";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import NumberInput from "../../common/components/input/NumberInput";
import HorizontalSpacer from "../../common/components/layout/HorizontalSpacer";
import FormGroup from "../../common/components/form/FormGroup";
import FormGroupContent from "../../common/components/form/FormGroupContent";
import FormGroupLabel from "../../common/components/form/FormGroupLabel";

// TODO: move percent below field

interface FormData {
  quantity: number;
  smallPigQuantity?: number;
}

const QuantityAndSmallsField: React.FC = () => {
  const { getValues, watch } = useFormContext<FormData>();
  const { quantity = 0, smallPigQuantity = 0 } = watch([
    "quantity",
    "smallPigQuantity"
  ]);
  const smallPigRatio =
    100 * Math.min(1, quantity ? smallPigQuantity / quantity : 0);
  const smallPigPercent = `${smallPigRatio.toFixed(2)}%`;

  return (
    <FormGroup>
      <FormGroupLabel>Quantity</FormGroupLabel>
      <FormGroupContent>
        <div className="flex">
          <FormField
            name="quantity"
            rules={{
              required: "The total quantity field is required."
            }}
          >
            <FormFieldLabel>Total</FormFieldLabel>
            <FormFieldInput>
              <NumberInput className="w-32" />
            </FormFieldInput>
            <FormFieldErrors />
          </FormField>
          <HorizontalSpacer />
          <FormField
            name="smallPigQuantity"
            rules={{
              validate: (value: number = 0) =>
                value <= getValues().quantity ||
                "The small pig quantity field must not be more than the total quantity."
            }}
          >
            <FormFieldLabel>Smalls</FormFieldLabel>
            <div className="flex items-center">
              <FormFieldInput>
                <NumberInput className="w-24" />
              </FormFieldInput>
              <div className="ml-4">{smallPigPercent}</div>
            </div>
            <FormFieldErrors />
          </FormField>
        </div>
      </FormGroupContent>
    </FormGroup>
  );
};

export default QuantityAndSmallsField;
