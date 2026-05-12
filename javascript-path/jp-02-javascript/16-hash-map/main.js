import { HashMap } from "./script.js";

const test = new HashMap(16);

test.set("apple", "red");
test.set("apple", "green");
test.set("Rama", "test");
test.set("Sita", "value");
test.set("Sita", "test");
// console.log(test.buckets);
console.log(test.get("Sita"));
console.log(test.has("Rama"));
test.set("New Key", "randomValue");
// console.log(test.buckets);
console.log(test.size);
test.set("New Key", "updateValue");
console.log(test.buckets);
console.log(test.get("Sita"));
