import { capitalize } from "./capitalize.js";

test("capitalize a string", () => {
  expect(capitalize("banana")).toBe("Banana");
});
