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
    let lastNode = this.head;

    if (this.head === null) {
      this.head = newNode;
      return;
    }

    while (lastNode.nextNode !== null) {
      lastNode = lastNode.nextNode;
    }

    lastNode.nextNode = newNode;
  }

  prepend(value) {
    let newNode = new Node(value);
    newNode.nextNode = this.head;
    this.head = newNode;
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
