/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Route, Switch, Redirect } from "react-router-dom";
import PigMovementsView from "./views/PigMovementsFlow/PigMovementsView";
import LoginView from "./views/LoginView";

const App: React.FC = () => {
  return (
    <div
      css={{
        margin: "0 16px",
        height: "100vh"
      }}
    >
      <Switch>
        <Route path="/login" component={LoginView} />
        <Route path="/form" component={PigMovementsView} />
        <Redirect to="/login" />
      </Switch>
    </div>
  );
};

export default App;
