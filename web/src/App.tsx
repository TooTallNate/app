/** @jsx jsx */
import { jsx } from "@emotion/core";
import tw from "tailwind.macro";
import { Route, Switch, Redirect } from "react-router-dom";
import ActivityView from "./views/ActivityView";
import AccountView from "./views/AccountView";
import ScorecardView from "./views/ScorecardView";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import MainNav from "./components/MainNav";
import { useAuth } from "./contexts/auth";
import ScorecardAreaOperatorView from "./views/ScorecardAreaOperatorView";

const UnauthenticatedApp: React.FC = () => {
  return (
    <div className="max-w-3xl h-full mx-auto flex flex-col">
      <LoginView />
    </div>
  );
};

const AuthenticatedApp: React.FC = () => {
  return (
    <div css={tw`max-w-3xl h-full mx-auto flex flex-col`}>
      <div className="min-h-0 flex-1">
        <Switch>
          <Route exact path="/" component={HomeView} />
          <Route path="/pigs" component={ActivityView} />
          <Route exact path="/scorecard" component={ScorecardView} />
          <Route
            path="/scorecard/area/:id/operator"
            component={ScorecardAreaOperatorView}
          />
          <Route path="/account" component={AccountView} />
          <Redirect to="/" />
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
