const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

function Node(data) {
  return {
    data,
    left: null,
    right: null,
  };
}

function Tree() {
  let head; // a reference for the head to be utilized for few functions below

  const buildTree = (array) => {
    // base
    if (array.length <= 1) {
      const newNode = Node(array.pop());
      return newNode.data ? newNode : null;
    }

    const midIndex = Math.floor((array.length - 1) / 2);
    const newNode = Node(array[midIndex]);
    newNode.left = buildTree(array.slice(0, midIndex));
    newNode.right = buildTree(array.slice(midIndex + 1));

    head = newNode; // assign the head

    return newNode;
  };

  const insert = (value, curNode = head) => {
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

  const delete = (value, curNode = head) => {

  }

  return {
    buildTree,
    insert,
    delete
  };
}

const arr = [1, 23, 3, 324, 4, 4, 5, 6345, 67, 7, 7, 8, 9, 9].sort(
  (a, b) => a - b
);

const mainTree = Tree();
const temp = mainTree.buildTree(arr);
mainTree.insert(233);
prettyPrint(temp);
console.log(temp);
