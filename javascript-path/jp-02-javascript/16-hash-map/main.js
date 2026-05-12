import { HashMap } from "./script.js";

const test = new HashMap(16);

test.set("apple", "red");
test.set("apple", "green");
console.log(test.buckets);
