import React from "react";
import { renderComponent } from "../../test-utils";
import FormLabel from "./FormLabel";

test("label text is set from children", () => {
  const { container } = renderComponent(<FormLabel>Text</FormLabel>);
  const input = container.firstChild as HTMLLabelElement;
  expect(input).toHaveTextContent("Text");
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
