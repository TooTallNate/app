import React from "react";
import { RouteComponentProps, Route, Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";
// import ScorecardViewArea from "../ScorecardViewArea";
// import ScorecardViewScores from "../ScorecardViewScores";
// import ScorecardViewAreaOperator from "../ScorecardViewAreaOperator";
import ScorecardJobView from "./ScorecardJobView";

const GrowFinishScorecardView: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.url}`} component={ScorecardJobView} />
    </Switch>
  );
};

export default GrowFinishScorecardView;
