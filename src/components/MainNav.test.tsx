import React from "react";
import { renderComponent, fireEvent } from "../test-utils";
import MainNav from "./MainNav";

test("Pigs button navigates to pigs", () => {
  const { getByText } = renderComponent(<MainNav />, {
    routes: [{ path: "/pigs", render: () => <div>Pigs View</div> }]
  });
  fireEvent.click(getByText(/pigs/i));
  getByText(/pigs view/i);
});

test("Account button navigates to form", () => {
  const { getByText } = renderComponent(<MainNav />, {
    routes: [{ path: "/account", render: () => <div>Account View</div> }]
  });
  fireEvent.click(getByText(/account/i));
  getByText(/account view/i);
});