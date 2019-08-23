/** @jsx jsx */
import { jsx } from "@emotion/core";
import Selector from "../../components/Selector";
import { RouteComponentProps } from "react-router";

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

const SelectActionScreen: React.FC<RouteComponentProps> = ({
  location,
  history
}) => {
  const { action = "", animal }: { action?: string; animal?: string } =
    location.state || {};
  return (
    <div>
      <h1>Select Animal</h1>
      <Selector
        items={ITEMS.filter(item => item.actions.includes(action))}
        value={animal}
        onChange={newAnimal => {
          const state = {
            ...location.state,
            animal: newAnimal
          };
          history.replace({
            ...location,
            state
          });
        }}
      />
    </div>
  );
};

export default SelectActionScreen;
