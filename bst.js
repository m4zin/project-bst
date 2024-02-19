function Node(data) {
    this.data = data;
    this.left = null;
    this.right = null;
}

function sortAndUnique(arr) {
    if (arr.length === 0) {
        return arr;
    }
    arr = arr.sort(function (a, b) { return a - b; });
    let ret = [arr[0]];
    for (let i = 1; i < arr.length; i++) { //Start loop at 1: arr[0] can never be a duplicate
        if (arr[i-1] !== arr[i]) {
            ret.push(arr[i]);
        }
    }
    return ret;
}

function buildTree(arr, start, end) {
    // Base case
    if(start > end) {
        return null
    }

    let mid = Math.floor((start + end) / 2)
    let node = new Node(arr[mid])
    node.left = buildTree(arr, start, mid - 1)
    node.right = buildTree(arr, mid + 1, end)

    return node
}

function insertNode(root, value) {
    if(root === null) {
        root = new Node(value)
        return root
    }

    if(value < root.data) {
        root.left = insertNode(root.left, value)
    } else if(value > root.data) {
        root.right = insertNode(root.right, value)
    }

    return root
}

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

// The array
let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
let sortedArr = sortAndUnique(arr)

// Building the tree.
let root = buildTree(sortedArr, 0, sortedArr.length - 1)

console.log('Before insertion:')
prettyPrint(root)

//Inserting a value into the tree.
insertNode(root, 15)

console.log('After insertion:')
prettyPrint(root)




