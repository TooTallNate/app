import React from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import StackedNav from "../../common/components/nav/StackedNav";
import StackedNavLink from "../../common/components/nav/StackedNavLink";
import Title from "../../common/components/view/ViewTitle";
import View from "../../common/components/view/View";
import ViewHeader from "../../common/components/view/ViewHeader";
import BackButton from "../../common/components/view/BackButton";
import ViewContent from "../../common/components/view/ViewContent";

interface ViewParams {
  barnType: string;
}

const ActivitySelectionView: React.FC = () => {
  const match = useRouteMatch();
  const params = useParams<ViewParams>();

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <Title>
          {params.barnType === "sow-farm" ? "Sow Farm " : "Nursery/Finisher "}
          Activity
        </Title>
      </ViewHeader>
      <ViewContent>
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
          <StackedNavLink to={`${match.url}/purchase`}>Purchase</StackedNavLink>
        </StackedNav>
      </ViewContent>
    </View>
  );
};

export default ActivitySelectionView;
