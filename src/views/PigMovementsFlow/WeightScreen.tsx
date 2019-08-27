/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps } from "react-router";
import { FormState, ACTIONS } from "./config";
import TextInput from "../../components/TextInput";
import ButtonInput from "../../components/ButtonInput";

const WeightScreen: React.FC<RouteComponentProps> = ({ location, history }) => {
  const { weight, action = "", step }: FormState = location.state || {};
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
    >
      <h1 id="weight-label">Enter Weight</h1>
      <TextInput
        css={{
          marginBottom: 16
        }}
        type="number"
        value={weight}
        aria-labelledby="weight-label"
        onChange={e =>
          history.replace({
            ...history.location,
            state: {
              ...history.location.state,
              weight: e.target.value
            }
          })
        }
      />
      <ButtonInput
        disabled={!weight}
        onClick={() => {
          history.push({
            pathname: ACTIONS[action].steps[step + 1],
            state: {
              ...history.location.state,
              step: step + 1
            }
          });
        }}
      >
        Continue
      </ButtonInput>
    </div>
  );
};

export default WeightScreen;
