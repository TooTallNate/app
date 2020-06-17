import React from "react";
import ReactDOM from "react-dom";
import "./index.pcss";
import "./common/icons";
import App from "./App";
import Providers from "./common/components/Providers";
import * as Sentry from "@sentry/browser";
import pkg from "../../package.json";

if (process.env.SENTRY_DSN_WEB) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN_WEB,
    environment: process.env.NODE_ENV,
    release: `farm-entry@${pkg.version}`
  });
}

ReactDOM.render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById("root")
);
