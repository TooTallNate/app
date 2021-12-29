import React from "react";
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";
import InventorySelectionView from "./InventorySelectionView";
import InventoryView from "./InventoryView";

const InventoryRouterView: React.FC = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}`} component={InventorySelectionView} />
      <Route
        exact
        path={`${match.url}/inventory/:item`}
        component={InventoryView}
      />
      <Redirect to={`${match.url}`} />
    </Switch>
  );
};

export default InventoryRouterView;
