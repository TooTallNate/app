/** @jsx jsx */
import { jsx } from "@emotion/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PigMovementsView from "./views/PigMovementsView";

const App: React.FC = () => {
  return (
    <Router>
      <div
        css={{
          margin: "0 16px"
        }}
      >
        <Switch>
          <Route path="/form" component={PigMovementsView} />
          <Route path="*" render={() => <p>Not Found</p>} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
