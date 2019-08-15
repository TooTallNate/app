import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PigMovementsView from "./PigMovementsView";

test("renders without errors", () => {
  const { container } = render(<PigMovementsView />);
  expect(container).not.toBeEmpty();
});

test("clicking on `Wean` button displays list of animals that can be weaned.", () => {
  const { getByText } = render(<PigMovementsView />);
  fireEvent.click(getByText("Wean"));
});
