class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

export class LinkedLists {
  constructor() {
    this._head = null;
  }

  append(value) {
    let newNode = new Node(value);
    let lastNode = this._head;

    if (this._head === null) {
      this._head = newNode;
      return;
    }

    while (lastNode.nextNode !== null) {
      lastNode = lastNode.nextNode;
    }

    lastNode.nextNode = newNode;
  }

  prepend(value) {
    let newNode = new Node(value);
    newNode.nextNode = this._head;
    this._head = newNode;
  }

  size() {
    let currentNode = this._head;
    let counter = 0;

    while (currentNode) {
      counter++;
      currentNode = currentNode.nextNode;
    }

    return counter;
  }

  head() {
    let value = !this._head ? undefined : this._head.value;

    return value;
  }

  toString() {
    let string = "";
    let currentNode = this._head;

    while (currentNode) {
      string += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.nextNode;
    }

    return string + "null";
  }
}
