/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps } from "react-router";
import { FormState, ACTIONS } from "./config";
import TextInput from "../../components/TextInput";
import ButtonInput from "../../components/ButtonInput";

const QuantityScreen: React.FC<RouteComponentProps> = ({
  location,
  history
}) => {
  const { quantity, action = "", step }: FormState = location.state || {};
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
    >
      <h1 id="quantity-label">Enter Quantity</h1>
      <TextInput
        css={{
          marginBottom: 16
        }}
        type="number"
        value={quantity}
        aria-labelledby="quantity-label"
        onChange={e =>
          history.replace({
            ...history.location,
            state: {
              ...history.location.state,
              quantity: e.target.value
            }
          })
        }
      />
      <ButtonInput
        disabled={!quantity}
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

export default QuantityScreen;
