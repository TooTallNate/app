/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps } from "react-router";
import { FormState } from "./config";

const SubmitScreen: React.FC<RouteComponentProps> = ({ location, history }) => {
  const { action = "", animal }: FormState = location.state || {};
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
    >
      <h1>Select Animal</h1>
      <p>ACTION: {action}</p>
      <p>ANIMAL: {animal}</p>
      <button onClick={() => history.push("/")}>Submit</button>
    </div>
  );
};

export default SubmitScreen;
