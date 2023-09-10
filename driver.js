const Tree = require('./Tree');
const getPrettyPrint = require('./PrettyPrint');
const getRandomArrayBelow100 = require('./RandomArrayGeneratorBelow100');
const getRandomArrayAbove100 = require('./RandomArrayGeneratorAbove100');

const foo = getRandomArrayBelow100(20);
const arr1 = [...new Set(foo)].sort((a, b) => (a - b));

const bar = getRandomArrayAbove100(10);
const arr2 = [...new Set(bar)].sort((a, b) => (a - b));

const bst = Tree();
bst.buildTree(arr1);
console.log('balanced?:', bst.getIsBalanced());
console.log('---');
console.log(bst.getLevelOrder());
console.log(bst.getPreorder());
console.log(bst.getPostorder());
console.log(bst.getInorder());
console.log('---');
while (arr2.length) {
  bst.insertValue(arr2.pop());
}
console.log(bst.getIsBalanced());
getPrettyPrint(bst.getRoot());
console.log('---');
bst.rebalance();
console.log(bst.getIsBalanced());
getPrettyPrint(bst.getRoot());
