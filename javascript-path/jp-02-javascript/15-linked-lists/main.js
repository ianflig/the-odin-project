import { LinkedLists } from "./script.js";

const list = new LinkedLists();

list.append("A");
list.append("B");
list.append("C");
list.append("D");
list.prepend(105);

console.log("Nodes:", list.toString());
console.log("Size:", list.size());
console.log("Head:", list.head());
console.log("Tail:", list.tail());
console.log("Node at index (1):", list.at(1));
console.log("Pop current Head ->", list.pop(), "-> New Head:", list.head());
console.log("Contains Node 'A'?:", list.contains("A"));
console.log("Find index from Node 'D':", list.findIndex("D"));
console.log(
  "Insert nodes '15' & 'Car' at index (2):",
  list.insertAt(2, 15, "Car"),
);
console.log("New nodes:", list.toString());
console.log("Remove node at index (3):", list.removeAt(3));
console.log("New nodes:", list.toString());
