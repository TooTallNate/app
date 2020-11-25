import React from "react";
import { Route, Redirect, useRouteMatch } from "react-router-dom";
import { Switch } from "react-router-dom";
import ScorecardJobView from "./ScorecardJobView";
import { GrowFinishScorecardProvider } from "../../contexts/growFinish";
import ScorecardSubmitView from "./ScorecardSubmitView";
import ScorecardPageView from "./ScorecardPageView";

const ScorecardView: React.FC = () => {
  const match = useRouteMatch();
  return (
    <GrowFinishScorecardProvider>
      <Switch>
        <Route exact path={`${match.url}`} component={ScorecardJobView} />
        <Route
          path={`${match.url}/:job/page/:page`}
          component={ScorecardPageView}
        />
        <Route
          exact
          path={`${match.url}/:job/submit`}
          component={ScorecardSubmitView}
        />
        <Redirect to={`${match.url}/job`} />
      </Switch>
    </GrowFinishScorecardProvider>
  );
};

export default ScorecardView;
