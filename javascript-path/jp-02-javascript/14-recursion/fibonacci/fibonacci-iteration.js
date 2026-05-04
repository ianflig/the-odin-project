// write a function fibs which takes a number and returns an array containing that many numbers from the Fibonacci sequence.

function fibs(n) {
  let array = [0, 1];
  let nextValue;

  for (let i = 0; i < n - 2; i++) {
    nextValue = array[i] + array[i + 1];
    array.push(nextValue);
  }
  return array;
}

console.log(fibs(8)); // should return [0, 1, 1, 2, 3, 5, 8, 13]
