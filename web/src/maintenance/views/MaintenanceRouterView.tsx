import React from "react";
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";
import MaintenanceEventSelectionView from "./MaintenanceEventSelectionView";
import MaintenanceView from "./MaintenanceView";

const MaintenanceRouterView: React.FC = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route
        exact
        path={`${match.url}`}
        component={MaintenanceEventSelectionView}
      />
      <Route
        exact
        path={`${match.url}/asset/:asset`}
        component={MaintenanceView}
      />
      <Redirect to={`${match.url}`} />
    </Switch>
  );
};

export default MaintenanceRouterView;
