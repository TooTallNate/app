import React from "react";
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";
import EventSelectionView from "./EventSelectionView";
import FuelView from "./FuelView";

const FuelMaintenanceView: React.FC = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}`} component={EventSelectionView} />
      <Route exact path={`${match.url}/fuel`} component={FuelView} />
      <Redirect to={`${match.url}`} />
    </Switch>
  );
};

export default FuelMaintenanceView;
