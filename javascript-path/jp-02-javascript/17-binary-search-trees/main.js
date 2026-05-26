import { Tree } from "./script.js";

let test = new Tree([4, 2, 5, 6, 10, 2, 2, 48, 87, 12, 14]);
// let test = new Tree([1, 2, 3, 4, 5, 6, 7, 8]);
// let test = new Tree([1, 2, 3]);
test.prettyPrint();
console.log("========================================================");
// test.insert(4);
// test.insert(6);
// test.insert(2.5);
// test.insert(1.5);
// test.insert(1.2);
// test.insert(0.5);
test.deleteItem();
// test.prettyPrint();

const log = (value) => {
  return console.log(value);
};

// test.levelOrderForEachIterative(log);
// test.levelOrderForEachRecursive(log);
// test.inOrderForEach(log);
// test.preOrderForEach(log);
// test.postOrderForEach(log);
// console.log(test.height(4));
// console.log(test.depth(7));
test.insert(88);
test.insert(89);
test.prettyPrint();
console.log(test.isBalanced());
