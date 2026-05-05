// Build a function mergeSort that takes in an array and returns a sorted array, using a recursive merge sort methodology.

function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
}

console.log(mergeSort([])); // []
console.log(mergeSort([73])); // [73]
console.log(mergeSort([1, 2, 3, 4, 5])); // [1, 2, 3, 4, 5]
console.log(mergeSort([2, 1])); // [1, 2]
console.log(mergeSort([4, 2, 5, 1])); // [1, 2, 5]
// console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1])); // [0, 1, 1, 2, 3, 5, 8, 13]
// console.log(mergeSort([105, 79, 100, 110])) // [79, 100, 105, 110]
