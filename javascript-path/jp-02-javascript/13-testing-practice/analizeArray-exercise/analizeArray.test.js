import { analizeArray } from "./analizeArray.js";

test("(1 - Average) [1,8,3,4,2,6] should return 4", () => {
  const result = analizeArray([1, 8, 3, 4, 2, 6]);
  expect(result.average).toBe(4);
});
