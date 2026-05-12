import { HashMap } from "./script.js";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(
  "Used buckets:",
  test.length(),
  "- Total Buckets:",
  test.buckets.length,
);
console.log("Entries:");
console.log(test.entries());
console.log("");
console.log("Adding entry ('moon', 'silver') to trigger growth");
test.set("moon", "silver");
console.log("");
console.log(
  "Used buckets:",
  test.length(),
  "- Total Buckets:",
  test.buckets.length,
);
console.log("New entries (resized):");
console.log(test.entries());
console.log("");
console.log(
  "remove('moon'):",
  test.remove("moon"),
  "- new used capacity:",
  test.length(),
);
console.log(
  "remove('lion'):",
  test.remove("lion"),
  "- new used capacity:",
  test.length(),
);
console.log(
  "Used buckets:",
  test.length(),
  "- Total Buckets:",
  test.buckets.length,
);
