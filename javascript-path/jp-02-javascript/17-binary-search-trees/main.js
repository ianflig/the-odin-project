import { Tree } from "./script.js";

// let test = new Tree([4, 2, 5, 6, 10, 2, 2, 48, 87, 12, 14]);
let test = new Tree([1, 2, 3]);
test.prettyPrint();
console.log("========================================================");
// test.insert(4);
// test.insert(6);
// test.insert(2.5);
// test.insert(1.5);
// test.insert(1.2);
// test.insert(0.5);
test.deleteItem();
test.prettyPrint();

const log = (value) => {
  return console.log(value);
};

test.levelOrderForEachIterative(log);
