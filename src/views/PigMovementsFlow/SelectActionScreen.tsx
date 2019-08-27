/** @jsx jsx */
import { jsx } from "@emotion/core";
import Selector from "../../components/Selector";
import { RouteComponentProps } from "react-router-dom";
import { ACTIONS, FormState } from "./config";

const SelectActionScreen: React.FC<RouteComponentProps> = ({
  location,
  history
}) => {
  const { action, formPath }: FormState = location.state || {};
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
    >
      <h1>Select Action</h1>
      <Selector
        items={Object.values(ACTIONS)}
        value={action}
        onChange={newAction => {
          const state: FormState = {
            formPath: location.state.formPath,
            step: 0,
            action: newAction
          };
          history.replace({
            ...location,
            state
          });
          history.push({
            pathname: `${state.formPath}/${ACTIONS[newAction].steps[0]}`,
            state
          });
        }}
      />
    </div>
  );
};

export default SelectActionScreen;
