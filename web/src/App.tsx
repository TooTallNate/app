import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ActivityView from "./pig-activity/views/ActivityView";
import OldScorecardView from "./scorecard/views/ScorecardView";
import HomeView from "./common/views/HomeView";
import LoginView from "./user/views/LoginView";
import MainNav from "./common/components/view/MainNav";
import { useAuth } from "./user/contexts/auth";
import AccountRouterView from "./user/views/AccountRouterView";
import ScorecardsRouterView from "./scorecard/views/nursery-finisher/ScorecardsRouterView";

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
        <Route path="/scorecard" component={ScorecardsRouterView} />
        <Route path="/old-scorecard" component={OldScorecardView} />
        <Route path="/account" component={AccountRouterView} />
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
