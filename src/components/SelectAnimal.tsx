/** @jsx jsx */
import { jsx } from "@emotion/core";
import Selector from "./Selector";

const ITEMS = [
  {
    value: "MARKET PIGS",
    title: "Market Pigs",
    actions: [
      "WEAN",
      "CATTLE PURCHASE",
      "MORTALITY",
      "MOVE",
      "GRADE OFF",
      "QTY ADJ"
    ]
  },
  {
    value: "GDU PIGS",
    title: "GDU Pigs",
    actions: [
      "WEAN",
      "CATTLE PURCHASE",
      "MORTALITY",
      "MOVE",
      "GRADE OFF",
      "QTY ADJ"
    ]
  },
  {
    value: "SOWS",
    title: "Sows",
    actions: ["CATTLE PURCHASE", "MORTALITY", "QTY ADJ"]
  }
];

interface SelectActionProps {
  action?: string;
  animal?: string;
  onChange?: (value: string) => void;
}

const SelectAction: React.FC<SelectActionProps> = ({
  action = "",
  animal,
  onChange = () => {}
}) => {
  return (
    <div>
      <h1>Select Animal</h1>
      <Selector
        items={ITEMS.filter(item => item.actions.includes(action))}
        value={animal}
        onChange={onChange}
      />
    </div>
  );
};

export default SelectAction;
