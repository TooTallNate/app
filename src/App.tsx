/** @jsx jsx */
import { jsx } from "@emotion/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PigMovementsView from "./views/PigMovementsView";

const App: React.FC = () => {
  return (
    <Router>
      <Route exact path="/" component={PigMovementsView} />
    </Router>
  );
};

export default App;
