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
}
