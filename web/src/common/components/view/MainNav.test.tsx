import React from "react";
import { renderComponent, fireEvent } from "../../../../test/utils";
import MainNav from "./MainNav";

const render = () =>
  renderComponent(<MainNav />, {
    router: {
      routes: [
        { exact: true, path: "/", render: () => <div>Home View</div> },
        { path: "/account", render: () => <div>Account View</div> }
      ]
    }
  });

test("Home button navigates to pigs", () => {
  const { getByText } = render();
  fireEvent.click(getByText(/home/i));
  getByText(/home view/i);
});

test("Account button navigates to form", () => {
  const { getByText } = render();
  fireEvent.click(getByText(/account/i));
  getByText(/account view/i);
});
