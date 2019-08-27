/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps } from "react-router";
import { FormState, ACTIONS } from "./config";
import ButtonInput from "../../components/ButtonInput";
import TypeaheadInput from "../../components/TypeaheadInput";

const GROUPS = [
  { value: "A GRP 1" },
  { value: "A GRP 2" },
  { value: "B GRP 1" },
  { value: "A GRP 3" },
  { value: "B GRP 2" }
];

const GroupScreen: React.FC<RouteComponentProps> = ({ location, history }) => {
  const { group, action = "", step }: FormState = location.state || {};
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
    >
      <h1 id="weight-label">Enter Group No</h1>
      <TypeaheadInput css={{ marginBottom: 16 }} items={GROUPS} />
      <ButtonInput
        disabled={!group}
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

export default GroupScreen;
