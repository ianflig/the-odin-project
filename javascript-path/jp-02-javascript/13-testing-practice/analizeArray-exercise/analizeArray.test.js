import { analizeArray } from "./analizeArray.js";

test("(1 - Average) [1,8,3,4,2,6] should return 4", () => {
  const result = analizeArray([1, 8, 3, 4, 2, 6]);
  expect(result.average).toBe(4);
});
test("(2 - Min) [1,8,3,4,2,6] should return 1", () => {
  const result = analizeArray([1, 8, 3, 4, 2, 6]);
  expect(result.min).toBe(1);
});
test("(3 - Min) [12,4,6,-1,0,2] should return -1", () => {
  const result = analizeArray([12, 4, 6, -1, 0, 2]);
  expect(result.min).toBe(-1);
});
test("(4 - Max) [1,8,3,4,2,6] should return 8", () => {
  const result = analizeArray([1, 8, 3, 4, 2, 6]);
  expect(result.max).toBe(8);
});
