import React from "react";
import ReactDOM from "react-dom";
import "./index.pcss";
import "./common/icons";
import App from "./App";
import Providers from "./common/components/Providers";

ReactDOM.render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById("root")
);
