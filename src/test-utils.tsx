import React from "react";
import faker from "faker";
import { render as renderRTL } from "@testing-library/react";
import { MemoryRouter, Route, RouteProps } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";
import App from "./App";
import { User, License } from "./entities";

// Useful render methods.
interface RenderComponentOptions {
  routes?: RouteProps[];
  initialRoute?: string;
}

export function renderComponent(
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

interface RenderViewOptions {
  user?: User | null;
}

export function renderView(
  initialRoute: string,
  { user = getUser() }: RenderViewOptions = {}
) {
  const utils = renderRTL(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AuthProvider user={user || undefined}>
        <App />
      </AuthProvider>
    </MemoryRouter>
  );
  return utils;
}

// Get test user.
export function getUser({
  fullName = faker.name.findName(),
  license = License.Full,
  username = `${faker.internet.domainName()}\\${faker.internet.userName()}`
}: Partial<User> = {}): User {
  return { fullName, license, username };
}

export * from "@testing-library/react";
