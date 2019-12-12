/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps } from "react-router-dom";
import { View, Button, Title } from "../components/styled";
import ScorecardJobSelector from "../components/ScorecardJobSelector";
import Field from "../components/ui/Field";
import SliderInput from "../components/ui/SliderInput";
import { useState } from "react";

const ScorecardView: React.FC<RouteComponentProps> = ({ history }) => {
  const [state, setState] = useState(9);
  return (
    <View>
      <Title>Farrowing Scorecard</Title>
      <form
        css={{
          overflowX: "auto",
          minHeight: 0,
          flexGrow: 1,
          padding: "0 16px 16px 16px"
        }}
      >
        <Field label="Operator" name="operator">
          <ScorecardJobSelector />
        </Field>
        <Field label="Area" name="area"></Field>
        <Field label="Sow Care" name="sow-care">
          <SliderInput
            min={0}
            max={10}
            step={0.2}
            labelStep={1}
            value={state}
            onChange={value => setState(value)}
          />
        </Field>
        <Field label="Piglet Care" name="piglet-care"></Field>
        <Field label="Feed" name="feed"></Field>
        <Field label="Water" name="water"></Field>
        <Field label="Crate" name="crate"></Field>
        <Field label="General Room" name="gen-room"></Field>
        <Button
          type="submit"
          css={{
            marginTop: 44
          }}
        >
          Submit
        </Button>
      </form>
    </View>
  );
};

export default ScorecardView;
