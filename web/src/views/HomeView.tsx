/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps } from "react-router-dom";
import { Title, StackedNav, StackedNavLink, View } from "../components/styled";
import Field from "../components/ui/Field";

const HomeView: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <View>
      <Title>Home</Title>
      <div
        css={{
          padding: "0 16px"
        }}
      >
        <Field label="Select Form" name="action">
          <StackedNav>
            <StackedNavLink to={`/pigs`}>Pig Activity</StackedNavLink>
            <StackedNavLink to={`/scorecard`}>Scorecard</StackedNavLink>
          </StackedNav>
        </Field>
      </div>
    </View>
  );
};

export default HomeView;
