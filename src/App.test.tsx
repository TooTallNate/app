import faker from "faker";
import { renderView, fireEvent, fetchMock, getUser } from "./test-utils";

test("renders LoginView by default", async () => {
  fetchMock.mockImplementation(async url => {
    if (url === "/api/refresh") {
      return new Response(undefined, { status: 403 });
    } else {
      return new Response(undefined, { status: 404 });
    }
  });
  const { getByText, findByText } = renderView("/");
  await findByText(/login/i);
  getByText("Login");
});

test("logging in redirects to PigMovementsView", async () => {
  fetchMock.mockImplementation(async url => {
    if (url === "/api/login") {
      return new Response(
        JSON.stringify({
          Full_Name: faker.name.findName(),
          License_Type: "Full License"
        }),
        { status: 200 }
      );
    } else if (url === "/api/refresh") {
      return new Response(undefined, { status: 403 });
    } else {
      return new Response(undefined, { status: 404 });
    }
  });
  const { getByLabelText, getByText, findByText } = renderView("/");
  await findByText(/login/i);
  fireEvent.change(getByLabelText(/username/i), {
    target: { value: faker.internet.userName() }
  });
  fireEvent.change(getByLabelText(/password/i), {
    target: { value: faker.internet.password() }
  });
  fireEvent.submit(
    (getByText(/log in/i) as HTMLButtonElement).form || new HTMLFormElement()
  );
  await findByText(/select action/i);
});

test("when logged in, form button navigates to PigMovementsView", async () => {
  const { findByText } = renderView("/", {
    user: getUser()
  });
  await findByText(/select action/i);
});
