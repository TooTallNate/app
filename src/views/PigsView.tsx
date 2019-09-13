/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps, Route } from "react-router-dom";
import ActionsView from "./PigsView/ActionsView";
import PurchaseFormView from "./PigsView/PurchaseFormView";
import WeanFormView from "./PigsView/WeanFormView";
import MortalityFormView from "./PigsView/MortalityFormView";
import MoveFormView from "./PigsView/MoveFormView";
import GradeOffFormView from "./PigsView/GradeOffFormView";
import AdjustmentFormView from "./PigsView/AdjustmentFormView";

const PigView: React.FC<RouteComponentProps> = ({ match, location }) => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
    >
      <Route exact path={match.url} component={ActionsView} />
      <Route path={`${match.url}/purchase`} component={PurchaseFormView} />
      <Route path={`${match.url}/wean`} component={WeanFormView} />
      <Route path={`${match.url}/mortality`} component={MortalityFormView} />
      <Route path={`${match.url}/move`} component={MoveFormView} />
      <Route path={`${match.url}/grade-off`} component={GradeOffFormView} />
      <Route path={`${match.url}/adjustment`} component={AdjustmentFormView} />
    </div>
  );
};

export default PigView;
