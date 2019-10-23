import React, { forwardRef, useImperativeHandle, createRef } from "react";
import faker from "faker";
import { MockedResponse } from "@apollo/react-testing";
import { RenderResult, renderComponent } from "../../test/utils";
import { AuthProvider, useAuth, AuthContextValue } from "./auth";
import { UserDocument, LoginDocument, LogoutDocument } from "../graphql";
import { act } from "react-dom/test-utils";

const TestComponent = forwardRef<AuthContextValue>((props, ref) => {
  const auth = useAuth();
  useImperativeHandle(ref, () => auth, [auth]);
  return <div>Child</div>;
});

function render(
  mocks: MockedResponse[]
): RenderResult & { ref: React.Ref<AuthContextValue> } {
  const ref = createRef<AuthContextValue>();
  const utils = renderComponent(
    <AuthProvider>
      <TestComponent ref={ref} />
    </AuthProvider>,
    {
      apollo: {
        mocks,
        addTypename: false
      }
    }
  );
  return {
    ...utils,
    ref
  };
}

test("renders loading", async () => {
  const { findByText } = render([]);
  await findByText(/Loading/i);
});

test("returns unauthenticated if user query returns null", async () => {
  const { ref, findByText } = render([
    {
      request: { query: UserDocument },
      result: { data: { user: null } }
    }
  ]);
  await findByText(/Child/i);
  expect(ref.current).toEqual({
    isAuthenticated: false,
    user: null,
    login: expect.any(Function),
    logout: expect.any(Function)
  });
});

test("returns authenticated if user query returns with user", async () => {
  const user = {
    id: faker.random.alphaNumeric(24),
    name: faker.name.findName(),
    username: faker.internet.userName()
  };
  const { ref, findByText } = render([
    {
      request: { query: UserDocument },
      result: { data: { user } }
    }
  ]);
  await findByText(/Child/i);
  expect(ref.current).toEqual({
    isAuthenticated: true,
    user,
    login: expect.any(Function),
    logout: expect.any(Function)
  });
});

test("login updates context when successful", async () => {
  const user = {
    id: faker.random.alphaNumeric(24),
    name: faker.name.findName(),
    username: faker.internet.userName()
  };
  const creds = {
    username: faker.internet.userName(),
    password: faker.internet.password()
  };
  const { ref, findByText } = render([
    {
      request: { query: UserDocument },
      result: { data: { user: null } }
    },
    {
      request: { query: LoginDocument, variables: { input: creds } },
      result: { data: { login: user } }
    }
  ]);
  await findByText(/Child/i);
  await act(() => ref.current.login(creds.username, creds.password));
  expect(ref.current).toEqual({
    isAuthenticated: true,
    user,
    login: expect.any(Function),
    logout: expect.any(Function)
  });
});

test("logout updates context when successful", async () => {
  const user = {
    id: faker.random.alphaNumeric(24),
    name: faker.name.findName(),
    username: faker.internet.userName()
  };
  const { ref, findByText } = render([
    {
      request: { query: UserDocument },
      result: { data: { user } }
    },
    {
      request: { query: LogoutDocument },
      result: { data: { logout: true } }
    }
  ]);
  await findByText(/Child/i);
  await act(() => ref.current.logout());
  expect(ref.current).toEqual({
    isAuthenticated: false,
    user: null,
    login: expect.any(Function),
    logout: expect.any(Function)
  });
});
