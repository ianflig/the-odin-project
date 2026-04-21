import { calculator } from "./calculator.js";

test("calculator add", () => {
  expect(calculator.add(1, 2)).toBe(3);
});
test("calculator substract (1)", () => {
  expect(calculator.substract(5, 3)).toBe(2);
});
test("calculator substract (2)", () => {
  expect(calculator.substract(2, 5)).toBe(-3);
});
test("calculator divide (1)", () => {
  expect(calculator.divide(10, 2)).toBe(5);
});
test("calculator divide (2)", () => {
  expect(calculator.divide(-50, 2)).toBe(-25);
});
