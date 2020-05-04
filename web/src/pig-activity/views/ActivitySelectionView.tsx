import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { StackedNav, StackedNavLink } from "../../common/components/styled";
import Title from "../../common/components/view/ViewTitle";
import View from "../../common/components/view/View";
import ViewHeader from "../../common/components/view/ViewHeader";
import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import BackButton from "../../common/components/view/BackButton";
import ViewContent from "../../common/components/view/ViewContent";
import Form from "../../common/components/form/Form";

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
