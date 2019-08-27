import React from "react";
import { renderComponent } from "../test-utils";
import ButtonInput from "./ButtonInput";
import { fireEvent } from "@testing-library/react";

test("type defaults to button", () => {
  const { container } = renderComponent(<ButtonInput />);
  const button = container.firstChild as HTMLButtonElement;
  expect(button.type).toEqual("button");
});

test("type is overridable by the type prop", () => {
  const { container } = renderComponent(<ButtonInput type="submit" />);
  const button = container.firstChild as HTMLButtonElement;
  expect(button.type).toEqual("submit");
});

test("button text is set from children", () => {
  const { container } = renderComponent(<ButtonInput>Text</ButtonInput>);
  const input = container.firstChild as HTMLInputElement;
  expect(input).toHaveTextContent("Text");
});

test("the onClick event on the button triggers the onClick component event", () => {
  const handler = jest.fn().mockImplementation(e => e.persist());
  const { container } = renderComponent(<ButtonInput onClick={handler} />);
  const input = container.firstChild as HTMLInputElement;
  fireEvent.click(input);
  expect(handler).toHaveBeenCalledTimes(1);
});
