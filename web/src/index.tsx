import React from "react";
import ReactDOM from "react-dom";
import "./index.pcss";
import "./common/icons";
import App from "./App";
import Providers from "./common/components/Providers";
import * as Sentry from "@sentry/browser";

if (process.env.SENTRY_DSN_WEB) {
  Sentry.init({ dsn: process.env.SENTRY_DSN_WEB });
}

ReactDOM.render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById("root")
);
