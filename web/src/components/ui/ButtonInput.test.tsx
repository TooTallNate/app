import React, { createRef } from "react";
import { renderComponent, fireEvent } from "../../test-utils";
import ButtonInput from "./ButtonInput";

function render(ui: React.ReactElement) {
  const utils = renderComponent(ui);
  return {
    ...utils,
    button: utils.container.firstChild as HTMLButtonElement
  };
}

test("type defaults to button", () => {
  const { button } = render(<ButtonInput />);
  expect(button.type).toEqual("button");
});

test("type is overridable by the type prop", () => {
  const { button } = render(<ButtonInput type="submit" />);
  expect(button.type).toEqual("submit");
});

test("passes props to element", () => {
  const { button } = render(
    <ButtonInput id="button-id" className="button-class" disabled={true} />
  );
  expect(button).toHaveAttribute("id", "button-id");
  expect(button).toHaveClass("button-class");
  expect(button).toBeDisabled();
});

test("button text is set from children", () => {
  const { button } = render(<ButtonInput>Text</ButtonInput>);
  expect(button).toHaveTextContent("Text");
});

test("click event on the button triggers the click event on the component", () => {
  const handler = jest.fn().mockImplementation(e => e.persist());
  const { button } = render(<ButtonInput onClick={handler} />);
  fireEvent.click(button);
  expect(handler).toHaveBeenCalledTimes(1);
});

test("component ref is the button element", () => {
  const ref = createRef<HTMLButtonElement>();
  const { button } = render(<ButtonInput ref={ref} />);
  expect(ref.current).toBe(button);
});
