import { cesarCipher } from "./cesarCipher.js";

test("xzy, 3 should return abc", () => {
  expect(cesarCipher("xyz", 3)).toBe("abc");
});
