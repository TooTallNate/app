import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { StackedNavLink, StackedNav } from "../components/styled";
import Title from "../components/ui/ViewTitle";
import View from "../components/ui/View";
import ViewHeader from "../components/ui/ViewHeader";
import { useFarrowingBackendScorecardAreasQuery } from "../graphql";
import FullPageSpinner from "../components/FullPageSpinner";
import FormField from "../components/ui/FormField";
import FormFieldLabel from "../components/ui/FormFieldLabel";
import FormFieldInput from "../components/ui/FormFieldInput";
import BackButton from "../components/ui/BackButton";

const ScorecardViewArea: React.FC<RouteComponentProps> = ({
  history,
  match
}) => {
  const { data, loading } = useFarrowingBackendScorecardAreasQuery();

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <Title>Farrowing Scorecard</Title>
      </ViewHeader>
      {loading || !data ? (
        <FullPageSpinner />
      ) : (
        <div className="overflow-x-auto min-h-0 flex-grow p-4 pt-0">
          <FormField name="area">
            <FormFieldLabel>Area</FormFieldLabel>
            <FormFieldInput>
              <StackedNav>
                {data.areas.map(area => (
                  <StackedNavLink
                    to={`${match.url}/${area.number}`}
                    key={area.number}
                  >
                    {area.description}
                  </StackedNavLink>
                ))}
              </StackedNav>
            </FormFieldInput>
          </FormField>
        </div>
      )}
    </View>
  );
};

export default ScorecardViewArea;
