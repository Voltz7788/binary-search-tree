// Sort array
function mergeSort(array) {
  const half = array.length / 2;

  // Base case or terminating case
  if (array.length < 2) {
    return array;
  }

  const left = array.splice(0, half);
  return merge(mergeSort(left), mergeSort(array));
}

function merge(left, right) {
  let arr = [];
  // Break out of loop if any one of the array gets empty
  while (left.length && right.length) {
    // Pick the smaller among the smallest element of left and right sub arrays
    if (left[0] < right[0]) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }

  // Concatenating the leftover elements
  // (in case we didn't go through the entire left or right array)
  return [...arr, ...left, ...right];
}

// Remove duplicates
function removeDuplicates(array) {
  return array.filter((item, index) => array.indexOf(item) === index);
}

class Node {
  constructor(data, leftChild, rightChild) {
    this.data = data;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    const sortedArray = removeDuplicates(mergeSort(array));
    const tree = this.createBST(sortedArray, 0, sortedArray.length);
    return tree;
  }

  createBST(array, start, end) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const treeRoot = array[mid];
    const subArray1 = array.slice(start, mid);
    const subArray2 = array.slice(mid + 1, end + 1);
    const subRootNode = new Node(
      treeRoot,
      this.createBST(subArray1, 0, subArray1.length - 1),
      this.createBST(subArray2, 0, subArray2.length - 1)
    );

    return subRootNode;
  }

  insert(newData, rootNode = this.root) {
    if (rootNode === null) {
      rootNode = new Node(newData, null, null);
      return rootNode;
    }
    if (rootNode.data > newData) {
      console.log(`${rootNode.data} greater than ${newData}`);
      rootNode.leftChild = this.insert(newData, rootNode.leftChild);
      return rootNode;
    }

    if (rootNode.data <= newData) {
      console.log(`${rootNode.data} less than (or =) ${newData}`);
      rootNode.rightChild = this.insert(newData, rootNode.rightChild);
      return rootNode;
    }
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.rightChild !== null) {
      this.prettyPrint(
        node.rightChild,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.leftChild !== null) {
      this.prettyPrint(
        node.leftChild,
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      );
    }
  }

  getTree() {
    this.prettyPrint(this.root);
    return this.root;
  }
}

const testData = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const myTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

console.log(myTree.getTree());
console.log(myTree.insert(24));
console.log(myTree.getTree());
