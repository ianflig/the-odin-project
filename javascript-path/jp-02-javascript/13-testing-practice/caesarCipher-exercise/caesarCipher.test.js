import { caesarCipher } from "./caesarCipher.js";

test("(1) xzy, 3 should return abc", () => {
  expect(caesarCipher("xyz", 3)).toBe("abc");
});
test("(2) HeLLo, 3 should return KhOOr", () => {
  expect(caesarCipher("HeLLo", 3)).toBe("KhOOr");
});
test("(3) loPpdD, 4 should return KhOOr", () => {
  expect(caesarCipher("loPpdD", 4)).toBe("psTthH");
});
test("(4) Hello, World!, 3 should return Khoor, Zruog!", () => {
  expect(caesarCipher("Hello, World!", 3)).toBe("Khoor, Zruog!");
});
test("(5) Hello, World! 444, 3 should return Khoor, Zruog! 444", () => {
  expect(caesarCipher("Hello, World! 444", 3)).toBe("Khoor, Zruog! 444");
});
