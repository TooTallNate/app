import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ActivityView from "./pig-activity/views/ActivityView";
import AccountView from "./views/AccountView";
import ScorecardView from "./views/ScorecardView";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import MainNav from "./components/view/MainNav";
import { useAuth } from "./contexts/auth";

const UnauthenticatedApp: React.FC = () => {
  return (
    <div className="max-w-3xl h-full mx-auto flex flex-col">
      <Switch>
        <Route exact path="/login" component={LoginView} />
        <Redirect to="/login" />
      </Switch>
    </div>
  );
};

const AuthenticatedApp: React.FC = () => {
  return (
    <div className="max-w-3xl h-full mx-auto flex flex-col">
      <Switch>
        <Route exact path="/" component={HomeView} />
        <Route path="/pigs" component={ActivityView} />
        <Route path="/scorecard" component={ScorecardView} />
        <Route path="/account" component={AccountView} />
        <Redirect to="/" />
      </Switch>
      <MainNav />
    </div>
  );
};

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

export default App;
