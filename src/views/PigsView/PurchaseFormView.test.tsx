import { renderView, fireEvent } from "../../test-utils";
import fetchMock from "fetch-mock";

beforeEach(() => {
  fetchMock.get("express:/api/Job_List", {
    status: 200,
    body: {
      value: []
    }
  });
});

test("fill out form", () => {
  const { getByText } = renderView("/pigs/purchase");
  fireEvent.click(getByText(/sows/i));
});
