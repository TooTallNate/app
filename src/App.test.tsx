import { renderView, fireEvent, fetchMock, getUser } from "./test-utils";

test("when logged out, renders LoginView by default", async () => {
  fetchMock.mockImplementation(async url => {
    if (url === "/api/refresh") {
      return new Response(undefined, { status: 403 });
    } else {
      return new Response(undefined, { status: 404 });
    }
  });
  const { findByText } = renderView("/", {
    user: null
  });
  await findByText(/login/i);
});

test("when logged in, renders pigs view by default", async () => {
  const { findByText } = renderView("/");
  await findByText(/pigs/i, { selector: "h1" });
});

test("when logged in, pigs button navigates to pigs view", async () => {
  const { findByText } = renderView("/account");
  fireEvent.click(await findByText(/pigs/i));
  await findByText(/pigs/i, { selector: "h1" });
});

test("when logged in, account button navigates to account page", async () => {
  const { findByText } = renderView("/form");
  fireEvent.click(await findByText(/account/i));
  await findByText(/account/i, { selector: "h1" });
});