import React from "react";
import { renderComponent, fireEvent } from "../../../test/utils";
import TypeaheadInput from "./TypeaheadInput";

function render(ui: React.ReactElement) {
  const utils = renderComponent(ui);
  return {
    ...utils,
    wrapper: utils.container.firstChild as HTMLDivElement,
    input: utils.container.querySelector("input") as HTMLInputElement
  };
}

test("passes className to wrapper component", () => {
  const { wrapper } = render(
    <TypeaheadInput
      className="typeahead-class"
      items={[
        { title: "Test-One", value: 1 },
        { title: "Test-Two", value: 2 },
        { title: "Test-Three", value: 3 },
        { title: "Four", value: 4 }
      ]}
    />
  );
  expect(wrapper).toHaveClass("typeahead-class");
});

test("passes other props to input element", () => {
  const onClickMock = jest.fn().mockImplementation(e => e.persist());
  const { input } = render(
    <TypeaheadInput
      readOnly
      onClick={onClickMock}
      items={[
        { title: "Test-One", value: 1 },
        { title: "Test-Two", value: 2 },
        { title: "Test-Three", value: 3 },
        { title: "Four", value: 4 }
      ]}
    />
  );

  expect(input).toHaveAttribute("readonly");

  fireEvent.click(input);
  expect(onClickMock).toHaveBeenCalled();
  expect(onClickMock.mock.calls[0][0].target).toBe(input);
});

test("shows options after typing", () => {
  const { input, queryByText } = render(
    <TypeaheadInput
      items={[
        { title: "Test-One", value: 1 },
        { title: "Test-Two", value: 2 },
        { title: "Test-Three", value: 3 },
        { title: "Four", value: 4 }
      ]}
    />
  );
  fireEvent.change(input, { target: { value: "Test" } });
  expect(queryByText("Test-One")).toBeTruthy();
  expect(queryByText("Test-Two")).toBeTruthy();
  expect(queryByText("Test-Three")).toBeTruthy();
  expect(queryByText("Four")).toBeFalsy();
});
