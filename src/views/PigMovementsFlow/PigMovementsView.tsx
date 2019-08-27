/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Route, Switch, RouteComponentProps, Redirect } from "react-router-dom";
import SelectActionScreen from "./SelectActionScreen";
import SelectAnimalScreen from "./SelectAnimalScreen";
import SubmitScreen from "./SubmitScreen";
import { FormState } from "./config";

const PigMovementsView: React.FC<RouteComponentProps> = ({
  match,
  location
}) => {
  // Initialize route state.
  if (!location.state || !location.state.formPath) {
    const state: FormState = {
      ...(location.state || {}),
      formPath: match.url
    };
    return (
      <Redirect
        to={{
          state,
          pathname: location.pathname
        }}
      />
    );
  }

  return (
    <div css={{ height: "100%" }}>
      <Switch>
        <Route path={`${match.url}/action`} component={SelectActionScreen} />
        <Route path={`${match.url}/animal`} component={SelectAnimalScreen} />
        <Route path={`${match.url}/submit`} component={SubmitScreen} />
        <Redirect to={`${match.url}/action`} />
      </Switch>
    </div>
  );
};

export default PigMovementsView;
