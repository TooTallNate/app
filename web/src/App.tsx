/** @jsx jsx */
import { jsx } from "@emotion/core";
import tw from "tailwind.macro";
import { Route, Redirect, Switch } from "react-router-dom";
import PigActivityView from "./views/PigActivityView";
import AccountView from "./views/AccountView";
import LoginView from "./views/LoginView";
import MainNav from "./components/MainNav";
import { useAuth } from "./contexts/auth";
import useDefaults from "./contexts/defaults";
import FullPageSpinner from "./components/FullPageSpinner";

const UnauthenticatedApp: React.FC = () => {
  return (
    <div className="max-w-3xl h-full mx-auto flex flex-col">
      <LoginView />
    </div>
  );
};

const AuthenticatedApp: React.FC = () => {
  const [{ loading }] = useDefaults();
  return loading ? (
    <FullPageSpinner>Loading Settings...</FullPageSpinner>
  ) : (
    <div css={tw`max-w-3xl h-full mx-auto flex flex-col`}>
      <div className="min-h-0 flex-grow">
        <Switch>
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
