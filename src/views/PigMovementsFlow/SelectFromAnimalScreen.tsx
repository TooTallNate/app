/** @jsx jsx */
import { jsx } from "@emotion/core";
import Selector from "../../components/Selector";
import { RouteComponentProps } from "react-router";
import { ACTIONS, FormState } from "./config";

const SelectFromAnimalScreen: React.FC<RouteComponentProps> = ({
  location,
  history
}) => {
  const { action = "", fromAnimal, step }: FormState = location.state || {};
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
    >
      <h1>Select From Animal</h1>
      <Selector
        items={ACTIONS[action].animals}
        value={fromAnimal}
        onChange={newAnimal => {
          const state = {
            ...location.state,
            step: step + 1,
            fromAnimal: newAnimal
          };
          history.replace({
            ...location,
            state
          });
          history.push({
            pathname: `${state.formPath}/${ACTIONS[action].steps[state.step]}`,
            state
          });
        }}
      />
    </div>
  );
};

export default SelectFromAnimalScreen;
