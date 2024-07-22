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

  delete(value, root = this.root) {
    if (root === null) return root;

    if (value < root.data) root.left = this.delete(value, root.left);
    else if (value > root.data) root.right = this.delete(value, root.right);
    //if value is same as root's data, then this is the node that need to be deleted
    else {
      if (root.left === null) return root.right;
      else if (root.right === null) return root.left;

      //node with two children: get the inorder successor (smallest in the right subtree)
      root.data = this.minValue(root.right);

      //delete the inorder successor
      root.right = this.delete(root.data, root.right);
    }

    return root;
  }

  minValue(node) {
    let minV = node.data;
    while (node.left !== null) {
      minV = node.left.data;
      node = node.left;
    }

    return minV;
  }

  find(value, root = this.root) {
    const node = root;

    if (node === null) return null;
    if (value !== node.data) {
      return value < node.data
        ? this.find(value, node.left)
        : this.find(value, node.right);
    }

    return node;
  }

  levelOrder(callback) {
    if (!this.root) return [];

    const queue = [];
    const result = [];

    queue.push(this.root);

    while (queue.length) {
      let level = [];
      let size = queue.length;

      for (let i = 0; i < size; i++) {
        const nextNode = queue.shift();
        level.push(nextNode.data);

        if (nextNode.left) queue.push(nextNode.left);
        if (nextNode.right) queue.push(nextNode.right);
        if (callback) callback(nextNode);
      }

      result.push(level);
    }

    if (!callback) return result;
  }

  preorder(callback) {
    if (!this.root) return [];

    const stack = [];
    const result = [];

    stack.push(this.root);

    while (stack.length) {
      const nextNode = stack.pop();

      if (nextNode.right) stack.push(nextNode.right);
      if (nextNode.left) stack.push(nextNode.left);
      if (callback) callback(nextNode);

      result.push(nextNode.data);
    }

    if (!callback) return result;
  }

  inorder(callback, node = this.root, result = []) {
    if (!this.root) return [];
    if (node === null) return;

    this.inorder(callback, node.left, result);
    callback ? callback(node) : result.push(node.data);
    this.inorder(callback, node.right, result);

    if (result) return result;
  }
}
