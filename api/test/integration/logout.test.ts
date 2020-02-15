import { client, mockUser, testUnauthenticated } from "../utils";
import { LogoutMutation } from "../../resolvers/types";

function mutation() {
  return client.request<LogoutMutation>(
    `
        mutation Logout {
          logout
        }
      `
  );
}

testUnauthenticated(mutation);

test("returns true if user is logged in", async () => {
  await mockUser();

  await expect(mutation()).resolves.toEqual({
    logout: true
  });
});
