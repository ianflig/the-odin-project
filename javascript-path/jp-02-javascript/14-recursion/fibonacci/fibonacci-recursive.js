function fibsRec(n) {
  if (n === 1) {
    return [0];
  }
  if (n === 2) {
    return [0, 1];
  }
  let result = fibsRec(n - 1);

  result.push(result[n - 3] + result[n - 2]);

  return result;
}

console.log(fibsRec(8)); //[0, 1, 1, 2, 3, 5, 8, 13]
