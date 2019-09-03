import React from "react";
import { render as renderRTL } from "@testing-library/react";
import { MemoryRouter, Route, RouteProps } from "react-router-dom";
import App from "./App";

// Useful render methods.
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

// Mock the fetch API.
const originalFetch = window.fetch;
let fetchMock: jest.SpyInstance<
  Promise<Response>,
  [RequestInfo, (RequestInit | undefined)?]
>;

function mockFetch() {
  fetchMock = jest
    .spyOn(window, "fetch")
    .mockRejectedValue(new Error("You forgot to mock fetch"));
}

function unmockFetch() {
  window.fetch = originalFetch;
}

export * from "@testing-library/react";
export { mockFetch, unmockFetch, fetchMock, renderComponent, renderView };
