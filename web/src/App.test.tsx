import { renderView, fireEvent } from "../test/utils";

test("when logged out, renders LoginView by default", async () => {
  const { getByText } = await renderView("/", { user: null });
  getByText(/login/i);
});

test("when logged in, renders pigs view by default", async () => {
  const { getByText } = await renderView("/");
  getByText(/pig activity/i, { selector: "h1" });
});

test("when logged in, pigs button navigates to pigs view", async () => {
  const { getByText } = await renderView("/account");
  fireEvent.click(getByText(/pig activity/i));
  getByText(/pig activity/i, { selector: "h1" });
});

test("when logged in, account button navigates to account page", async () => {
  const { getByText } = await renderView("/pigs");
  fireEvent.click(getByText(/account/i));
  getByText(/account/i, { selector: "h1" });
});
