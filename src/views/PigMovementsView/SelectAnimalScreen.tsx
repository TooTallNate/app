/** @jsx jsx */
import { jsx } from "@emotion/core";
import SelectScreen from "../../components/SelectScreen";

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

const SelectActionScreen: React.FC<SelectActionProps> = ({
  action = "",
  animal,
  onChange = () => {}
}) => {
  return (
    <SelectScreen
      title="Select Animal"
      items={ITEMS.filter(item => item.actions.includes(action))}
      value={animal}
      onChange={onChange}
    />
  );
};

export default SelectActionScreen;
