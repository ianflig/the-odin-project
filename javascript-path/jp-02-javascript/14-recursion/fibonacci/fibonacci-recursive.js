function fibsRec(n) {
  if (n === 1) {
    return [0];
  }
  if (n === 2) {
    return [0, 1];
  }
  let result = fibsRec(n - 1);

  result.push(result.at(-2) + result.at(-1));

  return result;
}
console.log("--- RECURSIVE FIBONACCI ---");
console.log("fibsRec(8) ->");
console.log(fibsRec(8)); //[0, 1, 1, 2, 3, 5, 8, 13]
console.log("---------------------------");
