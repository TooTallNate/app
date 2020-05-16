import nock from "nock";
import { client, mockUser } from "../../test/utils";
import { User } from "../../common/graphql";

interface QueryResult {
  user: User;
}

function query() {
  return client.request<QueryResult>(`
      {
        user {
          name
          username
          license
        }
      }
    `);
}

test("returns user data for a logged in user", async () => {
  const { user, auth } = await mockUser();

  nock(process.env.NAV_BASE_URL)
    .get(`/User(${user.User_Security_ID})`)
    .basicAuth(auth)
    .reply(200, user);

  await expect(query()).resolves.toEqual({
    user: {
      username: user.User_Name,
      name: user.Full_Name,
      license: user.License_Type
    }
  });
});

test("returns null if unauthenticated", async () => {
  await expect(query()).resolves.toEqual({
    user: null
  });
});
