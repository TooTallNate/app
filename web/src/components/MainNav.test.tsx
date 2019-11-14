import React from "react";
import { renderComponent, fireEvent } from "../../test/utils";
import MainNav from "./MainNav";

test("Activity button navigates to pigs", () => {
  const { getByText } = renderComponent(<MainNav />, {
    router: { routes: [{ path: "/pigs", render: () => <div>Pigs View</div> }] }
  });
  fireEvent.click(getByText(/activity/i));
  getByText(/pigs view/i);
});

test("Account button navigates to form", () => {
  const { getByText } = renderComponent(<MainNav />, {
    router: {
      routes: [{ path: "/account", render: () => <div>Account View</div> }]
    }
  });
  fireEvent.click(getByText(/account/i));
  getByText(/account view/i);
});
