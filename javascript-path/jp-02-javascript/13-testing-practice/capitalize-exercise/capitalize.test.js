import { capitalize } from "./capitalize.js";

test("banana should be Banana", () => {
  expect(capitalize("banana")).toBe("Banana");
});
