import React from "react";
import { renderComponent } from "../test-utils";
import TextInput from "./TextInput";
import { fireEvent } from "@testing-library/react";

test("type defaults to text", () => {
  const { container } = renderComponent(<TextInput />);
  const input = container.firstChild as HTMLInputElement;
  expect(input.type).toEqual("text");
});

test("type is overridable by the type prop", () => {
  const { container } = renderComponent(<TextInput type="number" />);
  const input = container.firstChild as HTMLInputElement;
  expect(input.type).toEqual("number");
});

test("input value is set from the value prop", () => {
  const { container } = renderComponent(<TextInput value="test" readOnly />);
  const input = container.firstChild as HTMLInputElement;
  expect(input).toHaveValue("test");
});

test("the onChange event on the input triggers the onChange component event", () => {
  const handler = jest.fn().mockImplementation(e => e.persist());
  const { container } = renderComponent(<TextInput onChange={handler} />);
  const input = container.firstChild as HTMLInputElement;
  fireEvent.change(input, { target: { value: "new-value" } });
  expect(handler).toHaveBeenCalledWith(
    expect.objectContaining({
      target: expect.objectContaining({ value: "new-value" })
    })
  );
  expect(handler).toHaveBeenCalledTimes(1);
});
