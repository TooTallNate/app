import React from "react";
import { renderComponent } from "../test-utils";
import TypeaheadInput from "./TypeaheadInput";
import { fireEvent } from "@testing-library/react";

test("shows options after typing", () => {
  const { container, queryByText } = renderComponent(
    <TypeaheadInput
      items={[
        { title: "Test-One", value: 1 },
        { title: "Test-Two", value: 2 },
        { title: "Test-Three", value: 3 },
        { title: "Four", value: 4 }
      ]}
    />
  );
  const input = container.querySelector("input") as HTMLInputElement;
  fireEvent.change(input, { target: { value: "Test" } });
  expect(queryByText("Test-One")).toBeTruthy();
  expect(queryByText("Test-Two")).toBeTruthy();
  expect(queryByText("Test-Three")).toBeTruthy();
  expect(queryByText("Four")).toBeFalsy();
});
