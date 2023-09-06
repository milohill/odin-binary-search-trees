const tree = require('./tree');

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 32, 10, 999, 87, 23, 12, 65, 90, 55];
testArr.sort((a, b) => (a - b));
const refinedArr = [...new Set(testArr)];

const bst = tree();
bst.buildTree(refinedArr);
console.log(bst.getHeight());

prettyPrint(bst.getRoot());
