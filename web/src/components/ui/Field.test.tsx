import React from "react";
import { renderComponent, fireEvent } from "../../../test/utils";
import Field from "./Field";

test("only renders first child", () => {
  const { queryByText } = renderComponent(
    <Field
      id="test-field-id"
      className="test-field-class"
      name="test"
      label="Test"
    >
      <div>One</div>
      <div>Two</div>
    </Field>
  );
  expect(queryByText("One")).toBeTruthy();
  expect(queryByText("Two")).toBeFalsy();
});

test("associates label with input", () => {
  const { getByLabelText } = renderComponent(
    <Field
      id="test-field-id"
      className="test-field-class"
      name="test"
      label="Test"
    >
      <input />
    </Field>
  );
  const input = getByLabelText("Test");
  expect(input).toHaveAttribute("aria-labelledby", `test-label`);
  expect(input).toHaveAttribute("name", "test");
});

test("passes other props to the wrapper div", () => {
  const onClickMock = jest.fn();
  const { container } = renderComponent(
    <Field
      id="test-field-id"
      className="test-field-class"
      onClick={onClickMock}
      name="test"
      label="Test"
    >
      <input />}
    </Field>
  );
  const wrapper = container.firstChild as HTMLDivElement;
  expect(wrapper).toHaveClass("test-field-class");
  expect(wrapper).toHaveAttribute("id", "test-field-id");
  fireEvent.click(wrapper);
  expect(onClickMock).toHaveBeenCalledTimes(1);
});
