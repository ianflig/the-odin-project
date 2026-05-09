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
  }

  toString() {
    let string = this.head;
    return string;
  }
}
