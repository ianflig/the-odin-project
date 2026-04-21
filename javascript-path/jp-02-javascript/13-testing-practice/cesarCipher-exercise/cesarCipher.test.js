import { cesarCipher } from "./cesarCipher.js";

test("(1) xzy, 3 should return abc", () => {
  expect(cesarCipher("xyz", 3)).toBe("abc");
});
test("(2) HeLLo, 3 should return KhOOr", () => {
  expect(cesarCipher("HeLLo", 3)).toBe("KhOOr");
});
test("(3) loPpdD, 4 should return KhOOr", () => {
  expect(cesarCipher("loPpdD", 4)).toBe("psTthH");
});
test("(4) Hello, World!, 3 should return Khoor, Zruog!", () => {
  expect(cesarCipher("Hello, World!", 3)).toBe("Khoor, Zruog!");
});
