/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Route, Switch, Redirect } from "react-router-dom";
import PigMovementsView from "./views/PigMovementsFlow/PigMovementsView";
import LoginView from "./views/LoginView";
import { AuthProvider } from "./contexts/auth";

const App: React.FC = () => {
  return (
    <div
      css={{
        margin: "auto",
        padding: "0 16px",
        height: "100vh",
        maxWidth: 800
      }}
    >
      <AuthProvider>
        <Switch>
          <Route path="/login" component={LoginView} />
          <Route path="/form" component={PigMovementsView} />
          <Redirect to="/login" />
        </Switch>
      </AuthProvider>
    </div>
  );
};

export default App;
