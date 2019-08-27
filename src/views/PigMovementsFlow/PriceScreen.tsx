/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps } from "react-router";
import { FormState, ACTIONS } from "./config";
import TextInput from "../../components/TextInput";
import ButtonInput from "../../components/ButtonInput";

const PriceScreen: React.FC<RouteComponentProps> = ({ location, history }) => {
  const { price, action = "", step }: FormState = location.state || {};
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
    >
      <h1 id="price-label">Enter Price</h1>
      <TextInput
        css={{
          marginBottom: 16
        }}
        type="number"
        value={price}
        aria-labelledby="price-label"
        onChange={e =>
          history.replace({
            ...history.location,
            state: {
              ...history.location.state,
              price: e.target.value
            }
          })
        }
      />
      <ButtonInput
        disabled={!price}
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

export default PriceScreen;
