import React from "react";
import { renderComponent } from "../../test-utils";
import TextInput from "./TextInput";
import { fireEvent } from "@testing-library/react";

test("type defaults to text", () => {
  const { container } = renderComponent(<TextInput />);
  const input = container.firstChild as HTMLInputElement;
  expect(input.type).toEqual("text");
});

test("type is overridable by the type prop", () => {
  const { container } = renderComponent(<TextInput type="password" />);
  const input = container.firstChild as HTMLInputElement;
  expect(input.type).toEqual("password");
});

test("input value is set from the value prop", () => {
  const { container } = renderComponent(<TextInput value="test" readOnly />);
  const input = container.firstChild as HTMLInputElement;
  expect(input).toHaveValue("test");
});

test("passes id prop to input element", () => {
  const { container } = renderComponent(<TextInput id="number-input" />);
  const input = container.firstChild as HTMLInputElement;
  expect(input).toHaveAttribute("id", "number-input");
});

test("passes className prop to input element", () => {
  const { container } = renderComponent(<TextInput className="number-input" />);
  const input = container.firstChild as HTMLInputElement;
  expect(input).toHaveClass("number-input");
});

test("the onChange event on the input triggers the onChange component event", () => {
  const handler = jest.fn();
  const { container } = renderComponent(<TextInput onChange={handler} />);
  const input = container.firstChild as HTMLInputElement;
  fireEvent.change(input, { target: { value: "new-value" } });
  expect(handler).toHaveBeenCalledWith("new-value");
  expect(handler).toHaveBeenCalledTimes(1);
});
