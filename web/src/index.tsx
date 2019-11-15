import React from "react";
import ReactDOM from "react-dom";
import "./index.pcss";
import "./icons";
import App from "./App";
import Providers from "./Providers";

ReactDOM.render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById("root")
);
