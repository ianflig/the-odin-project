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
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }

    return hashCode;
  }

  set(key, value) {
    let hashKey = this.hash(key);

    // JS limitation
    if (hashKey < 0 || hashKey >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.buckets[hashKey] === null) {
      let linkedList = new LinkedList();
      linkedList.append(key, value);
      this.buckets[hashKey] = linkedList;
      return this.size++;
    }

    let node = this.buckets[hashKey].findKeyNode(key);

    if (node) {
      return (node.value = value);
    }

    this.buckets[hashKey].append(key, value);
    this.size++;

    if (this.size > this.buckets.length * this.loadFactor) {
      return this.resize();
    }
  }

  get(key) {
    let hashKey = this.hash(key);

    // JS limitation
    if (hashKey < 0 || hashKey >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    let bucket = this.buckets[hashKey];
    let node = bucket ? bucket.findKeyNode(key) : null;

    return node ? node.value : null;
  }

  has(key) {
    let hashKey = this.hash(key);

    // JS limitation
    if (hashKey < 0 || hashKey >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    let bucket = this.buckets[hashKey];
    let node = bucket ? bucket.findKeyNode(key) : null;

    return node ? true : false;
  }

  remove(key) {
    let hashKey = this.hash(key);

    let bucket = this.buckets[hashKey];
    let node = bucket ? bucket.remove(key) : undefined;

    if (node === "isOnlyOne") {
      this.buckets[hashKey] = null;
      return true;
    }

    return node ? true : false;
  }

  length() {
    return this.size;
  }

  values() {
    let arr = [];

    this.buckets.forEach((ele) => {
      if (ele) {
        ele.getAllValues(arr);
      }
    });

    return arr;
  }

  entries() {
    let arr = [];

    this.buckets.forEach((ele) => {
      if (ele) {
        ele.getAllEntries(arr);
      }
    });

    return arr;
  }

  resize() {
    let oldBuckets = this.buckets;

    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;

    oldBuckets.forEach((ele) => {
      if (ele) {
        this.rehash(ele._head);
      }
    });
  }

  rehash(ele) {
    let currentNode = ele;

    while (currentNode) {
      this.set(currentNode.key, currentNode.value);
      currentNode = currentNode.nextNode;
    }
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

  remove(key) {
    let currentNode = this._head;
    let previousNode;

    while (currentNode && currentNode.key !== key) {
      previousNode = currentNode;
      currentNode = currentNode.nextNode;
    }

    if (!currentNode) return;

    if (currentNode.key === this._head.key && currentNode.nextNode) {
      this._head = currentNode.nextNode;
      return true;
    }

    if (currentNode.key === this._head.key && !currentNode.nextNode) {
      return "isOnlyOne";
    }

    if (currentNode.key === key) {
      previousNode.nextNode = currentNode.nextNode;
    }

    return true;
  }

  findKeyNode(key) {
    let currentNode = this._head;

    while (currentNode && currentNode.key !== key) {
      currentNode = currentNode.nextNode;
    }

    return currentNode && currentNode.key === key ? currentNode : null;
  }

  getAllValues(arr) {
    let currentNode = this._head;

    while (currentNode) {
      arr.push(currentNode.value);
      currentNode = currentNode.nextNode;
    }
  }

  getAllEntries(arr) {
    let currentNode = this._head;

    while (currentNode) {
      arr.push([currentNode.key, currentNode.value]);
      currentNode = currentNode.nextNode;
    }
  }
}

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
}
