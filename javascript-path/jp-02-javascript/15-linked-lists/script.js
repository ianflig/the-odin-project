class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

export class LinkedLists {
  constructor() {
    this.nodeHead = null;
  }

  append(value) {
    let newNode = new Node(value);
    let lastNode = this.nodeHead;

    if (this.nodeHead === null) {
      this.nodeHead = newNode;
      return;
    }

    while (lastNode.nextNode !== null) {
      lastNode = lastNode.nextNode;
    }

    lastNode.nextNode = newNode;
  }

  prepend(value) {
    let newNode = new Node(value);
    newNode.nextNode = this.nodeHead;
    this.nodeHead = newNode;
  }

  size() {
    let currentNode = this.nodeHead;
    let counter = 0;

    while (currentNode) {
      counter++;
      currentNode = currentNode.nextNode;
    }

    return counter;
  }

  head() {
    let value = !this.nodeHead ? undefined : this.nodeHead.value;

    return value;
  }

  toString() {
    let string = "";
    let currentNode = this.nodeHead;

    while (currentNode) {
      string += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.nextNode;
    }

    return string + "null";
  }
}
