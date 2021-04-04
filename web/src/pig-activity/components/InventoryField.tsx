import React from "react";
import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import StaticValue from "../../common/components/input/StaticValue";
import Divider from "../../common/components/layout/Divider";

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
    <div className="py-2">
      <Divider />
      <FormField name="inventory" className={className}>
        <div className="flex w-full items-center divide-y divide-gray-200">
          <div className="flex w-48 items-start">
            <FormFieldLabel>Inventory</FormFieldLabel>
          </div>
          <div>
            <FormFieldInput className="flex" noRegister>
              <StaticValue
                className="flex items-center content-center justify-items-center"
                value={`${inventory}`}
              />
            </FormFieldInput>
          </div>
        </div>
      </FormField>
      <Divider />
      <FormField name="inventory" className={className}>
        <div className="flex w-full items-center divide-y divide-gray-200">
          <div className="flex w-48 items-start">
            <FormFieldLabel>Deads</FormFieldLabel>
          </div>
          <div>
            <FormFieldInput className="flex" noRegister>
              <StaticValue
                className="flex items-center content-center justify-items-center"
                value={`${deadQuantity}`}
              />
            </FormFieldInput>
          </div>
        </div>
      </FormField>
      <Divider />
    </div>
  );
};
export default InventoryField;
