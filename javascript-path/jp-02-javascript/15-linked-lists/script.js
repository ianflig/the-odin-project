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

    while (lastNode.nextNode) {
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
    let size = 0;

    while (currentNode) {
      size++;
      currentNode = currentNode.nextNode;
    }

    return size;
  }

  head() {
    let head = !this._head ? undefined : this._head.value;

    return head;
  }

  tail() {
    let currentNode = this._head;
    let tail;

    while (currentNode.nextNode) {
      currentNode = currentNode.nextNode;
    }

    tail = !currentNode ? undefined : currentNode.value;

    return tail;
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
