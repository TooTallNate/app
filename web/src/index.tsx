import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "normalize.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";
import { GraphqlProvider } from "./contexts/graphql";

ReactDOM.render(
  <Router>
    <GraphqlProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GraphqlProvider>
  </Router>,
  document.getElementById("root")
);
