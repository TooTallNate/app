import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { StackedNav, StackedNavLink } from "../components/styled";
import Title from "../components/view/ViewTitle";
import View from "../components/view/View";
import ViewHeader from "../components/view/ViewHeader";
import FormField from "../components/form/FormField";
import FormFieldInput from "../components/form/FormFieldInput";
import FormFieldLabel from "../components/form/FormFieldLabel";
import BackButton from "../components/view/BackButton";
import ViewContent from "../components/view/ViewContent";
import Form from "../components/form/Form";

const ActivitySelectionView: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <View>
      <ViewHeader>
        <BackButton />
        <Title>Activity</Title>
      </ViewHeader>
      <ViewContent>
        <Form>
          <FormField name="action">
            <FormFieldLabel>Select Activity</FormFieldLabel>
            <FormFieldInput>
              <StackedNav>
                <StackedNavLink to={`${match.url}/wean`}>Wean</StackedNavLink>
                <StackedNavLink to={`${match.url}/mortality`}>
                  Mortality
                </StackedNavLink>
                <StackedNavLink to={`${match.url}/move`}>Move</StackedNavLink>
                <StackedNavLink to={`${match.url}/grade-off`}>
                  Grade Off
                </StackedNavLink>
                <StackedNavLink to={`${match.url}/adjustment`}>
                  Adjustment
                </StackedNavLink>
                <StackedNavLink to={`${match.url}/purchase`}>
                  Purchase
                </StackedNavLink>
              </StackedNav>
            </FormFieldInput>
          </FormField>
        </Form>
      </ViewContent>
    </View>
  );
};

export default ActivitySelectionView;
