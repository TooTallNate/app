import faker from "faker";
import { renderView, fireEvent, getUser } from "../../test/utils";
import { LoginDocument } from "../graphql";

test("successful login", async () => {
  const user = getUser();
  const password = faker.internet.password();
  const { getByLabelText, getByText, findByText } = await renderView("/login", {
    user: null,
    dataMocks: [
      {
        request: {
          query: LoginDocument,
          variables: {
            input: { username: user.username, password }
          }
        },
        result: {
          data: {
            login: user
          }
        }
      }
    ]
  });
  fireEvent.change(getByLabelText(/username/i), {
    target: { value: user.username }
  });
  fireEvent.change(getByLabelText(/password/i), {
    target: { value: password }
  });
  fireEvent.submit(
    (getByText(/log in/i) as HTMLButtonElement).form || new HTMLFormElement()
  );
  await findByText(/pig activity/i, { selector: "h1" });
});

test("invalid login", async () => {
  const username = `${faker.internet.domainWord()}\\${faker.internet.userName()}`;
  const password = faker.internet.password();
  const { getByLabelText, getByText, findByText } = await renderView("/login", {
    user: null,
    dataMocks: [
      {
        request: {
          query: LoginDocument,
          variables: {
            input: { username: username, password }
          }
        },
        error: new Error("Invalid credentials")
      }
    ]
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
