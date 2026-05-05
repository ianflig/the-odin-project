// Write a function that searches for a value in a nested object. It returns true if the object contains that value.
// Objects are compared by reference.

export const contains = function (obj, value) {
  if (obj === value || (Number.isNaN(obj) && Number.isNaN(value))) {
    return true;
  }

  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  for (let object of Object.values(obj)) {
    if (contains(object, value)) {
      return true;
    }
  }

  return false;
};

console.log(contains({ foo: "foo" }, "bar")); // false
console.log(contains({ foo: { bar: "bar" } }, "bar")); // true
