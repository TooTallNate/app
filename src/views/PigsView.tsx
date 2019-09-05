/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps, Route } from "react-router-dom";
import ActionsView from "./PigsView/ActionsView";
import PurchaseFormView from "./PigsView/PurchaseFormView";

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
    </div>
  );
};

export default PigView;
