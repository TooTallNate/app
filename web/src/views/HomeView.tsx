/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps } from "react-router-dom";
import { Title, StackedNav, StackedNavLink, View } from "../components/styled";
import FormField from "../components/ui/FormField";
import FormFieldInput from "../components/ui/FormFieldInput";
import FormFieldLabel from "../components/ui/FormFieldLabel";

const HomeView: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <View>
      <Title>Home</Title>
      <div
        css={{
          padding: "0 16px"
        }}
      >
        <FormField name="action">
          <FormFieldLabel>Select Form</FormFieldLabel>
          <FormFieldInput>
            <StackedNav>
              <StackedNavLink to={`/pigs`}>Pig Activity</StackedNavLink>
              <StackedNavLink to={`/scorecard`}>Scorecard</StackedNavLink>
            </StackedNav>
          </FormFieldInput>
        </FormField>
      </div>
    </View>
  );
};

export default HomeView;
