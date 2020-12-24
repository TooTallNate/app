import React from "react";
import { Route, Redirect, useRouteMatch } from "react-router-dom";
import { Switch } from "react-router-dom";
import { GrowFinishScorecardProvider } from "../../contexts/growFinish";
import ScorecardSubmitView from "./ScorecardSubmitView";
import ScorecardPageView from "./ScorecardPageView";

const ScorecardRouterView: React.FC = () => {
  const match = useRouteMatch<{ job: string }>();
  return (
    <GrowFinishScorecardProvider job={match.params.job}>
      <Switch>
        <Route path={`${match.url}/page/:page`} component={ScorecardPageView} />
        <Route
          exact
          path={`${match.url}/submit`}
          component={ScorecardSubmitView}
        />
        <Redirect to={`${match.url}/page/1`} />
      </Switch>
    </GrowFinishScorecardProvider>
  );
};

export default ScorecardRouterView;
