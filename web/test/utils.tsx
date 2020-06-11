import React, { useImperativeHandle, forwardRef, createRef } from "react";
import faker from "faker";
import { render as renderRTL, waitForDomChange } from "@testing-library/react";
import { MemoryRouter, Route, RouteProps, Switch } from "react-router-dom";
import { AuthProvider } from "../src/user/contexts/auth";
import App from "../src/App";
import { User, UserDocument } from "../src/user/graphql";
import { MockedResponse, MockedProvider } from "@apollo/react-testing";

export * from "@testing-library/react";

// Useful render methods.
interface RenderComponentOptions {
  wrapper?: React.ReactType;
  router?: {
    routes?: RouteProps[];
    initialRoute?: string;
  };
  apollo?: {
    mocks?: ReadonlyArray<MockedResponse>;
    addTypename?: boolean;
  };
}

export function renderComponent(
  ui: React.ReactElement,
  {
    wrapper: Wrapper = React.Fragment,
    router: { routes = [], initialRoute = "/_test/start" } = {},
    apollo = {}
  }: RenderComponentOptions = {}
) {
  return renderRTL(
    <MemoryRouter initialEntries={[initialRoute]}>
      <MockedProvider {...apollo}>
        <Wrapper>
          <Switch>
            <Route exact path={initialRoute} render={() => ui} />
            {routes.map((route, i) => (
              <Route key={i} {...route} />
            ))}
            <Route path="*" render={() => "Route not defined"} />
          </Switch>
        </Wrapper>
      </MockedProvider>
    </MemoryRouter>
  );
}

export function renderHook<T>(
  useHook: () => T,
  options: RenderComponentOptions
) {
  const TestComponent = forwardRef<T>((props, ref) => {
    const hook = useHook();
    useImperativeHandle(ref, () => hook, [hook]);
    return <div>Child</div>;
  });
  const ref = createRef<T>();
  const utils = renderComponent(<TestComponent ref={ref} />, options);
  return {
    ...utils,
    getHook: () => ref.current
  };
}

type RenderUser = Pick<User, "username" | "name">;

interface RenderViewOptions {
  user?: RenderUser | null;
  dataMocks?: MockedResponse[];
}

export async function renderView(
  initialRoute: string,
  { user = getUser(), dataMocks = [] }: RenderViewOptions = {}
) {
  const utils = renderRTL(
    <MemoryRouter initialEntries={[initialRoute]}>
      <MockedProvider
        mocks={[
          {
            request: {
              query: UserDocument
            },
            result: {
              data: {
                user
              }
            }
          },
          ...dataMocks
        ]}
        addTypename={false}
      >
        <AuthProvider>
          <App />
        </AuthProvider>
      </MockedProvider>
    </MemoryRouter>
  );
  // Wait for auth provider to settle.
  await waitForDomChange();
  return utils;
}

// Get test user.
export function getUser({
  name = faker.name.findName(),
  username = faker.internet.userName()
}: Partial<RenderUser> = {}): RenderUser {
  return { name, username };
}
