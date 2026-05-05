// Write a function that takes in an arbitrarily deep array or object and returns the total number of integers stored inside this array or object.

export const totalIntegers = function (obj) {
  if (typeof obj !== "object" || obj === null) return;

  let total = 0;
  for (let number of Object.values(obj)) {
    if (Number.isInteger(number)) {
      total++;
    } else {
      if (typeof totalIntegers(number) === "number")
        total += totalIntegers(number);
    }
  }
  return total;
};

console.log(totalIntegers([[[5], 3], 0, 2, ["foo"], [], [4, [5, 6]]])); // returns 7
console.log(totalIntegers({ a: 1, b: { a: [5, 10], b: 11 } })); // returns 4
