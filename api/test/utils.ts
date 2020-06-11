import faker from "faker";
import { createTestClient } from "apollo-server-testing";
import { UserFactory } from "../test/builders";
import { ErrorCode } from "../src/common/utils";
import { schema } from "../src/server";
import { ApolloServer } from "apollo-server-express";
import { createContext } from "../src/context";
import dataSources from "../src/common/datasources";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      fetch: any;
    }
  }
}

export const getUser = jest.fn().mockReturnValue(undefined);
const server = new ApolloServer({
  schema,
  dataSources,
  context: () =>
    createContext({
      req: {
        session: {
          destroy: jest.fn().mockImplementation(cb => cb()),
          user: getUser()
        } as any
      }
    })
});

const _client = createTestClient(server);
export const client = {
  async request<T = any>(queryOrMutation: string, variables?: any): Promise<T> {
    let result;
    if (queryOrMutation.includes("mutation")) {
      result = await _client.mutate({
        mutation: queryOrMutation,
        variables
      });
    } else {
      result = await _client.query({
        query: queryOrMutation,
        variables
      });
    }
    if (!result.errors) {
      return result.data as T;
    } else {
      throw result;
    }
  }
};

export async function mockUser({ login = true } = {}) {
  const user = UserFactory.build();
  const password = faker.internet.password();

  const auth = {
    user: user.User_Name,
    pass: password
  };

  if (login) {
    getUser.mockReturnValue({
      securityId: user.User_Security_ID,
      username: user.User_Name,
      name: user.Full_Name,
      password
    });
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
      data,
      errors: [
        expect.objectContaining({
          message: ErrorCode.Unauthorized
        })
      ]
    });
  });
}

// export async function buildQuery(
//   query: string,
//   variables?: object
// ): Promise<any> {
//   const r = await client.query({
//     query,
//     variables
//   });
//   if (r.data) {
//     return r.data;
//   } else {
//     throw r;
//   }
// }

// export async function buildMutation(
//   mutation: string,
//   variables?: object
// ): Promise<any> {
//   const r = await client.mutate({
//     mutation,
//     variables
//   });
//   if (r.data) {
//     return r.data;
//   } else {
//     throw r;
//   }
// }
