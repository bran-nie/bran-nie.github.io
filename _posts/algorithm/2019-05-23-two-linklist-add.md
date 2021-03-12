---
layout: post
title: 两个链表相加
categories: [Algorithm]
description: LinkList
keywords: LinkList
---

## 题目

英文题目：[Add Two Numbers](https://leetcode.com/problems/add-two-numbers/)

中文题目：[Add Two Numbers](https://leetcode-cn.com/problems/add-two-numbers/)

## 分析及思路

参数：两个非空的链表，里面的值是非负的值，且不会以 0 开头，是一个数的倒序，之所以倒序，是因为单向链表是从头到尾的。

要求：两个链表的值相加，得到一个新的链表。

那么，需要考虑的点有：

-   两个链表依次向下取值，所以 L1 = L1.next，这样的往尾部走，直到 null。
-   取到的值，是在 0-9 之内，相加可能会溢出，所以要有变量保存进位值。
-   如果结果链表是用新链表 L3，那么每次得到相加的数字后，添加到新链表内。
-   如果结果链表是 L1 或 L2，那么每次相加得到的数字，赋值给 L1 和 L2 的当前值，不过要用变量记录它们哪个长度长。
-   两种方式同样需要一个指针，指向当前节点。
-   特殊情况：
    -   两个链表加到最后，进位还有值，
    -   两个链表长度相差比较大，前面几个都已经计算完毕，可以提前 return，如 101 + 1239483838483884839，

## 代码设计

### 方式一：新链表 L3

```javascript
var addTwoNumbers = function (l1, l2) {
    // 初始化 进位变量、结果链表L3、L3当前节点指针cur，两数相加的和 变量
    let carry = 0,
        l3 = new ListNode(null),
        cur = l3,
        sum = 0;

    // 用while是因为不知道链表的长度，while可以根据条件来判断。
    while (l1 || l2) {
        // 当两个链表都到尾部时，退出循环
        // 定义局部变量sum，初始化为carry值。
        sum = carry;
        if (l1) {
            // 如果carry为0，l2 到尾部，且 上次计算的和也是空值，则满足上面第6.2点，可以提前退出。下同。
            if (!carry && !l2 && !sum) {
                cur.next = l1;
                break;
            }
            sum += l1.val;
            l1 = l1.next; // 将链表l1向下走一个节点。
        }
        if (l2) {
            if (!carry && !l1 && !sum) {
                cur.next = l2;
                break;
            }
            sum += l2.val;
            l2 = l2.next;
        }

        carry = sum > 9 ? 1 : 0; // 判断两数相加是否需要进位。
        cur.next = new ListNode(sum % 10); // L3的指针，当前节点的next属性赋值，
        cur = cur.next; // 将指针指向新的节点。即链表下移。
        sum = 0; // init  sum
    }
    if (carry) {
        // 特殊情况 6.1，如果最后还有carry，则对链表进行添加
        cur.next = new ListNode(carry);
    }
    return l3.next;
};

// 结果
// Runtime: 100 ms, faster than 99.49 % of JavaScript online submissions for Add Two Numbers.
// Memory Usage: 38.4 MB, less than 66.58% of JavaScript online submissions for Add Two Numbers.
```

### 方式二：取 L1 或 L2

这个方法和上面的类似，但有麻烦很多，当然我一开始想到的是这个。但不推荐这种方式。hhh

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

var addTwoNumbers = function (l1, l2) {
    let carry = 0,
        m = 0,
        n = 0,
        cur_l1 = l1,
        cur_l2 = l2,
        sum = 0;
    while (!(cur_l1 === null && cur_l2 === null)) {
        sum = carry;

        if (cur_l1 && cur_l2) {
            m++;
            n++;

            sum += cur_l1.val + cur_l2.val;
            carry = sum > 9 ? 1 : 0;
            cur_l1.val = cur_l2.val = sum % 10;

            cur_l1 = cur_l1.next;
            cur_l2 = cur_l2.next;
        } else if (!cur_l2) {
            m++;
            if (!carry) break;

            sum += cur_l1.val;
            carry = sum > 9 ? 1 : 0;
            cur_l1.val = sum % 10;

            cur_l1 = cur_l1.next;
        } else if (!cur_l1) {
            n++;
            if (!carry) break;

            sum += cur_l2.val;
            carry = sum > 9 ? 1 : 0;
            cur_l2.val = sum % 10;

            cur_l2 = cur_l2.next;
        }
    }
    // 计算

    if (carry) {
        m >= n
            ? listPush(l1, new ListNode(carry))
            : listPush(l2, new ListNode(carry));
    }
    if (cur_l1 && !cur_l2) {
    }
    if (!cur_l1 && cur_l2) {
    }

    return m >= n ? l1 : l2;
};

function listPush(list, item) {
    let cur = list;
    while (cur.next !== null) {
        cur = cur.next;
    }
    cur.next = item;

    return list;
}

// Runtime: 124 ms, faster than 88.59% of JavaScript online submissions for Add Two Numbers.
// Memory Usage: 39.1 MB, less than 18.25% of JavaScript online submissions for Add Two Numbers.
```
