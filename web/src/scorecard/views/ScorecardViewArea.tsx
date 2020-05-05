import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { StackedNavLink, StackedNav } from "../../common/components/styled";
import Title from "../../common/components/view/ViewTitle";
import View from "../../common/components/view/View";
import ViewHeader from "../../common/components/view/ViewHeader";
import { useFarrowingBackendScorecardAreasQuery } from "../graphql";
import FormField from "../../common/components/form/FormField";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import BackButton from "../../common/components/view/BackButton";
import ViewContent from "../../common/components/view/ViewContent";

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
      <ViewContent loading={loading}>
        {data && (
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
      </ViewContent>
    </View>
  );
};

export default ScorecardViewArea;
