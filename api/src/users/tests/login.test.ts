import nock from "nock";
import { client, mockUser } from "../../../test/utils";
import { MutationLoginArgs, LoginResult } from "../../common/graphql";
import { NavErrorCode } from "../../common/nav";
import { ErrorCode } from "../../common/utils";

function mutation(variables: MutationLoginArgs) {
  return client.request<LoginResult>(
    `mutation Login($input: LoginInput!) {
      login(input: $input) {
        success
        user {
          username
          name
          license
        }
      }
    }`,
    variables
  );
}

test("returns user data if login is successful", async () => {
  const { user, auth, password } = await mockUser({ login: false });

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/User`)
    .query({ $filter: `User_Name eq '${user.User_Name}'` })
    .basicAuth(auth)
    .reply(200, { value: [user] });

  await expect(
    mutation({ input: { username: user.User_Name, password } })
  ).resolves.toEqual({
    login: {
      success: true,
      user: {
        username: user.User_Name,
        name: user.Full_Name,
        license: user.License_Type
      }
    }
  });
});

test("returns with error if credentials are incorrect", async () => {
  const { user, auth, password } = await mockUser({ login: false });

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/User`)
    .query({ $filter: `User_Name eq '${user.User_Name}'` })
    .basicAuth(auth)
    .reply(401, {
      error: {
        code: NavErrorCode.InvalidCredentials,
        message: "The server has rejected the client credentials."
      }
    });

  await expect(
    mutation({
      input: { username: user.User_Name, password }
    })
  ).rejects.toMatchObject({
    data: null,
    errors: [
      expect.objectContaining({
        message: expect.any(String),
        extensions: expect.objectContaining({
          code: ErrorCode.Unauthenticated
        })
      })
    ]
  });
});

test("returns with error if too many users are logged in", async () => {
  const { user, auth, password } = await mockUser({ login: false });

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/User`)
    .query({ $filter: `User_Name eq '${user.User_Name}'` })
    .basicAuth(auth)
    .reply(401, {
      error: {
        code: NavErrorCode.Unknown,
        message:
          "Your program license does not permit more users to work simultaneously"
      }
    });

  await expect(
    mutation({
      input: { username: user.User_Name, password }
    })
  ).rejects.toMatchObject({
    data: null,
    errors: [
      expect.objectContaining({
        message: expect.any(String),
        extensions: expect.objectContaining({
          code: ErrorCode.NoAvailableLicense
        })
      })
    ]
  });
});
