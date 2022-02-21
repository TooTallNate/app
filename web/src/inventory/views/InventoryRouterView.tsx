import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import InventoryView from "./InventoryView";

const InventoryRouterView: React.FC = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route
        path={`${match.url}/:location?/:group?`}
        component={InventoryView}
      />
      <Redirect to={`${match.url}`} />
    </Switch>
  );
};

export default InventoryRouterView;
