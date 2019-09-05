import faker from "faker";
import { renderView, fetchMock, fireEvent } from "../test-utils";

const mockLoginFetch = (status: number, body?: object) => {
  fetchMock.mockImplementation(async url => {
    if (url === "/api/login") {
      return new Response(body ? JSON.stringify(body) : undefined, { status });
    } else if (url === "/api/refresh") {
      return new Response(undefined, { status: 403 });
    } else {
      return new Response(undefined, { status: 404 });
    }
  });
};

test("successful login", async () => {
  const fullName = faker.name.findName();
  const license = "Full License";
  const username = `${faker.internet.domainWord}${faker.internet.userName}`;
  const password = faker.internet.password();
  mockLoginFetch(200, { Full_Name: fullName, License_Type: license });
  const { getByLabelText, getByText, findByText } = renderView("/login", {
    user: null
  });
  await findByText(/login/i);
  fireEvent.change(getByLabelText(/username/i), {
    target: { value: username }
  });
  fireEvent.change(getByLabelText(/password/i), {
    target: { value: password }
  });
  fireEvent.submit(
    (getByText(/log in/i) as HTMLButtonElement).form || new HTMLFormElement()
  );
  await findByText(/pigs/i, { selector: "h1" });
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
  const { getByLabelText, getByText, findByText } = renderView("/login", {
    user: null
  });
  await findByText(/login/i);
  fireEvent.change(getByLabelText(/username/i), {
    target: { value: username }
  });
  fireEvent.change(getByLabelText(/password/i), {
    target: { value: password }
  });
  fireEvent.submit(
    (getByText(/log in/i) as HTMLButtonElement).form || new HTMLFormElement()
  );
  await findByText(/Username or password are invalid/i);
});
