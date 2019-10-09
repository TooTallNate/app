import React from "react";
import { renderComponent, fireEvent } from "../../test-utils";
import FormField from "./FormField";

test("only renders first child", () => {
  const { queryByText } = renderComponent(
    <FormField
      id="test-field-id"
      className="test-field-class"
      name="test"
      label="Test"
    >
      <div>One</div>
      <div>Two</div>
    </FormField>
  );
  expect(queryByText("One")).toBeTruthy();
  expect(queryByText("Two")).toBeFalsy();
});

test("associates label with input", () => {
  const { getByLabelText } = renderComponent(
    <FormField
      id="test-field-id"
      className="test-field-class"
      name="test"
      label="Test"
    >
      <input />
    </FormField>
  );
  const input = getByLabelText("Test");
  expect(input).toHaveAttribute("aria-labelledby", `test-label`);
  expect(input).toHaveAttribute("name", "test");
});

test("passes other props to the wrapper div", () => {
  const onClickMock = jest.fn();
  const { container } = renderComponent(
    <FormField
      id="test-field-id"
      className="test-field-class"
      onClick={onClickMock}
      name="test"
      label="Test"
    >
      <input />}
    </FormField>
  );
  const wrapper = container.firstChild as HTMLDivElement;
  expect(wrapper).toHaveClass("test-field-class");
  expect(wrapper).toHaveAttribute("id", "test-field-id");
  fireEvent.click(wrapper);
  expect(onClickMock).toHaveBeenCalledTimes(1);
});
