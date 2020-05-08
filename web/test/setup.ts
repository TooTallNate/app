import "@testing-library/jest-dom/extend-expect";
import fetchMock from "fetch-mock";
import "../src/common/icons";

jest.mock("react-transition-group");

beforeEach(() => {
  fetchMock.catch((url, { method }) => {
    throw new Error(`You forgot to mock fetch for '${method} ${url}'`);
  });
});

afterEach(() => {
  fetchMock.restore();
});
