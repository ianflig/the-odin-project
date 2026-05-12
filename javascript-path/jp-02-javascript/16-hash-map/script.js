export class HashMap {
  constructor(capacity = 16) {
    this.loadFactor = 0.75;
    this.capacity = capacity;
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    let hashKey = this.hash(key);

    if (this.buckets[hashKey] === null) {
      let linkedList = new LinkedList();
      linkedList.append(key, value);
      this.buckets[hashKey] = linkedList;
      return;
    }

    this.buckets[hashKey].append(key, value);
  }
}

class LinkedList {
  constructor() {
    this._head = null;
  }

  append(key, value) {
    let newNode = new Node(key, value);
    let currentNode = this._head;

    if (this._head === null) {
      this._head = newNode;
      return;
    }

    while (currentNode.nextNode) {
      currentNode = currentNode.nextNode;
    }

    currentNode.nextNode = newNode;
  }
}

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
}
