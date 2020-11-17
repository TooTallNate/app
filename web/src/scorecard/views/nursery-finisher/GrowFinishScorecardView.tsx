import React from "react";
import { RouteComponentProps, Route, Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";
import ScorecardJobView from "./ScorecardJobView";
import { GrowFinishScorecardProvider } from "../../contexts/growFinish";
import ScorecardSubmitView from "./ScorecardSubmitView";

const GrowFinishScorecardView: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <GrowFinishScorecardProvider>
      <Switch>
        <Route exact path={`${match.url}/job`} component={ScorecardJobView} />
        <Route
          exact
          path={`${match.url}/job/submit`}
          component={ScorecardSubmitView}
        />
        <Redirect to={`${match.url}/job`} />
      </Switch>
    </GrowFinishScorecardProvider>
  );
};

export default GrowFinishScorecardView;
