import { client, mockUser, testUnauthenticated } from "../utils";
import { LogoutResult } from "../../resolvers/types";

function mutation() {
  return client.request<LogoutResult>(
    `mutation Logout {
      logout {
        success
      }
    }`
  );
}

testUnauthenticated(mutation);

test("returns true if user is logged in", async () => {
  await mockUser();

  await expect(mutation()).resolves.toEqual({
    logout: {
      success: true
    }
  });
});
