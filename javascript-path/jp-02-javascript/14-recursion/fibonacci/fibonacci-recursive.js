function fibsRec(n) {
  if (n === 1) {
    return 0;
  }
  if (n === 2) {
    return 1;
  }
  return fibsRec(n - 1) + fibsRec(n - 2);
}

console.log(fibsRec(8)); //[0, 1, 1, 2, 3, 5, 8, 13]
