/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { RouteComponentProps } from "react-router";
import { FormState } from "./config";
import ButtonInput from "../../components/ButtonInput";

const labelCss = css`
  font-weight: bold;
  font-size: 0.9rem;
  display: inline-block;
  width: 108px;
  text-align: right;
  margin-right: 8px;
`;

const SubmitScreen: React.FC<RouteComponentProps> = ({ location, history }) => {
  const {
    action = "",
    animal,
    fromAnimal,
    toAnimal,
    quantity,
    weight,
    price
  }: FormState = location.state || {};
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
    >
      <h1>Submit</h1>
      <p>
        <span css={labelCss}>ACTION</span> {action}
      </p>
      <p>
        <span css={labelCss}>ANIMAL</span> {animal}
      </p>
      <p>
        <span css={labelCss}>FROM ANIMAL</span> {fromAnimal}
      </p>
      <p>
        <span css={labelCss}>TO ANIMAL</span> {toAnimal}
      </p>
      <p>
        <span css={labelCss}>QUANTITY</span> {quantity}
      </p>
      <p>
        <span css={labelCss}>WEIGHT</span> {weight}
      </p>
      <p>
        <span css={labelCss}>PRICE</span> {price}
      </p>
      <ButtonInput onClick={() => history.push("/")}>Submit</ButtonInput>
    </div>
  );
};

export default SubmitScreen;
