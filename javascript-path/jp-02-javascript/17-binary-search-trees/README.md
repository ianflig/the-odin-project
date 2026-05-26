<h1 align="center">
  Binary Search Tree
</h1>

<div align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)

</div>

[screenshot]: ./screenshot.png "preview"

![preview][screenshot]

**_DESCRIPTION_**: this repo has a custom Binary Search Tree (BST) data structure built from scratch. The main focus of this project was to wrap my head around recursion and understand how tree traversal algorithms actually work under the hood. To achieve this, the implementation includes logic to build a balanced tree from a raw array, several traversal methods (Breadth-First and Depth-First), and a check to see if the tree is balanced, along with a function to rebalance it if it gets too one-sided after modifying its data.

Tree methods:

- `insert(value)` - adds a new node containing the given value to the tree.
- `deleteItem(value)` - removes a node from the tree, handling cases for nodes with 0, 1, or 2 children.
- `find(value)` - returns the specific node containing the given value.
- `includes(value)` - returns true or false based on whether or not the value exists in the tree.
- `levelOrderForEachIterative(callback) / levelOrderForEachRecursive(callback)` - traverses the tree in breadth-first level order and provides each node's value to a callback function.
- `inOrderForEach(callback)` - depth-first traversal (left, root, right).
- `preOrderForEach(callback)` - depth-first traversal (root, left, right).
- `postOrderForEach(callback)` - depth-first traversal (left, right, root).
- `height(value)` - returns the given node's height (number of edges in the longest path to a leaf node).
- `depth(value)` - returns the given node's depth (number of edges from the main root to the node).
- `isBalanced()` - returns true or false depending on whether the difference between heights of left and right subtrees of every node is not more than 1.
- `rebalance()` - grabs the current unbalanced tree and rebuilds it into a balanced one.
- `prettyPrint()` - console helper function to visually print the tree structure.
