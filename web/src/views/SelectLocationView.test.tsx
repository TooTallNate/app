import { renderView, fireEvent } from "../../test/utils";

test("renders route", async () => {
  const { getByText } = await renderView("/location");
  getByText(/Location/i);
});

test("select a location", async () => {
  const { getByLabelText } = await renderView("/location");
  fireEvent.click(getByLabelText(/Sow Barn/i));
});
