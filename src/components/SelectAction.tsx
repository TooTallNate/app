/** @jsx jsx */
import { jsx } from "@emotion/core";
import Selector from "./Selector";

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

const SelectAction: React.FC<SelectActionProps> = ({
  action,
  onChange = () => {}
}) => {
  return (
    <div>
      <h1>Select Action</h1>
      <Selector items={ITEMS} value={action} onChange={onChange} />
    </div>
  );
};

export default SelectAction;
