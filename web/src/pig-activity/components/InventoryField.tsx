import React from "react";
import FormField from "../../components/form/FormField";
import FormFieldLabel from "../../components/form/FormFieldLabel";
import FormFieldInput from "../../components/form/FormFieldInput";
import StaticValue from "../../components/input/StaticValue";

export interface InventoryFieldProps {
  className?: string;
  inventory: number;
  deadQuantity: number;
}

const InventoryField: React.FC<InventoryFieldProps> = ({
  className,
  inventory,
  deadQuantity
}) => {
  return (
    <FormField name="inventory" className={className}>
      <FormFieldLabel>Current Inventory</FormFieldLabel>
      <FormFieldInput noRegister>
        <StaticValue value={`${inventory}, ${deadQuantity} deads`} />
      </FormFieldInput>
    </FormField>
  );
};

export default InventoryField;
