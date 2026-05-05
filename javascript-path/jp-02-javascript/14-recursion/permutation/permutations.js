// Write a function that takes in an empty array or an input array of consecutive positive integers, starting at 1, and returns an array of all possible permutations of the original array.

// The integers will not repeat.
export function permutations(array) {
  if (array.length === 0) {
    return [[]];
  }
  if (array.length === 1) {
    return [array];
  }

  let result = [];

  for (let i = 0; i < array.length; i++) {
    const currentValue = [array[i]];
    const remainingValues = array.slice(0, i).concat(array.slice(i + 1));
    const valuesPermuted = permutations(remainingValues);
    for (let j = 0; j < valuesPermuted.length; j++) {
      const permutedArray = currentValue.concat(valuesPermuted[j]);
      result.push(permutedArray);
    }
  }
  return result;
}

console.log(permutations([1, 2, 3])); // [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
console.log(permutations([])); // [[]]
