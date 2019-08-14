/** @jsx jsx */
import { jsx } from "@emotion/core";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <Route exact path="/" component={() => <h1>Farm Activity Entry</h1>} />
    </Router>
  );
};

export default App;
