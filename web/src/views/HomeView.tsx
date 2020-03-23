/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps } from "react-router-dom";
import { StackedNav, StackedNavLink } from "../components/styled";
import Title from "../components/ui/ViewTitle";
import View from "../components/ui/View";
import ViewHeader from "../components/ui/ViewHeader";
import FormField from "../components/ui/FormField";
import FormFieldInput from "../components/ui/FormFieldInput";
import FormFieldLabel from "../components/ui/FormFieldLabel";

const HomeView: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <View>
      <ViewHeader>
        <Title>Home</Title>
      </ViewHeader>
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
