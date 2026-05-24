class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor(arr) {
    this.root = this.#buildTree(this.#clearArr(arr));
  }

  #buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;

    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(arr[mid]);

    root.left = this.#buildTree(arr, start, mid - 1);
    root.right = this.#buildTree(arr, mid + 1, end);

    return root;
  }

  //# buildTree() helper
  #clearArr(arr) {
    let sortedArr = arr.sort((a, b) => a - b);
    let cleanArr = [...new Set(sortedArr)];
    return cleanArr;
  }

  // deleteItem() helper
  #getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }

    return curr;
  }

  // prettyPrint imported from odin
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }

    this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }

  // check if tree contains a value
  includes(value, node = this.root) {
    if (!node) return false;
    if (value === node.data) return true;

    return value > node.data
      ? this.includes(value, node.right)
      : this.includes(value, node.left);
  }

  // insert new node with a given value
  insert(value, node = this.root) {
    if (!this.root) {
      return (this.root = new Node(value));
    }
    if (node && value === node.data) return node;
    if (!node) return new Node(value);

    value > node.data
      ? (node.right = this.insert(value, node.right))
      : (node.left = this.insert(value, node.left));

    return node;
  }

  deleteItem(value, node = this.root) {
    if (!value) return;
    if (node === null) return node;

    if (node.data > value) {
      node.left = this.deleteItem(value, node.left);
    } else if (node.data < value) {
      node.right = this.deleteItem(value, node.right);
    } else {
      // case 1 (node has no children) & case 2 (node has 1 children)
      if (node.left === null) {
        return node.right;
      }
      if (node.right === null) {
        return node.left;
      }

      // case 3 (node has two children)
      let succ = this.#getSuccessor(node);
      node.data = succ.data;
      node.right = this.deleteItem(succ.data, node.right);
    }
    return node;
  }

  // traversal the Tree in breadth-first level order -- ITERATIVE
  levelOrderForEachIterative(callback) {
    if (typeof callback !== "function")
      throw new Error("No callback specified");
    if (!this.root) return;

    let queue = [];
    queue.push(this.root);

    while (queue.length !== 0) {
      let curr = queue[0];
      callback(curr.data);
      if (curr.left !== null) queue.push(curr.left);
      if (curr.right !== null) queue.push(curr.right);
      queue.shift();
    }
  }
}
