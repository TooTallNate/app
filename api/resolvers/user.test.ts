import { credentials, login, expectUnauthorized } from "../test/utils";
import { loginMutation, logoutMutation, userQuery } from "../test/gql";

describe("user query", () => {
  test("returns error if not logged in", () => expectUnauthorized(userQuery));

  test("returns user if logged in", async () => {
    await login();
    const { data } = await userQuery();
    expect(data).toEqual({
      user: {
        license: "Full User",
        name: expect.any(String)
      }
    });
  });
});

describe("login mutation", () => {
  test("returns user info", async () => {
    const { data } = await loginMutation({
      input: credentials
    });
    expect(data).toEqual({
      login: {
        license: "Full User",
        name: expect.any(String)
      }
    });
  });

  test("returns error if credentials are invalid", async () => {
    const { errors } = await loginMutation({
      input: {
        username: "domain\\invalid",
        password: "invalid"
      }
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
    const { data } = await logoutMutation();
    expect(data).toEqual({ logout: true });
  });

  test("subsequent requests fail after logging out", async () => {
    await login();
    const { data } = await logoutMutation();
    expect(data).toEqual({ logout: true });
    await expectUnauthorized(userQuery);
  });
});
