---
layout: post
title: 树的遍历  - - 前中后序，层序遍历。
categories: [Algorithm]
description: 树的遍历  - - 前中后序，层序遍历。
keywords: 树的遍历  - - 前中后序，层序遍历。
---

树这种数据结构，通常在业务中用不到，但有些情景下，它能给我们带来更高的效率，比如最近帮女票写一个流程图的功能，这就用到了 N 叉树这种结构了。那么，作为基础操作中的遍历，我们怎么实现呢？

## 何为“树”

首先，先让我们了解一下树这种数据结构是什么？

> 维基百科：
>
> 在计算机科学中，树（英语：tree）是一种抽象数据类型（ADT）或是实现这种抽象数据类型的数据结构，用来模拟具有树状结构性质的数据集合。它是由 n（n>0）个有限节点组成一个具有层次关系的集合。把它叫做“树”是因为它看起来像一棵倒挂的树，也就是说它是根朝上，而叶朝下的。它具有以下的特点：
>
> -   每个节点都只有有限个子节点或无子节点；
> -   没有父节点的节点称为根节点；
> -   每一个非根节点有且只有一个父节点；
> -   除了根节点外，每个子节点可以分为多个不相交的子树；
> -   树里面没有环路(cycle)

[维基百科详细介绍](<https://zh.wikipedia.org/wiki/%E6%A0%91_(%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84)>)

![一棵树](https://raw.githubusercontent.com/bran-nie/blog_images/images/20220225163751.png)

如图所示，树会有一个**根结点**，接着下面会有子节点，而子节点也可以有自己的子节点，这样，就像是一棵树一样。或者，像是家族谱。

## 手写一个简单树

```javascript
class TreeNode {
    constructor(data) {
        this.data = data || null;
        this.leftChild = null;
        this.rightChild = null;
    }
}

class Tree {
    constructor(rootData) {
        this.rootData = rootData;
        this.root = new TreeNode(rootData);
    }

    init() {
        this.root = new TreeNode(this.rootData);
    }

    setFullTree(depth) {
        const foo = (tree, _depth) => {
            if (_depth > depth) return;

            tree.leftChild = new TreeNode(_depth);
            tree.rightChild = new TreeNode(_depth);
            foo(tree.leftChild, _depth + 1);
            foo(tree.rightChild, _depth + 1);
        };

        foo(this.root, 2);
    }

    // 先序遍历
    preorder() {
        const result = [];
        const preorderFn = (tree) => {
            if (tree === null) return;
            // push
            result.push(tree.data);
            preorderFn(tree.leftChild);
            preorderFn(tree.rightChild);
        };
        preorderFn(this.root);
        console.log(result);
    }
    // 中序遍历
    inorder() {
        const result = [];
        const inorderFn = (tree) => {
            if (tree === null) return;
            inorderFn(tree.leftChild);
            // push
            result.push(tree.data);
            inorderFn(tree.rightChild);
        };
        inorderFn(this.root);
        console.log(result);
    }
    // 后序遍历
    postorder() {
        const result = [];
        const postorderFn = (tree) => {
            if (tree === null) return;
            postorderFn(tree.leftChild);
            postorderFn(tree.rightChild);
            // push
            result.push(tree.data);
        };

        postorderFn(this.root);
        console.log(result);
    }
    // 层序遍历
    levelorder() {
        const queue = [];
        const result = [];
        if (this.root !== null) {
            queue.push(this.root);
            while (queue.length !== 0) {
                let node = queue.shift();
                result.push(node.data);
                node.leftChild && queue.push(node.leftChild);
                node.rightChild && queue.push(node.rightChild);
            }
        }

        console.log(result);
    }

    // 先序遍历 非递归 采用栈的方式
    preorderStack() {
        const result = [];
        const stack = [];
        let p = null;
        if (this.root !== null) {
            p = this.root;
            while (p !== null || stack.length > 0) {
                if (p !== null) {
                    stack.push(p);
                    result.push(p.data);
                    p = p.leftChild;
                } else {
                    p = stack.pop();
                    p = p.rightChild;
                }
            }
        }

        console.log(result);
    }

    // 获取树的高度
    height() {
        const getTreeHeight = (tree) => {
            let l = 0,
                r = 0;
            if (tree === null) return 0;
            l = getTreeHeight(tree.leftChild);
            r = getTreeHeight(tree.rightChild);

            return 1 + (l > r ? l : r);
        };

        return getTreeHeight(this.root);
    }

    createTree(preArr, inArr) {
        const create = (preArr, inArr, i, j, m, n) => {
            if (n < 0) return null;
            // 创建根节点
            const tree = new TreeNode(preArr[i]);
            let k = m;
            // 在中序列中找到根节点
            while (k <= n && preArr[i] !== inArr[k]) {
                k++;
            }
            // 如果 i 大于 中序列长度
            if (k > n) return null;
            tree.leftChild = create(preArr, inArr, i + 1, i + k - m, m, k - 1);
            tree.rightChild = create(preArr, inArr, i + k - m + 1, j, k + 1, n);

            return tree;
        };

        this.root = create(preArr, inArr, 0, preArr.length - 1, 0, inArr.length - 1);
    }
}
let tree = new Tree();
// let tree = new Tree('A');
// tree.setFullTree(3);

// tree.root.leftChild = new TreeNode('B');
// tree.root.leftChild.leftChild = new TreeNode('D');
// tree.root.leftChild.rightChild = new TreeNode('E');
// tree.root.leftChild.rightChild.leftChild = new TreeNode('G');

// tree.root.rightChild = new TreeNode('C');
// tree.root.rightChild.rightChild = new TreeNode('F');

// tree.preorder();
// tree.inorder();
// tree.postorder();
// tree.levelorder();
// tree.height();
tree.createTree(['A', 'B', 'D', 'E', 'G', 'C', 'F'], ['D', 'B', 'G', 'E', 'A', 'C', 'F']);
```

## 几种遍历的简单速记

关于遍历，这里可以分成两个类型，一个是前中后序，一个是层序

### 前中后序遍历

**使用递归来对树的每一个节点进行访问，递归终止条件就是传入的节点是`null`**

这三种遍历方式唯一的区别就在于：**取值和递归调用的时机。**

```javascript
const result = [];
const dfs = (tree) => {
    if (tree === null) return;
    // result.push(tree.data);  在这里取值，就是前序
    dfs(tree.leftChild);
    // result.push(tree.data);  在这里取值，就是中序
    dfs(tree.rightChild);
    // result.push(tree.data);  在这里取值，就是后序
};

dfs(this.root);
console.log(result);
```

### 层序遍历

而层序遍历，则可以用递归或者队列来实现

其中，递归方式：

## 结语
