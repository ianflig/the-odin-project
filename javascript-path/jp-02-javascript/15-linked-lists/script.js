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
    string = `Removed: ${value}`;

    if (this._head) {
      this._head = this._head.nextNode;
    }

    return string;
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

  findIndex(value) {
    let currentNode = this._head;
    let indexFound = -1;
    let currentIndex = 0;

    while (currentNode) {
      if (currentNode.value === value) {
        indexFound = currentIndex;
      }
      currentNode = currentNode.nextNode;
      currentIndex++;
    }

    return indexFound;
  }

  insertAt(index, ...values) {
    let rangeError = new Error("Range Error");
    if (index < 0) return rangeError;

    let currentNode = this._head;
    let previousNode;
    let array = [...values];
    let currentIndex = 0;

    while (currentIndex !== index && currentNode) {
      previousNode = currentNode;
      currentNode = currentNode.nextNode;
      currentIndex++;
    }

    if (index > currentIndex) {
      return rangeError;
    }

    if (index === 0) {
      array.reverse();
      array.forEach((ele) => this.prepend(ele));
      return "Nodes Inserted";
    }

    if (index !== 0) {
      array.forEach((ele, ind) => {
        let newNode = new Node(ele);
        if (ind === array.length - 1) {
          previousNode.nextNode = newNode;
          newNode.nextNode = currentNode;
        } else {
          previousNode.nextNode = newNode;
          previousNode = newNode;
        }
      });
    }

    return "Nodes Inserted";
  }

  removeAt(index) {
    let rangeError = new Error("Range Error");
    if (index < 0) return rangeError;

    let currentNode = this._head;
    let previousNode;
    let currentIndex = 0;

    while (currentIndex !== index && currentNode) {
      previousNode = currentNode;
      currentNode = currentNode.nextNode;
      currentIndex++;
    }

    if (index > currentIndex || !currentNode) {
      return rangeError;
    }

    if (index === 0) {
      this.pop();
      return "Node removed";
    }

    previousNode.nextNode = currentNode.nextNode;

    return "Node removed";
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
