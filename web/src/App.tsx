/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import PigActivityView from "./views/PigActivityView";
import AccountView from "./views/AccountView";
import LoginView from "./views/LoginView";
import MainNav from "./components/MainNav";
import { useAuth } from "./contexts/auth";
import SelectLocationView from "./views/SelectLocationView";
import useDefaults from "./contexts/defaults";
import FullPageSpinner from "./components/FullPageSpinner";

const UnauthenticatedApp: React.FC = () => {
  return (
    <div
      css={{
        margin: "auto",
        height: "100%",
        maxWidth: 800,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <LoginView />
    </div>
  );
};

const AuthenticatedApp: React.FC = () => {
  const [{ loading }] = useDefaults();
  return loading ? (
    <FullPageSpinner>Loading Settings...</FullPageSpinner>
  ) : (
    <div
      css={{
        margin: "auto",
        height: "100%",
        maxWidth: 800,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div
        css={{
          minHeight: 0,
          flexGrow: 1
        }}
      >
        <Switch>
          <Route path="/location" component={SelectLocationView} />
          <Route path="/pigs" component={PigActivityView} />
          <Route path="/account" component={AccountView} />
          <Redirect to="/pigs" />
        </Switch>
      </div>
      <MainNav />
    </div>
  );
};

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

export default App;
