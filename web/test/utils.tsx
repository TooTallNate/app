import React from "react";
import faker from "faker";
import { render as renderRTL, waitForDomChange } from "@testing-library/react";
import { MemoryRouter, Route, RouteProps } from "react-router-dom";
import { AuthProvider } from "../src/contexts/auth";
import App from "../src/App";
import fetchMock from "fetch-mock";
import { User } from "../src/graphql";

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

export async function renderView(
  initialRoute: string,
  { user = getUser() }: RenderViewOptions = {}
) {
  fetchMock.get(
    "/api/refresh",
    user
      ? {
          status: 200,
          body: JSON.stringify(user)
        }
      : { status: 403 }
  );
  const utils = renderRTL(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>
  );
  // Wait for auth provider to settle.
  await waitForDomChange();
  return utils;
}

// Get test user.
export function getUser({
  id = faker.random.uuid(),
  name = faker.name.findName(),
  domain = faker.internet.domainWord(),
  license = "Full License",
  username = `${domain}\\${faker.internet.userName()}`
}: Partial<User> = {}): User {
  return { id, domain, name, license, username };
}

export * from "@testing-library/react";
