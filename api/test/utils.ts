import faker from "faker";
import nock from "nock";
import { GraphQLClient } from "graphql-request";
import { UserFactory } from "../test/builders";
import { ErrorCode } from "../src/common/utils";

const port = process.env.PORT;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      fetch: any;
    }
  }
}

global.fetch = require("fetch-cookie/node-fetch")(require("node-fetch"));

export const client = new GraphQLClient(`http://localhost:${port}`);

export async function mockUser({ login = true } = {}) {
  const user = UserFactory.build();
  const password = faker.internet.password();

  const auth = {
    user: user.User_Name,
    pass: password
  };

  if (login) {
    nock(process.env.NAV_BASE_URL)
      .get("/User")
      .query({ $filter: `(User_Name eq '${user.User_Name}')` })
      .basicAuth(auth)
      .reply(200, { value: [user] });

    await client.request(
      `mutation Login($input: LoginInput!) {
        login(input: $input) {
          user {
            username
          }
        }
      }`,
      {
        input: {
          username: user.User_Name,
          password
        }
      }
    );
  }

  return {
    user,
    password,
    auth
  };
}

export function testUnauthenticated(
  queryOrMutation: () => Promise<any>,
  data: any = null
): void {
  test("returns with error if unauthenticated", async () => {
    await expect(queryOrMutation()).rejects.toMatchObject({
      response: {
        data,
        errors: [
          expect.objectContaining({
            message: ErrorCode.Unauthorized
          })
        ]
      }
    });
  });
}
