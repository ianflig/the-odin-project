import { calculator } from "./calculator.js";

test("add 1 + 2 is 3", () => {
  expect(calculator.add(1, 2)).toBe(3);
});
test("add 5 - 3 is 2", () => {
  expect(calculator.substract(5, 3)).toBe(2);
});
test("substract  2 - 5 is -3", () => {
  expect(calculator.substract(2, 5)).toBe(-3);
});
test("divide 10 / 2 is 5", () => {
  expect(calculator.divide(10, 2)).toBe(5);
});
test("divide -50 / 2 is -25", () => {
  expect(calculator.divide(-50, 2)).toBe(-25);
});
test("multiply 2 * 5 is 10", () => {
  expect(calculator.multiply(2, 5)).toBe(10);
});
test("multiply -10 * -5 is 50", () => {
  expect(calculator.multiply(-10, -5)).toBe(50);
});
