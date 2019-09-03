import "@testing-library/jest-dom/extend-expect";
import { mockFetch, unmockFetch } from "./test-utils";

beforeEach(() => {
  mockFetch();
});

afterEach(() => {
  unmockFetch();
});
