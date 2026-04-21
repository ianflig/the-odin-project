import { cesarCipher } from "./cesarCipher.js";

test("xzy, 3 should return abc", () => {
  expect(cesarCipher("xyz", 3)).toBe("abc");
});
test("HeLLo, 3 should return KhOOr", () => {
  expect(cesarCipher("HeLLo", 3)).toBe("KhOOr");
});
test("loPpdD, 4 should return KhOOr", () => {
  expect(cesarCipher("loPpdD", 4)).toBe("psTthH");
});
