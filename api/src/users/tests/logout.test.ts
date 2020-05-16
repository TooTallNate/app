import { client, mockUser, testUnauthenticated } from "../../../test/utils";
import { LogoutResult } from "../../common/graphql";

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
