import { HashMap } from "./script.js";

const test = new HashMap(16);

test.set("apple", "red");
test.set("apple", "green");
test.set("Rama", "test");
test.set("Sita", "value");
test.set("Sita", "test");
console.log(test.buckets);
console.log(test.size);
console.log(test.get("Sita"));
