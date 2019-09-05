/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import PigMovementsView from "./views/PigMovementsFlow/PigMovementsView";
import AccountView from "./views/AccountView";
import LoginView from "./views/LoginView";
import MainNav from "./components/MainNav";
import { useAuth } from "./contexts/auth";

const UnauthenticatedApp: React.FC = () => {
  return (
    <Fragment>
      <Switch>
        <Route path="/login" component={LoginView} />
        <Redirect to="/login" />
      </Switch>
    </Fragment>
  );
};

const AuthenticatedApp: React.FC = () => {
  return (
    <Fragment>
      <div
        css={{
          minHeight: 0,
          flexGrow: 1
        }}
      >
        <Switch>
          <Route path="/form" component={PigMovementsView} />
          <Route path="/account" component={AccountView} />
          <Redirect to="/form" />
        </Switch>
      </div>
      <MainNav />
    </Fragment>
  );
};

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div
      css={{
        margin: "auto",
        padding: "0 16px",
        height: "100vh",
        maxWidth: 800,
        display: "flex",
        flexDirection: "column"
      }}
    >
      {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
};

export default App;
