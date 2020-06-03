import React from "react";
import { Switch, useRouteMatch, Route, Redirect } from "react-router-dom";
import AccountView from "./AccountView";
import LocationsView from "./LocationsView";

const AccountRouterView: React.FC = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.url}`} component={AccountView} />
      <Route path={`${match.url}/locations`} component={LocationsView} />
      <Redirect to={`${match.path}`} />
    </Switch>
  );
};

export default AccountRouterView;
