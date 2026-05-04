function fibsRec(n) {
  if (n < 2) {
    return n;
  } else {
    return fibsRec(n - 1) + fibsRec(n - 2);
  }
}

console.log(fibsRec(5)); //[0, 1, 1, 2, 3, 5, 8, 13]
