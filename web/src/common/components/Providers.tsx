import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../user/contexts/auth";
import { GraphqlProvider } from "../contexts/graphql";
import { FlashProvider } from "../contexts/flash";

const Providers: React.FC = ({ children }) => (
  <Router>
    <FlashProvider>
      <GraphqlProvider>
        <AuthProvider>{children}</AuthProvider>
      </GraphqlProvider>
    </FlashProvider>
  </Router>
);

export default Providers;
