import { LinkedLists } from "./script.js";

const list = new LinkedLists();

list.append("A");
list.append("B");
list.append("C");
list.append("D");
list.prepend("Head");

console.log("Nodes:", list.toString());
console.log("Size:", list.size());
console.log("Head:", list.head());
console.log("Tail:", list.tail());
console.log("Node at given index:", list.at(1));
list.pop();
console.log("New Head:", list.head());
console.log("Contains Node 'A'?:", list.contains("A"));
console.log("Find index from Node 'D':", list.findIndex("D"));
console.log(
  "Insert nodes '15', 'Car' at index (1):",
  list.insertAt(5, 15, "Car"),
);
console.log("Nodes:", list.toString());
