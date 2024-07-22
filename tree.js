import Node from "./node.js";

export default class Tree {
  constructor() {
    this.root = null;
  }

  buildTree(array) {
    if (array.length < 1) return null;

    const newArr = [...new Set(array)].sort((a, b) => a - b);

    let start = 0;
    let end = newArr.length - 1;

    const mid = Math.floor((start + end) / 2);
    const node = new Node(newArr[mid]);

    node.left = this.buildTree(newArr.slice(0, mid));
    node.right = this.buildTree(newArr.slice(mid + 1));

    this.root = node;

    return this.root;
  }

  insert(value) {
    let root = this.root;
    let node = new Node(value);

    if (root === null) {
      root = node;
      return;
    }

    let prev = null;
    let temp = root;

    while (temp != null) {
      if (value < temp.data) {
        prev = temp;
        temp = temp.left;
      } else if (value > temp.data) {
        prev = temp;
        temp = temp.right;
      }
    }

    if (value < prev.data) prev.left = node;
    if (value > prev.data) prev.right = node;
  }
}
