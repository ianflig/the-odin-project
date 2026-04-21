// function that takes an array of numbers and returns an object with the following properties: average, min, max, and length

export function analizeArray(array) {
  return {
    average: getAverage(array),
  };
}

function getAverage(array) {
  return array.reduce((total, num) => total + num, 0) / array.length;
}
