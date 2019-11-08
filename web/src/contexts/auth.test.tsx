import React from "react";
import faker from "faker";
import { MockedResponse } from "@apollo/react-testing";
import { renderHook, act } from "../../test/utils";
import { AuthProvider, useAuth } from "./auth";
import { UserDocument, LoginDocument, LogoutDocument } from "../graphql";

function render(mocks: MockedResponse[]) {
  return renderHook(useAuth, {
    wrapper: ({ children }) => <AuthProvider>{children}</AuthProvider>,
    apollo: {
      mocks,
      addTypename: false
    }
  });
}

test("renders loading ui", async () => {
  const { findByText } = render([]);
  await findByText(/Logging In.../i);
});

test("returns unauthenticated if user query returns null", async () => {
  const { getHook, findByText } = render([
    {
      request: { query: UserDocument },
      result: { data: { user: null } }
    }
  ]);
  await findByText(/Child/i);
  expect(getHook()).toEqual({
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
  const { getHook, findByText } = render([
    {
      request: { query: UserDocument },
      result: { data: { user } }
    }
  ]);
  await findByText(/Child/i);
  expect(getHook()).toEqual({
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
  const { getHook, findByText } = render([
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
  await act(() => getHook().login(creds.username, creds.password));
  expect(getHook()).toEqual({
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
  const { getHook, findByText } = render([
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
  await act(() => getHook().logout());
  expect(getHook()).toEqual({
    isAuthenticated: false,
    user: null,
    login: expect.any(Function),
    logout: expect.any(Function)
  });
});
