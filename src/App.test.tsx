import faker from "faker";
import { renderView, fireEvent, fetchMock, getUser } from "./test-utils";

test("renders LoginView by default", () => {
  const { getByText } = renderView("/");
  getByText("Login");
});

test("logging in redirects to PigMovementsView", async () => {
  fetchMock.mockImplementation(url => {
    if (url === "/api/login") {
      return Promise.resolve(
        new Response(
          JSON.stringify({
            Full_Name: faker.name.findName(),
            License_Type: "Full License"
          }),
          { status: 200 }
        )
      );
    } else {
      return Promise.reject(new Response(undefined, { status: 404 }));
    }
  });

  const { getByLabelText, getByText, findByText } = renderView("/");
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

test("when logged in, form button navigates to PigMovementsView", () => {
  const { getByText } = renderView("/", {
    user: getUser()
  });
  getByText(/select action/i);
});
