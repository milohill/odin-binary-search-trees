const Node = require('./Node');

module.exports = function Tree() {
  const rootPointer = Node();
  rootPointer.left = null;
  // returns the root node of a tree

  const getRoot = () => rootPointer.left;

  const buildTree = (array) => {
    // base
    if (array.length <= 1) {
      const newNode = Node(array.pop());
      return newNode.data ? newNode : null;
      // if the length of the array is 0 then the data of the new node should return undefined
      // hence return null
    }

    const midIndex = Math.floor((array.length - 1) / 2);
    const root = Node(array[midIndex]);
    root.left = buildTree(array.slice(0, midIndex));
    root.right = buildTree(array.slice(midIndex + 1));

    rootPointer.left = root; // link the head node to the root pointer on its left pointer
    return root;
  };

  const insertValue = (value, root = getRoot()) => {
    if (!root) return;
    // if the head has not been assigned yet
    // if the traversal reaches a leaf node

    if (value === root.data) return;
    // prevent duplicate values

    if (value < root.data) {
      if (root.left === null) {
        root.left = Node(value);
      } else {
        insertValue(value, root.left);
      }
    } else if (root.right === null) {
      // the only condition here is that value > currentNode.data
      root.right = Node(value);
    } else {
      // if value > curNode.data && currentNode.right !== null
      insertValue(value, root.right);
    }
  };

  const deleteValue = (value, root = getRoot()) => {
    if (root.data > value) {
      root.left = deleteValue(value, root.left);
    } else if (root.data < value) {
      root.right = deleteValue(value, root.right);
    } else { // found the node
      // 1. root has one child or no children
      if (root.left === null) {
        return root.right;
      }
      if (root.right === null) {
        return root.left;
      }
      // 2. root has two children
      const findMinNode = (node) => {
        let temp = node;
        while (temp.left !== null) {
          temp = temp.left;
        }
        return temp;
      };
      const min = findMinNode(root.right);
      root.data = min.data;
      root.right = deleteValue(min.data, root.right);
    }
    return root;
  };

  const findValue = (value, root = getRoot()) => {
    // if there's no value matching
    if (root === null) {
      return null;
    }
    if (root.data > value) {
      return findValue(value, root.left);
    }
    if (root.data < value) {
      return findValue(value, root.right);
    }
    if (root.data === value) {
      return root;
    }
  };

  const getLevelOrder = (root = getRoot()) => {
    const queue = [];
    const array = [];
    queue.push(root);

    while (queue.length) {
      const node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);

      array.push(node.data);
    }

    return array;
  };

  const getInorder = (root = getRoot(), arr = []) => {
    if (!root) return;
    if (root.left) getInorder(root.left, arr);
    arr.push(root.data);
    if (root.right) getInorder(root.right, arr);
    return arr;
  };

  const getPreorder = (root = getRoot(), arr = []) => {
    if (!root) return;
    arr.push(root.data);
    if (root.left) getPreorder(root.left, arr);
    if (root.right) getPreorder(root.right, arr);
    return arr;
  };

  const getPostorder = (root = getRoot(), arr = []) => {
    if (!root) return;
    if (root.left) getPostorder(root.left, arr);
    if (root.right) getPostorder(root.right, arr);
    arr.push(root.data);
    return arr;
  };

  const getHeight = (root = getRoot(), num = -1) => {
    if (!root) return num;

    num += 1;
    let numL;
    let numR;

    if (root.left) numL = getHeight(root.left, num);
    if (root.right) numR = getHeight(root.right, num);

    return (numL >= numR ? numL : numR) || num;
  };

  const getDepth = (node, root = getRoot(), num = -1) => {
    if (!root) return num;

    const rootValue = root.data;
    const nodeValue = node.data;
    num += 1;

    if (rootValue > nodeValue) num = getDepth(node, root.left, num);
    if (rootValue < nodeValue) num = getDepth(node, root.right, num);
    if (rootValue === nodeValue) return num;
    return num;
  };

  const getIsBalanced = (root = getRoot()) => {
    if (!root) return true;

    const leftHeight = getHeight(root.left); // when the node is null, it returns -1
    const rightHeight = getHeight(root.right);
    const result = Math.abs(leftHeight - rightHeight) <= 1;

    return result && getIsBalanced(root.left) && getIsBalanced(root.right);
  };

  const rebalance = () => {
    if (!getRoot()) return;

    const arr = getInorder();
    const newRoot = buildTree(arr);
    rootPointer.left = newRoot;
    return newRoot;
  };

  return {
    getRoot,
    buildTree,
    insertValue,
    deleteValue,
    findValue,
    getLevelOrder,
    getInorder,
    getPreorder,
    getPostorder,
    getHeight,
    getDepth,
    getIsBalanced,
    rebalance,
  };
};
