import { GraphQLClient, ClientError } from "graphql-request";
import { GraphQLError } from "graphql-request/dist/src/types";
import { User, MutationLoginArgs } from "../resolvers/types";
import nav from "../nav";
import { NavMock } from "../nav/__mocks__/index";

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

const client = new GraphQLClient(`http://localhost:${port}`);

export const navMock = (nav as any) as NavMock;

interface GQLResponse<T> {
  data?: T;
  extensions?: any;
  headers: Headers;
  status: number;
  errors?: GraphQLError[];
}

export function gql<T, V = void>(
  query: string
): (variables?: V) => Promise<GQLResponse<T>> {
  return async (variables: V) => {
    try {
      return await client.rawRequest<T>(query, variables);
    } catch (err) {
      const response = (err as ClientError).response;
      if (response) return response as GQLResponse<T>;
      else throw err;
    }
  };
}

export async function login() {
  const { errors } = await gql<{ login: User }, MutationLoginArgs>(
    `mutation Login($input: LoginInput!) {
      login(input: $input) {
        name
        license
      }
    }`
  )({ input: navMock.credentials });
  expect(errors).toBeFalsy();
}

export async function expectUnauthorized(
  fn: () => Promise<{ errors?: { message: string }[] }>
): Promise<void> {
  const { errors } = await fn();
  expect(errors).toEqual([
    expect.objectContaining({
      message: "Unauthorized"
    })
  ]);
}
