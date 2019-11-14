/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps, Route, Switch } from "react-router-dom";
import ActivitySelectionView from "./ActivitySelectionView";
import ActivityPurchaseView from "./ActivityPurchaseView";
import ActivityWeanView from "./ActivityWeanView";
import ActivityMortalityView from "./ActivityMortalityView";
import ActivityMoveView from "./ActivityMoveView";
import ActivityGradeOffView from "./ActivityGradeOffView";
import ActivityAdjustmentView from "./ActivityAdjustmentView";

const ActivityView: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.url}/purchase`} component={ActivityPurchaseView} />
      <Route path={`${match.url}/wean`} component={ActivityWeanView} />
      <Route
        path={`${match.url}/mortality`}
        component={ActivityMortalityView}
      />
      <Route path={`${match.url}/move`} component={ActivityMoveView} />
      <Route path={`${match.url}/grade-off`} component={ActivityGradeOffView} />
      <Route
        path={`${match.url}/adjustment`}
        component={ActivityAdjustmentView}
      />
      <Route path={match.url} component={ActivitySelectionView} />
    </Switch>
  );
};

export default ActivityView;
