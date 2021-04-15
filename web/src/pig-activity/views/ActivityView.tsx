import React from "react";
import { RouteComponentProps, Route, Switch, Redirect } from "react-router-dom";
import ActivityPurchaseView from "./ActivityPurchaseView";
import ActivityWeanView from "./ActivityWeanView";
import ActivityMortalityView from "./ActivityMortalityView";
import ActivityMoveView from "./ActivityMoveView";
import ActivityGradeOffView from "./ActivityGradeOffView";
import ActivityAdjustmentView from "./ActivityAdjustmentView";
import ActivityJobView from "./ActivityJobView";
import ActivitySelectionView from "./ActivitySelectionView";
import ActivityMoveJobView from "./ActivityMoveJobView";

const ActivityView: React.FC<RouteComponentProps<{ barnType: string }>> = ({
  match
}) => {
  console.log(match);
  return (
    <Switch>
      <Route exact path={`${match.url}`} component={ActivitySelectionView} />
      <Route
        exact
        path={`${match.url}/:activity(purchase|wean|mortality|grade-off|adjustment)`}
        component={ActivityJobView}
      />
      <Route
        exact
        path={`${match.url}/:activity(move)`}
        component={ActivityMoveJobView}
      />
      <Route
        path={`${match.url}/purchase/:job`}
        component={ActivityPurchaseView}
      />
      <Route path={`${match.url}/wean/:job`} component={ActivityWeanView} />
      <Route
        path={`${match.url}/mortality/:job`}
        component={ActivityMortalityView}
      />
      <Route path={`${match.url}/move/:job`} component={ActivityMoveView} />
      <Route
        path={`${match.url}/grade-off/:job`}
        component={ActivityGradeOffView}
      />
      <Route
        path={`${match.url}/adjustment/:job`}
        component={ActivityAdjustmentView}
      />
      <Redirect to={match.url} />
    </Switch>
  );
};

export default ActivityView;
