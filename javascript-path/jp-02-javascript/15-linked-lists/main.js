import { LinkedLists } from "./script.js";

const list = new LinkedLists();

list.append("A");
list.append("B");
list.append("C");
list.append("D");
list.prepend("Prepend");

console.log("Nodes:", list.toString());
console.log("Size:", list.size());
console.log("Head:", list.head());
console.log("Tail:", list.tail());
console.log("Node at given index:", list.at(1));
