import Tree from "./tree.js";

const bst = new Tree();

bst.buildTree([1, 7, 4, 4, 5, 8, 6, 2, 9]);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

bst.insert(3);
bst.delete(5);

prettyPrint(bst.root);

console.log(bst.levelOrder());
console.log(bst.preorder());
console.log(bst.inorder());
console.log(bst.postorder());
console.log(bst.height());
console.log(bst.isBalanced());
bst.rebalance();

prettyPrint(bst.root);
