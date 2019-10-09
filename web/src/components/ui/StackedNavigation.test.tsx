import React from "react";
import { renderComponent, fireEvent } from "../../../test/utils";
import StackedNavigation, { StackedNavigationItem } from "./StackedNavigation";

function render() {
  return renderComponent(
    <StackedNavigation>
      <StackedNavigationItem to="/one">One</StackedNavigationItem>
      <StackedNavigationItem to="/two">Two</StackedNavigationItem>
      <StackedNavigationItem to="/three">Three</StackedNavigationItem>
    </StackedNavigation>,
    {
      routes: [
        { path: "/one", render: () => "Page One" },
        { path: "/two", render: () => "Page Two" },
        { path: "/three", render: () => "Page Three" }
      ]
    }
  );
}

test("renders each link", () => {
  const { getByText } = render();
  getByText("One");
  getByText("Two");
  getByText("Three");
});

test("links go to their pages", async () => {
  const { getByText, findByText } = render();
  fireEvent.click(getByText("Two"));
  await findByText("Page Two");
});
