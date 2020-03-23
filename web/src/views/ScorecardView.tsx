import React from "react";
import { RouteComponentProps, Route, Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";
import ScorecardViewArea from "./ScorecardViewArea";
import ScorecardViewScores from "./ScorecardViewScores";
import ScorecardViewAreaOperator from "./ScorecardViewAreaOperator";

const ScorecardView: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.url}/areas`} component={ScorecardViewArea} />
      <Route
        exact
        path={`${match.url}/areas/:area`}
        component={ScorecardViewScores}
      />
      <Route
        exact
        path={`${match.url}/areas/:area/operator`}
        component={ScorecardViewAreaOperator}
      />
      <Redirect exact path={`${match.url}`} to={`${match.url}/areas`} />
    </Switch>
  );
};

export default ScorecardView;
