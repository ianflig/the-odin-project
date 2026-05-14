import { Tree } from "./script.js";

let test = new Tree([4, 2, 5, 6, 10, 2, 2, 48, 87, 12, 14]);
// let test = new Tree([1, 2, 3]);
test.prettyPrint();
console.log(test.includes(12));
