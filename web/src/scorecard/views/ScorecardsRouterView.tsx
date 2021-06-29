import React from "react";
import { Route, Redirect, useRouteMatch } from "react-router-dom";
import { Switch } from "react-router-dom";
import ScorecardJobView from "./ScorecardJobView";
import ScorecardRouterView from "./ScorecardRouterView";
import ScorecardGroupView from "./ScorecardGroupView";

const ScorecardsRouterView: React.FC = () => {
  const match = useRouteMatch();
  console.log(match);
  return (
    <Switch>
      <Route exact path={`${match.url}`} component={ScorecardGroupView} />
      <Route exact path={`${match.url}/:group`} component={ScorecardJobView} />
      <Route
        path={`${match.url}/:group/:job`}
        component={ScorecardRouterView}
      />
      <Redirect to={`${match.url}`} />
    </Switch>
  );
};

export default ScorecardsRouterView;
