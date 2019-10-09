import React, { createRef } from "react";
import { renderComponent } from "../../test-utils";
import FormLabel from "./FormLabel";

function render(ui: React.ReactElement) {
  const utils = renderComponent(ui);
  return {
    ...utils,
    label: utils.container.firstChild as HTMLLabelElement
  };
}

test("passes props to element", () => {
  const { label } = render(<FormLabel id="label-id" className="label-class" />);
  expect(label).toHaveAttribute("id", "label-id");
  expect(label).toHaveClass("label-class");
});

test("label text is set from children", () => {
  const { label } = render(<FormLabel>Text</FormLabel>);
  expect(label).toHaveTextContent("Text");
});

test("the htmlFor attribute connects the label to its input.", () => {
  const { getByLabelText } = renderComponent(
    <div>
      <FormLabel htmlFor="input">Label</FormLabel>
      <input id="input" />
    </div>
  );
  getByLabelText("Label");
});

test("component ref is the label element", () => {
  const ref = createRef<HTMLLabelElement>();
  const { label } = render(<FormLabel ref={ref} />);
  expect(ref.current).toBe(label);
});
