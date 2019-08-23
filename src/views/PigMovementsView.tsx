/** @jsx jsx */
import { jsx } from "@emotion/core";
import SelectActionScreen from "./PigMovementsView/SelectActionScreen";
import SelectAnimalScreen from "./PigMovementsView/SelectAnimalScreen";
import { Route, Switch, RouteComponentProps, Redirect } from "react-router-dom";

const PigMovementsView: React.FC<RouteComponentProps> = ({
  match,
  location,
  history
}) => {
  // Initialize route state.
  if (!location.state || !location.state.formPath) {
    return (
      <Redirect
        to={{
          pathname: location.pathname,
          state: {
            formPath: match.url
          }
        }}
      />
    );
  }

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
    >
      <Switch>
        <Route path={`${match.url}/action`} component={SelectActionScreen} />
        <Route path={`${match.url}/animal`} component={SelectAnimalScreen} />
        <Redirect to={`${match.url}/action`} />
      </Switch>
      <div css={{ flexGrow: 1 }} />
      <div
        css={{
          borderTop: "1px solid #9ca1b1",
          display: "flex"
        }}
      >
        <button onClick={() => history.goBack()}>Back</button>
        <span
          css={{
            flexGrow: 1
          }}
        />
        <button onClick={() => history.goForward()}>Next</button>
      </div>
    </div>
  );
};

export default PigMovementsView;
