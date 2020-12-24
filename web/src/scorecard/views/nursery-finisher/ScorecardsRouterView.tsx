import React from "react";
import { Route, Redirect, useRouteMatch } from "react-router-dom";
import { Switch } from "react-router-dom";
import ScorecardJobView from "./ScorecardJobView";
import ScorecardRouterView from "./ScorecardRouterView";

const ScorecardsRouterView: React.FC = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}`} component={ScorecardJobView} />
      <Route path={`${match.url}/:job`} component={ScorecardRouterView} />
      <Redirect to={`${match.url}`} />
    </Switch>
  );
};

export default ScorecardsRouterView;
