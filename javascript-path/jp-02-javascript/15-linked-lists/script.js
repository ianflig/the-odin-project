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

    if (!currentNode) return;

    while (currentNode.nextNode) {
      currentNode = currentNode.nextNode;
    }

    tail = currentNode.value;

    return tail;
  }

  at(index) {
    let currentNode = this._head;
    let currentIndex = 0;
    let value;

    while (index !== currentIndex && currentNode) {
      currentNode = currentNode.nextNode;
      currentIndex++;
    }

    if (!currentNode) return;

    value = currentNode.value;

    return value;
  }

  //remove the head node only
  pop() {
    let value;
    let string;

    value = !this._head ? undefined : this._head.value;
    string = `Head Node removed: ${value}`;

    if (this._head) {
      this._head = this._head.nextNode;
    }

    return console.log(string);
  }

  contains(value) {
    let currentNode = this._head;
    let contains = false;

    while (currentNode) {
      if (value === currentNode.value) {
        contains = true;
      }
      currentNode = currentNode.nextNode;
    }

    return contains;
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
