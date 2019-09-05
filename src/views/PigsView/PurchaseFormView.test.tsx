import { renderView, fireEvent } from "../../test-utils";

test("fill out form", () => {
  const { getByText } = renderView("/pigs/purchase");
  fireEvent.click(getByText(/sows/i));
});
