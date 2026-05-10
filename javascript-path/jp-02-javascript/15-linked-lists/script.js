class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

export class LinkedLists {
  constructor() {
    this.head = null;
  }

  append(value) {
    let newNode = new Node(value);

    if (this.head === null) {
      this.head = newNode;
      return;
    }

    let lastNode = this.head;

    while (lastNode.nextNode !== null) {
      lastNode = lastNode.nextNode;
    }

    lastNode.nextNode = new Node(value);
  }

  toString() {
    let string = "";
    let currentNode = this.head;
    while (currentNode) {
      string += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.nextNode;
    }

    return string + "null";
  }
}
