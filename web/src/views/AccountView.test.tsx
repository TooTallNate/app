import { renderView, fireEvent } from "../../test/utils";
import fetchMock from "fetch-mock";
import { LogoutDocument } from "../graphql";

test("logout button logs user out and redirect to login", async () => {
  fetchMock.post("/api/logout", 204);

  const { findByText } = await renderView("/account", {
    dataMocks: [
      {
        request: {
          query: LogoutDocument
        },
        result: {
          data: {
            logout: true
          }
        }
      }
    ]
  });
  fireEvent.click(await findByText(/log out/i));
  await findByText(/login/i);
});
