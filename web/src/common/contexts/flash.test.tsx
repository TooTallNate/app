import React from "react";
import faker from "faker";
import {
  renderHook,
  act,
  fireEvent,
  waitForElementToBeRemoved
} from "../../../test/utils";
import { FlashProvider, useFlash } from "./flash";

function render() {
  const wrapper: React.FC = ({ children }) => (
    <FlashProvider>{children}</FlashProvider>
  );
  return renderHook(useFlash, {
    wrapper
  });
}

test("displays first message", () => {
  const message = faker.lorem.sentence();
  const { getByTestId, getHook } = render();
  act(() =>
    getHook().addMessage({
      message,
      level: "info"
    })
  );
  act(() =>
    getHook().addMessage({
      message: faker.lorem.sentence(),
      level: "info"
    })
  );
  expect(getByTestId("flash-message")).toContainHTML(message);
});

test("clears all messages", () => {
  const { queryByTestId, getHook } = render();
  act(() =>
    getHook().addMessage({
      message: faker.lorem.sentence(),
      level: "info"
    })
  );
  act(() =>
    getHook().addMessage({
      message: faker.lorem.sentence(),
      level: "info"
    })
  );
  act(() => getHook().clearMessages());
  expect(queryByTestId("flash-message")).toBeFalsy();
});

test("displays error messages", () => {
  const { getByTestId, getHook } = render();
  act(() =>
    getHook().addMessage({
      message: faker.lorem.sentence(),
      level: "error"
    })
  );
  const flash = getByTestId("flash-message");
  expect(flash.querySelector("[data-icon=times-circle]")).toBeTruthy();
});

test("displays warning messages", async () => {
  const { getByTestId, getHook } = render();
  act(() =>
    getHook().addMessage({
      message: faker.lorem.sentence(),
      level: "warn"
    })
  );
  const flash = getByTestId("flash-message");
  expect(flash.querySelector("[data-icon=exclamation-circle]")).toBeTruthy();
});

test("displays info messages", () => {
  const { getByTestId, getHook } = render();
  act(() =>
    getHook().addMessage({
      message: faker.lorem.sentence(),
      level: "info"
    })
  );
  const flash = getByTestId("flash-message");
  expect(flash.querySelector("[data-icon=info-circle]")).toBeTruthy();
});

test("displays success messages", () => {
  const { getByTestId, getHook } = render();
  act(() =>
    getHook().addMessage({
      message: faker.lorem.sentence(),
      level: "success"
    })
  );
  const flash = getByTestId("flash-message");
  expect(flash.querySelector("[data-icon=check-circle]")).toBeTruthy();
});

test("closing flash message shows next message", () => {
  const message = faker.lorem.sentence();
  const { getByTestId, getByLabelText, getHook } = render();
  act(() =>
    getHook().addMessage({
      message: faker.lorem.sentence(),
      level: "info"
    })
  );
  act(() =>
    getHook().addMessage({
      message,
      level: "info"
    })
  );
  fireEvent.click(getByLabelText("Close Flash Message"));
  expect(getByTestId("flash-message")).toContainHTML(message);
});

test("flash message with timeout auto closes", async () => {
  const { getByTestId, getHook } = render();
  act(() =>
    getHook().addMessage({
      message: faker.lorem.sentence(),
      level: "info",
      timeout: 500
    })
  );
  getByTestId("flash-message");
  await waitForElementToBeRemoved(() => getByTestId("flash-message"));
});

test("replaces existing flash messages", () => {
  const message = faker.lorem.sentence();
  const { getByTestId, getHook } = render();
  act(() =>
    getHook().addMessage({
      message: faker.lorem.sentence(),
      level: "info"
    })
  );
  act(() =>
    getHook().setMessage({
      message,
      level: "info"
    })
  );
  expect(getByTestId("flash-message")).toContainHTML(message);
});
