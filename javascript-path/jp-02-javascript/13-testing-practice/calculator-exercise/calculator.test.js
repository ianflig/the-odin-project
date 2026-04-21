import { calculator } from "./calculator.js";

test("calculator add", () => {
  expect(calculator.add(1, 2)).toBe(3);
});
