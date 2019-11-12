/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps, Route, Switch } from "react-router-dom";
import ActionsView from "./ActionsView";
import PurchaseFormView from "./PurchaseFormView";
import WeanFormView from "./WeanFormView";
import MortalityFormView from "./MortalityFormView";
import MoveFormView from "./MoveFormView";
import GradeOffFormView from "./GradeOffFormView";
import AdjustmentFormView from "./AdjustmentFormView";

const PigActivityView: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.url}/purchase`} component={PurchaseFormView} />
      <Route path={`${match.url}/wean`} component={WeanFormView} />
      <Route path={`${match.url}/mortality`} component={MortalityFormView} />
      <Route path={`${match.url}/move`} component={MoveFormView} />
      <Route path={`${match.url}/grade-off`} component={GradeOffFormView} />
      <Route path={`${match.url}/adjustment`} component={AdjustmentFormView} />
      <Route path={match.url} component={ActionsView} />
    </Switch>
  );
};

export default PigActivityView;
