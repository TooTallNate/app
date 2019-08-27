/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps } from "react-router";
import { FormState } from "./config";

const SubmitScreen: React.FC<RouteComponentProps> = ({ location, history }) => {
  const { action = "", animal, fromAnimal, toAnimal }: FormState =
    location.state || {};
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
    >
      <h1>Submit</h1>
      <p>ACTION: {action}</p>
      <p>ANIMAL: {animal}</p>
      <p>FROM ANIMAL: {fromAnimal}</p>
      <p>TO ANIMAL: {toAnimal}</p>
      <button onClick={() => history.push("/")}>Submit</button>
    </div>
  );
};

export default SubmitScreen;
