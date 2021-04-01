import React from "react";
import FormField from "../../common/components/form/FormField";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import StaticValue from "../../common/components/input/StaticValue";
export interface InventoryFieldProps {
  className?: string;
  inventory: number;
  deadQuantity: number;
}
const TextRow = (props: {
  className: string | undefined;
  label: string;
  value: string | number;
}) => (
  <FormField name="inventory" className={props.className}>
    <div className="flex w-full items-center divide-y divide-gray-200">
      <div className="flex w-48 items-start">
        <FormFieldLabel>{props.label}</FormFieldLabel>
      </div>
      <div style={{ backgroundColor: "blue" }}>
        <FormFieldInput className="flex" noRegister>
          <StaticValue
            className="flex items-center content-center justify-items-center"
            value={`${props.value}`}
          />
        </FormFieldInput>
      </div>
    </div>
  </FormField>
);
const InventoryField: React.FC<InventoryFieldProps> = ({
  className,
  inventory,
  deadQuantity
}) => {
  return (
    <div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300"></div>
        </div>
      </div>
      <TextRow className={className} label="Inventory" value={`${inventory}`} />
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300"></div>
        </div>
      </div>
      <TextRow className={className} label="Deads" value={`${deadQuantity}`} />
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300"></div>
        </div>
      </div>
    </div>
  );
};
export default InventoryField;
