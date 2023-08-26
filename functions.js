function Node(data) {
  return {
    data,
    left: null,
    right: null,
  };
}

module.exports = function Tree() {
  let root;
  // returns the root node of a tree

  const buildTree = (array) => {
    // base
    if (array.length <= 1) {
      const newNode = Node(array.pop());
      return newNode.data ? newNode : null;
      // if the length of the array is 0 then the data of the new node should return undefined
      // hence return null
    }

    const midIndex = Math.floor((array.length - 1) / 2);
    const newNode = Node(array[midIndex]);
    newNode.left = buildTree(array.slice(0, midIndex));
    newNode.right = buildTree(array.slice(midIndex + 1));

    root = newNode; // assign the head

    return newNode;
  };

  const insert = (value, curNode = root) => {
    if (!curNode) return; // if the head has not been assigned yet

    if (value === curNode.data) return; // prevent duplicate values

    if (value < curNode.data) {
      if (curNode.left === null) {
        curNode.left = Node(value);
      } else {
        insert(value, curNode.left);
      }
    } else if (curNode.right === null) {
      // the only condition here is that value > curNode.data
      curNode.right = Node(value);
    } else {
      // if value > curNode.data && curNode.right !== null
      insert(value, curNode.right);
    }
  };

  return {
    buildTree,
    insert,
  };
};
