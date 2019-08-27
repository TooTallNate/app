/** @jsx jsx */
import { jsx } from "@emotion/core";
import Selector from "../../components/Selector";
import { RouteComponentProps } from "react-router";
import { ACTIONS, FormState } from "./config";

const SelectToAnimalScreen: React.FC<RouteComponentProps> = ({
  location,
  history
}) => {
  const { action = "", toAnimal, step }: FormState = location.state || {};
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
    >
      <h1>Select To Animal</h1>
      <Selector
        items={ACTIONS[action].animals}
        value={toAnimal}
        onChange={newAnimal => {
          const state = {
            ...location.state,
            step: step + 1,
            toAnimal: newAnimal
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

export default SelectToAnimalScreen;
