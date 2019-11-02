import { navMock, login, expectUnauthorized } from "../test/utils";
import {
  loginMutation,
  logoutMutation,
  userQuery,
  jobsQuery
} from "../test/gql";

describe("user query", () => {
  test("returns null if not logged in", async () => {
    const { data, errors } = await userQuery();
    expect(errors).toBeFalsy();
    expect(data).toEqual({
      user: null
    });
  });

  test("returns user if logged in", async () => {
    await login();
    const { data, errors } = await userQuery();
    expect(errors).toBeFalsy();
    expect(data).toEqual({
      user: {
        id: navMock.user.User_Security_ID,
        username: navMock.credentials.username.split("\\")[1],
        domain: navMock.credentials.username.split("\\")[0],
        name: navMock.user.Full_Name,
        license: navMock.user.License_Type
      }
    });
  });
});

describe("login mutation", () => {
  test("returns user info", async () => {
    const { data, errors } = await loginMutation({
      input: navMock.credentials
    });
    expect(errors).toBeFalsy();
    expect(data).toEqual({
      login: {
        id: navMock.user.User_Security_ID,
        username: navMock.credentials.username.split("\\")[1],
        domain: navMock.credentials.username.split("\\")[0],
        name: navMock.user.Full_Name,
        license: navMock.user.License_Type
      }
    });
  });

  test("returns error if credentials are invalid", async () => {
    const username = "domain\\invalid";
    const password = "invalid";
    const { errors } = await loginMutation({
      input: { username, password }
    });
    expect(errors).toEqual([
      expect.objectContaining({
        message: "Login failed"
      })
    ]);
  });
});

describe("logout mutation", () => {
  test("returns error if not logged in", () =>
    expectUnauthorized(logoutMutation));

  test("returns true if logged in", async () => {
    await login();
    const { data, errors } = await logoutMutation();
    expect(errors).toBeFalsy();
    expect(data).toEqual({ logout: true });
  });

  test("subsequent requests fail after logging out", async () => {
    await login();
    const { data, errors } = await logoutMutation();
    expect(errors).toBeFalsy();
    expect(data).toEqual({ logout: true });
    await expectUnauthorized(jobsQuery);
  });
});
