import faker from "faker";
import { renderView } from "../test-utils";
import { fireEvent } from "@testing-library/react";
import service from "../service";

jest.mock("../service");
const mockedService = service as jest.Mocked<typeof service>;

beforeEach(() => {
  mockedService.login.mockReset();
});

test("login form", async () => {
  const username = `${faker.internet.domainWord}${faker.internet.userName}`;
  const password = faker.internet.password();
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
  expect(mockedService.login).toHaveBeenCalledWith({ username, password });
  expect(mockedService.login).toHaveBeenCalledTimes(1);
  await findByText(/select action/i);
});
