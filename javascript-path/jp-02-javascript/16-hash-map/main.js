import { HashMap } from "./script.js";

const test = new HashMap(16);

test.set("apple", "red");
test.set("apple", "green");
test.set("Rama", "test");
test.set("Sita", "value");
console.log(test.buckets);
console.log(test.size);
