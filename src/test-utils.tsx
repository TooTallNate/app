import React from "react";
import { render as renderRTL } from "@testing-library/react";
import { createMemoryHistory, MemoryHistory } from "history";
import { Router, Route, RouteProps } from "react-router-dom";

interface RenderComponentOptions {
  routes?: RouteProps[];
  initialRoute?: string;
  history?: MemoryHistory;
}

function renderComponent(
  ui: React.ReactElement,
  {
    routes = [],
    initialRoute = "/",
    history = createMemoryHistory({ initialEntries: [initialRoute] })
  }: RenderComponentOptions = {}
) {
  return renderRTL(
    <Router history={history}>
      <Route exact path={initialRoute} render={() => ui} />
      {routes.map((route, i) => (
        <Route key={i} {...route} />
      ))}
    </Router>
  );
}

export * from "@testing-library/react";
export { renderComponent };
