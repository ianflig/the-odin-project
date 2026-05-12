import { HashMap } from "./script.js";

const test = new HashMap(16);

// console.log(test.buckets);
// console.log(test.hash("Sara"));
test.set("apple", "red");
// console.log(test.buckets);
test.set("apple", "red");
console.log(test.buckets);
