function Node(data) {
  return {
    data,
    left: null,
    right: null,
  };
}

module.exports = function Tree() {
  const rootPointer = Node();
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

  return {
    getRoot,
    buildTree,
    insertValue,
    deleteValue,
    findValue,
  };
};