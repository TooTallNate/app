import { renderView, getUser, fireEvent, fetchMock } from "../test-utils";

test("logout button logs user out and redirect to login", async () => {
  fetchMock.mockImplementation(async url => {
    if (url === "/api/logout") {
      return new Response(undefined, { status: 204 });
    } else {
      return new Response(undefined, { status: 404 });
    }
  });
  const { findByText } = renderView("/account", {
    user: getUser()
  });
  fireEvent.click(await findByText(/log out/i));
  await findByText(/login/i);
  expect(fetchMock).toHaveBeenCalled();
});
