/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Route, Switch, RouteComponentProps, Redirect } from "react-router-dom";
import SelectActionScreen from "./SelectActionScreen";
import SelectAnimalScreen from "./SelectAnimalScreen";
import SelectFromAnimalScreen from "./SelectFromAnimalScreen";
import SelectToAnimalScreen from "./SelectToAnimalScreen";
import QuantityScreen from "./QuantityScreen";
import WeightScreen from "./WeightScreen";
import SubmitScreen from "./SubmitScreen";
import { FormState } from "./config";
import PriceScreen from "./PriceScreen";
import GroupScreen from "./GroupScreen";

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
        <Route
          path={`${match.url}/from-animal`}
          component={SelectFromAnimalScreen}
        />
        <Route
          path={`${match.url}/to-animal`}
          component={SelectToAnimalScreen}
        />
        <Route path={`${match.url}/group`} component={GroupScreen} />
        <Route path={`${match.url}/quantity`} component={QuantityScreen} />
        <Route path={`${match.url}/weight`} component={WeightScreen} />
        <Route path={`${match.url}/price`} component={PriceScreen} />
        <Route path={`${match.url}/submit`} component={SubmitScreen} />
        <Redirect to={`${match.url}/action`} />
      </Switch>
    </div>
  );
};

export default PigMovementsView;
