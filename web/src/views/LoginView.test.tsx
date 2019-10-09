import faker from "faker";
import { renderView, fireEvent } from "../test-utils";
import fetchMock from "fetch-mock";

test("successful login", async () => {
  const fullName = faker.name.findName();
  const license = "Full License";
  const username = `${faker.internet.domainWord()}\\${faker.internet.userName()}`;
  const password = faker.internet.password();
  fetchMock.post("/api/login", {
    status: 200,
    body: { Full_Name: fullName, License_Type: license }
  });
  const { getByLabelText, getByText, findByText } = await renderView("/login", {
    user: null
  });
  fireEvent.change(getByLabelText(/username/i), {
    target: { value: username }
  });
  fireEvent.change(getByLabelText(/password/i), {
    target: { value: password }
  });
  fireEvent.submit(
    (getByText(/log in/i) as HTMLButtonElement).form || new HTMLFormElement()
  );
  await findByText(/pig activity/i, { selector: "h1" });
  expect(
    fetchMock.lastOptions("/api/login", {
      method: "POST"
    })
  ).toMatchObject({
    body: JSON.stringify({ username, password })
  });
});

test("invalid login", async () => {
  const username = `${faker.internet.domainWord()}\\${faker.internet.userName()}`;
  const password = faker.internet.password();
  fetchMock.post("/api/login", 401);
  const { getByLabelText, getByText, findByText } = await renderView("/login", {
    user: null
  });
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
