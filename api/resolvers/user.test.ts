import { client, credentials } from "../test/utils";
import { User, MutationLoginArgs } from "./types";
import { ClientError } from "graphql-request";

async function loginMutation(variables: MutationLoginArgs) {
  try {
    return await client.rawRequest<{ login: User }>(
      `
      mutation Login($input: LoginInput!) {
        login(input: $input) {
          name
          license
        }
      }
    `,
      variables
    );
  } catch (err) {
    return (err as ClientError).response;
  }
}

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
