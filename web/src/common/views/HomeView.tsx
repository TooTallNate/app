import React from "react";
import { StackedNav, StackedNavLink } from "../components/styled";
import Title from "../components/view/ViewTitle";
import View from "../components/view/View";
import ViewHeader from "../components/view/ViewHeader";
import FormField from "../components/form/FormField";
import FormFieldInput from "../components/form/FormFieldInput";
import FormFieldLabel from "../components/form/FormFieldLabel";
import ViewContent from "../components/view/ViewContent";
import Form from "../components/form/Form";

const HomeView: React.FC = () => {
  return (
    <View>
      <ViewHeader>
        <Title>Home</Title>
      </ViewHeader>
      <ViewContent>
        <Form>
          <FormField name="action">
            <FormFieldLabel>Select Form</FormFieldLabel>
            <FormFieldInput>
              <StackedNav>
                <StackedNavLink to="/pigs/sow-farm">
                  Sow Farm Pig Activity
                </StackedNavLink>
                <StackedNavLink to="/pigs/nursery-finisher">
                  Nursery/Finisher Pig Activity
                </StackedNavLink>
                <StackedNavLink to="/scorecard">Scorecard</StackedNavLink>
              </StackedNav>
            </FormFieldInput>
          </FormField>
        </Form>
      </ViewContent>
    </View>
  );
};

export default HomeView;
