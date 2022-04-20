import React from "react";
import { Switch, useRouteMatch, Route, Redirect } from "react-router-dom";
import AccountView from "./AccountView";
import LocationsView from "./LocationsView";
import MenuView from "./MenuView";
import PostingGroupsView from "./PostingGroupsView";

const AccountRouterView: React.FC = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.url}`} component={AccountView} />
      <Route path={`${match.url}/locations`} component={LocationsView} />
      <Route path={`${match.url}/menu-selection`} component={MenuView} />
      <Route
        path={`${match.url}/posting-groups`}
        component={PostingGroupsView}
      />
      <Redirect to={`${match.path}`} />
    </Switch>
  );
};

export default AccountRouterView;
