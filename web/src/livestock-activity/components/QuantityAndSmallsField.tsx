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
  smallLivestockQuantity?: number;
}

const QuantityAndSmallsField: React.FC = () => {
  const { getValues } = useFormContext<FormData>();

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
            name="smallLivestockQuantity"
            rules={{
              validate: (value: number = 0) =>
                value <= (getValues("quantity") || 0) ||
                "The small livestock quantity field must not be more than the total quantity."
            }}
          >
            <FormFieldLabel>Smalls</FormFieldLabel>
            <FormFieldInput>
              <NumberInput className="w-32" />
            </FormFieldInput>
            <FormFieldErrors />
          </FormField>
        </div>
      </FormGroupContent>
    </FormGroup>
  );
};

export default QuantityAndSmallsField;
