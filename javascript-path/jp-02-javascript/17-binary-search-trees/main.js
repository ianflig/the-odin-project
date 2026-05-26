import { Tree } from "./script.js";

let arr = [4, 2, 5, 6, 10, 2, 2, 48, 87, 12, 14, 80, 33, 24, 56];
let tempArr = [];

let test = new Tree(arr);

console.log("Created Tree from array -> ", arr);

console.log("Tree is balanced?: ", test.isBalanced());

test.levelOrderForEachIterative((value) => {
  tempArr.push(value);
});
console.log("Printing all values in Level-order: ", tempArr.join(" - "));

tempArr = [];
test.preOrderForEach((value) => {
  tempArr.push(value);
});
console.log("Printing all values in Pre-order: ", tempArr.join(" - "));

tempArr = [];
test.inOrderForEach((value) => {
  tempArr.push(value);
});
console.log("Printing all values in In-order: ", tempArr.join(" - "));

tempArr = [];
test.postOrderForEach((value) => {
  tempArr.push(value);
});
console.log("Printing all values in Post-order: ", tempArr.join(" - "));

console.log("Inserting new values: 102, 250, 140, 432, 190, 233");
test.insert(102);
test.insert(250);
test.insert(140);
test.insert(432);
test.insert(190);
test.insert(233);

console.log("Tree is balanced?: ", test.isBalanced());

console.log("Rebalancing tree");
test.rebalance();

console.log("Tree is balanced?: ", test.isBalanced());

tempArr = [];
test.levelOrderForEachIterative((value) => {
  tempArr.push(value);
});
console.log("Printing all values in Level-order: ", tempArr.join(" - "));

tempArr = [];
test.preOrderForEach((value) => {
  tempArr.push(value);
});
console.log("Printing all values in Pre-order: ", tempArr.join(" - "));

tempArr = [];
test.inOrderForEach((value) => {
  tempArr.push(value);
});
console.log("Printing all values in In-order: ", tempArr.join(" - "));

tempArr = [];
test.postOrderForEach((value) => {
  tempArr.push(value);
});
console.log("Printing all values in Post-order: ", tempArr.join(" - "));

console.log("Pretty print of final tree");
test.prettyPrint();
