import React from "react";
import { RouteComponentProps } from "react-router-dom";
import StackedNav from "../../common/components/nav/StackedNav";
import StackedNavLink from "../../common/components/nav/StackedNavLink";
import Title from "../../common/components/view/ViewTitle";
import View from "../../common/components/view/View";
import ViewHeader from "../../common/components/view/ViewHeader";
import { useFarrowingBackendScorecardAreasQuery } from "../graphql";
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
        )}
      </ViewContent>
    </View>
  );
};

export default ScorecardViewArea;
