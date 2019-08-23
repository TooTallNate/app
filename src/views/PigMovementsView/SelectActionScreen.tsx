/** @jsx jsx */
import { jsx } from "@emotion/core";
import Selector from "../../components/Selector";
import { RouteComponentProps } from "react-router-dom";

const ITEMS = [
  { value: "CATTLE PURCHASE", title: "Purchase" },
  { value: "GRADE OFF", title: "Grade Off" },
  { value: "MORTALITY", title: "Mortality" },
  { value: "MOVE", title: "Move" },
  { value: "QTY ADJ", title: "Adjustment" },
  { value: "WEAN", title: "Wean" }
];

const SelectActionScreen: React.FC<RouteComponentProps> = ({
  location,
  history
}) => {
  const { action }: { action?: string } = location.state || {};
  return (
    <div>
      <h1>Select Action</h1>
      <Selector
        items={ITEMS}
        value={action}
        onChange={newAction => {
          const state = {
            formPath: location.state.formPath,
            action: newAction
          };
          history.replace({
            ...location,
            state
          });
          history.push({
            pathname: `${state.formPath}/animal`,
            state
          });
        }}
      />
    </div>
  );
};

export default SelectActionScreen;
