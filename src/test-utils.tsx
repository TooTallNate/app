import React from "react";
import { render as renderRTL } from "@testing-library/react";
import { MemoryRouter, Route, RouteProps } from "react-router-dom";
import App from "./App";

interface RenderComponentOptions {
  routes?: RouteProps[];
  initialRoute?: string;
}

function renderComponent(
  ui: React.ReactElement,
  { routes = [], initialRoute = "/" }: RenderComponentOptions = {}
) {
  return renderRTL(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Route exact path={initialRoute} render={() => ui} />
      {routes.map((route, i) => (
        <Route key={i} {...route} />
      ))}
    </MemoryRouter>
  );
}

function renderView(initialRoute: string) {
  const utils = renderRTL(
    <MemoryRouter initialEntries={[initialRoute]}>
      <App />
    </MemoryRouter>
  );
  return utils;
}

export * from "@testing-library/react";
export { renderComponent, renderView };
