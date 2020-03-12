import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { View, Title, StackedNavLink, StackedNav } from "../components/styled";
import { useFarrowingBackendScorecardAreasQuery } from "../graphql";
import FullPageSpinner from "../components/FullPageSpinner";
import FormField from "../components/ui/FormField";
import FormFieldLabel from "../components/ui/FormFieldLabel";
import FormFieldInput from "../components/ui/FormFieldInput";

const ScorecardViewArea: React.FC<RouteComponentProps> = ({
  history,
  match
}) => {
  const { data, loading } = useFarrowingBackendScorecardAreasQuery();

  return loading || !data ? (
    <FullPageSpinner>Loading...</FullPageSpinner>
  ) : (
    <View>
      <Title>Farrowing Scorecard</Title>
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
    </View>
  );
};

export default ScorecardViewArea;
