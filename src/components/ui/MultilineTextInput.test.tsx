import React, { createRef } from "react";
import { renderComponent } from "../../test-utils";
import MultilineTextInput from "./MultilineTextInput";
import { fireEvent } from "@testing-library/react";

function render(ui: React.ReactElement) {
  const utils = renderComponent(ui);
  return {
    ...utils,
    input: utils.container.firstChild as HTMLTextAreaElement
  };
}

test("input value is set from the value prop", () => {
  const { input } = render(<MultilineTextInput value="test" readOnly />);
  expect(input).toHaveValue("test");
});

test("passes props to element", () => {
  const { input } = render(
    <MultilineTextInput id="text-id" className="text-class" disabled />
  );
  expect(input).toHaveAttribute("id", "text-id");
  expect(input).toHaveClass("text-class");
  expect(input).toBeDisabled();
});

test("the onChange event on the input triggers the onChange component event", () => {
  const handler = jest
    .fn()
    .mockImplementation(e => expect(e.target.value).toEqual("new-value"));
  const { input } = render(<MultilineTextInput onChange={handler} />);
  fireEvent.change(input, { target: { value: "new-value" } });
  expect(handler).toHaveBeenCalledTimes(1);
});

test("component ref is the textarea element", () => {
  const ref = createRef<HTMLTextAreaElement>();
  const { input } = render(<MultilineTextInput ref={ref} />);
  expect(ref.current).toBe(input);
});
