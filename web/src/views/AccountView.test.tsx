import { renderView, getUser, fireEvent } from "../../test/utils";
import fetchMock from "fetch-mock";

test("logout button logs user out and redirect to login", async () => {
  fetchMock.post("/api/logout", 204);

  const { getByText, findByText } = await renderView("/account", {
    user: getUser()
  });
  fireEvent.click(getByText(/log out/i));
  await findByText(/login/i);
  expect(fetchMock.called("/api/logout", { method: "POST" })).toBe(true);
});
