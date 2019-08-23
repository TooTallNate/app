/** @jsx jsx */
import { jsx } from "@emotion/core";
import SelectScreen from "../../components/SelectScreen";

const ITEMS = [
  { value: "CATTLE PURCHASE", title: "Purchase" },
  { value: "GRADE OFF", title: "Grade Off" },
  { value: "MORTALITY", title: "Mortality" },
  { value: "MOVE", title: "Move" },
  { value: "QTY ADJ", title: "Adjustment" },
  { value: "WEAN", title: "Wean" }
];

interface SelectActionProps {
  action?: string;
  onChange?: (value: string) => void;
}

const SelectActionScreen: React.FC<SelectActionProps> = ({
  action,
  onChange = () => {}
}) => {
  return (
    <SelectScreen
      title="Select Action"
      items={ITEMS}
      value={action}
      onChange={onChange}
    />
  );
};

export default SelectActionScreen;
