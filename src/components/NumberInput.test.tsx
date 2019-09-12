import React from "react";
import { renderComponent } from "../test-utils";
import NumberInput from "./NumberInput";
import { fireEvent } from "@testing-library/react";

test("sets type to number", () => {
  const { container } = renderComponent(<NumberInput />);
  const input = container.firstChild as HTMLInputElement;
  expect(input.type).toEqual("number");
});

test("input value is set from the value prop", () => {
  const { container } = renderComponent(<NumberInput value={1} readOnly />);
  const input = container.firstChild as HTMLInputElement;
  expect(input).toHaveValue(1);
});

test("passes id prop to input element", () => {
  const { container } = renderComponent(<NumberInput id="number-input" />);
  const input = container.firstChild as HTMLInputElement;
  expect(input).toHaveAttribute("id", "number-input");
});

test("passes className prop to input element", () => {
  const { container } = renderComponent(
    <NumberInput className="number-input" />
  );
  const input = container.firstChild as HTMLInputElement;
  expect(input).toHaveClass("number-input");
});

test("the onChange event on the input triggers the onChange component event", () => {
  const handler = jest.fn();
  const { container } = renderComponent(<NumberInput onChange={handler} />);
  const input = container.firstChild as HTMLInputElement;
  fireEvent.change(input, { target: { value: "2" } });
  expect(handler).toHaveBeenCalledWith(2);
  expect(handler).toHaveBeenCalledTimes(1);
});
