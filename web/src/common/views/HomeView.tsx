import React from "react";
import StackedNav from "../../common/components/nav/StackedNav";
import StackedNavLink from "../../common/components/nav/StackedNavLink";
import Title from "../components/view/ViewTitle";
import View from "../components/view/View";
import ViewHeader from "../components/view/ViewHeader";
import ViewContent from "../components/view/ViewContent";

const HomeView: React.FC = () => {
  return (
    <View>
      <ViewHeader>
        <Title>Home</Title>
      </ViewHeader>
      <ViewContent>
        <StackedNav>
          <StackedNavLink to="/pig-activity">Pig Activity</StackedNavLink>
          <StackedNavLink to="/scorecard">Scorecards</StackedNavLink>
        </StackedNav>
      </ViewContent>
    </View>
  );
};

export default HomeView;
