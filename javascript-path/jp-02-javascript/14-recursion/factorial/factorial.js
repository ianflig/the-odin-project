// Write a recursive factorial function that takes a non-negative integer, and returns the product of all positive integers less than or equal to the input integer. An input of 0 should return 1. The function should only accept numbers, so '4' should not be accepted as it is a string. All invalid inputs should return undefined.

export const factorial = function (number) {
  // no need to do "if number is 1 return number", it's covered with 0 validation
  if (number === 0) {
    return 1;
  }
  if (number < 0 || !Number.isInteger(number)) {
    return undefined;
  }
  return number * factorial(number - 1);
};

console.log(factorial(5)); // 5 * 4 * 3 * 2 * 1, Output: 120
console.log(factorial(0)); // Output: 1
console.log(factorial(7.2)); // Output: undefined
console.log(factorial("4")); // Output: undefined
