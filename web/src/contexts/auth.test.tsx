import React from "react";
import faker from "faker";
import { MockedResponse } from "@apollo/react-testing";
import { renderHook, act } from "../../test/utils";
import {
  AuthProvider,
  useAuth,
  InvalidCredentialsError,
  NoAvailableLicenseError
} from "./auth";
import { UserDocument, LoginDocument, LogoutDocument } from "../graphql";

function render(mocks: MockedResponse[]) {
  return renderHook(useAuth, {
    wrapper: ({ children }) => <AuthProvider>{children}</AuthProvider>,
    apollo: { mocks }
  });
}

test("renders loading ui", async () => {
  const { findByTestId } = render([]);
  await findByTestId("spinner");
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
    __typename: "User",
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
    __typename: "User",
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
      result: {
        data: {
          login: {
            __typename: "LoginResult",
            user
          }
        }
      }
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

test("login throws error if credentials are invalid", async () => {
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
      result: {
        errors: [
          {
            message: "INVALID_CREDENTIALS"
          } as any
        ]
      }
    }
  ]);
  await findByText(/Child/i);
  await act(() =>
    expect(
      getHook().login(creds.username, creds.password)
    ).rejects.toThrowError(new InvalidCredentialsError())
  );
  expect(getHook()).toEqual({
    isAuthenticated: false,
    user: null,
    login: expect.any(Function),
    logout: expect.any(Function)
  });
});

test("login throws error if no license is available", async () => {
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
      result: {
        errors: [
          {
            message: "NO_AVAILABLE_LICENSE"
          } as any
        ]
      }
    }
  ]);
  await findByText(/Child/i);
  await act(() =>
    expect(
      getHook().login(creds.username, creds.password)
    ).rejects.toThrowError(new NoAvailableLicenseError())
  );
  expect(getHook()).toEqual({
    isAuthenticated: false,
    user: null,
    login: expect.any(Function),
    logout: expect.any(Function)
  });
});

test("logout updates context when successful", async () => {
  const user = {
    __typename: "User",
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
      result: {
        data: {
          logout: {
            __typename: "LogoutResult",
            success: true
          }
        }
      }
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
