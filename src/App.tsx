/** @jsx jsx */
import { jsx } from "@emotion/core";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import PigMovementsView from "./views/PigMovementsView";

const App: React.FC = () => {
  return (
    <Router>
      <div
        css={{
          margin: "0 16px",
          height: "100vh"
        }}
      >
        <Switch>
          <Route path="/form" component={PigMovementsView} />
          <Redirect to="/form" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
