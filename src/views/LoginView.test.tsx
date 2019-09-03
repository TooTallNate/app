import faker from "faker";
import { renderView, fetchMock } from "../test-utils";
import { fireEvent } from "@testing-library/react";

afterEach(() => {
  fetchMock.mockReset();
});

const mockLoginFetch = (status: number, body?: object) => {
  fetchMock.mockImplementation(url => {
    if (url === "/api/login") {
      return Promise.resolve(
        new Response(body ? JSON.stringify(body) : undefined, { status })
      );
    } else {
      return Promise.reject(new Response(undefined, { status: 404 }));
    }
  });
};

test("successfuly login", async () => {
  const fullName = faker.name.findName();
  const license = "Full License";
  const username = `${faker.internet.domainWord}${faker.internet.userName}`;
  const password = faker.internet.password();

  mockLoginFetch(200, { Full_Name: fullName, License_Type: license });

  const { getByLabelText, getByText, findByText } = renderView("/login");
  fireEvent.change(getByLabelText(/username/i), {
    target: { value: username }
  });
  fireEvent.change(getByLabelText(/password/i), {
    target: { value: password }
  });
  const form =
    (getByText(/log in/i) as HTMLButtonElement).form || new HTMLFormElement();
  fireEvent.submit(form);
  await findByText(/select action/i);

  expect(fetchMock).toHaveBeenCalledWith("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  });
});

test("invalid login", async () => {
  const username = `${faker.internet.domainWord}${faker.internet.userName}`;
  const password = faker.internet.password();

  mockLoginFetch(401);

  const { getByLabelText, getByText, findByText } = renderView("/login");
  fireEvent.change(getByLabelText(/username/i), {
    target: { value: username }
  });
  fireEvent.change(getByLabelText(/password/i), {
    target: { value: password }
  });
  const form =
    (getByText(/log in/i) as HTMLButtonElement).form || new HTMLFormElement();
  fireEvent.submit(form);
  await findByText(/Username or password are invalid/i);
});
