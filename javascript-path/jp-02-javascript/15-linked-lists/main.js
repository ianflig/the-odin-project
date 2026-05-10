import { LinkedLists } from "./script.js";

const list = new LinkedLists();

list.append("A");
list.append("B");
list.append("C");
list.append("D");
list.prepend("Prepend");

console.log(list.toString());
