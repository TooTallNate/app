import React from "react";
import View from "../../common/components/view/View";
import ViewHeader from "../../common/components/view/ViewHeader";
import { useAuth } from "../contexts/auth";
import Title from "../../common/components/view/ViewTitle";
import ViewContent from "../../common/components/view/ViewContent";
import StackedNav from "../../common/components/nav/StackedNav";
import StackedNavLink from "../../common/components/nav/StackedNavLink";
import StackedNavButton from "../../common/components/nav/StackedNavButton";
import { useRouteMatch } from "react-router-dom";

const AccountView: React.FC = () => {
  const match = useRouteMatch();
  const { logout } = useAuth();

  return (
    <View>
      <ViewHeader>
        <Title>Account</Title>
      </ViewHeader>
      <ViewContent>
        <StackedNav>
          <StackedNavLink to={`${match.path}/locations`}>
            Locations
          </StackedNavLink>
          <StackedNavLink to={`${match.path}/menu-selection`}>
            Menu Selection
          </StackedNavLink>
          <StackedNavLink to={`${match.path}/posting-groups`}>
            Job Posting Groups
          </StackedNavLink>
          <StackedNavButton onClick={() => logout()}>Log Out</StackedNavButton>
        </StackedNav>
      </ViewContent>
    </View>
  );
};

export default AccountView;
