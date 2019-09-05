import React from "react";
import { renderComponent, fireEvent } from "../test-utils";
import MainNav from "./MainNav";

test("Form button navigates to form", () => {
  const { getByText } = renderComponent(<MainNav />, {
    routes: [{ path: "/form", render: () => <div>Form View</div> }]
  });
  fireEvent.click(getByText(/form/i));
  getByText(/form view/i);
});

test("Account button navigates to form", () => {
  const { getByText } = renderComponent(<MainNav />, {
    routes: [{ path: "/account", render: () => <div>Account View</div> }]
  });
  fireEvent.click(getByText(/account/i));
  getByText(/account view/i);
});
