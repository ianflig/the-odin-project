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

  #clearArr(arr) {
    let sortedArr = arr.sort((a, b) => a - b);
    let cleanArr = [...new Set(sortedArr)];
    return cleanArr;
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

  includes(value, node = this.root) {
    if (!node) return false;
    if (value === node.data) return true;

    return value > node.data
      ? this.includes(value, node.right)
      : this.includes(value, node.left);
  }

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
    if (node === null) return node;

    if (node.data > value) {
      node.left = this.deleteItem(value, node.left);
    } else if (node.data < value) {
      node.right = this.deleteItem(value, node.right);
    } else {
      if (node.left === null) {
        return node.right;
      }
      if (node.right === null) {
        return node.left;
      }
    }
    return node;
  }
}
