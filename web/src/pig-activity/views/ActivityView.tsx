import React from "react";
import { RouteComponentProps, Route, Switch, Redirect } from "react-router-dom";
import ActivitySelectionView from "./ActivitySelectionView";
import ActivityPurchaseView from "./ActivityPurchaseView";
import ActivityWeanView from "./ActivityWeanView";
import ActivityMortalityView from "./ActivityMortalityView";
import ActivityMoveView from "./ActivityMoveView";
import ActivityGradeOffView from "./ActivityGradeOffView";
import ActivityAdjustmentView from "./ActivityAdjustmentView";
import ActivityJobView from "./ActivityJobView";

const ActivityView: React.FC<RouteComponentProps<{ barnType: string }>> = ({
  match
}) => {
  return (
    <Switch>
      <Route
        exact
        path={`${match.url}/:barnType`}
        component={ActivitySelectionView}
      />
      <Route
        exact
        path={`${match.url}/:barnType/:activity(purchase|wean|mortality|move|grade-off|adjustment)`}
        component={ActivityJobView}
      />
      <Route
        path={`${match.url}/:barnType/purchase/:job`}
        component={ActivityPurchaseView}
      />
      <Route
        path={`${match.url}/:barnType/wean/:job`}
        component={ActivityWeanView}
      />
      <Route
        path={`${match.url}/:barnType/mortality/:job`}
        component={ActivityMortalityView}
      />
      <Route
        path={`${match.url}/:barnType/move/:job`}
        component={ActivityMoveView}
      />
      <Route
        path={`${match.url}/:barnType/grade-off/:job`}
        component={ActivityGradeOffView}
      />
      <Route
        path={`${match.url}/:barnType/adjustment/:job`}
        component={ActivityAdjustmentView}
      />
      <Redirect to={match.url} />
    </Switch>
  );
};

export default ActivityView;
