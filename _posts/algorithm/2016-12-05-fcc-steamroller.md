---
layout: post
title: Fcc --- steamrollArray
categories: [Algorithm]
description: some word here
keywords: keyword1, keyword2
---

## 题目描述

> 对嵌套的数组进行扁平化处理。你必须考虑到不同层级的嵌套。如果你被卡住了，
>
> ​ 记得开大招 Read-Search-Ask。尝试与他人结伴编程、编写你自己的代码。

> 提供的资源:
>
> [Array.isArray()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)

## 题目解析

### 理解题意

何为扁平化处理.

如 steamrollArray([[[\"a\"]], [[\"b\"]]]) 应该返回 ["a", "b"] 就是把数组中空的值, 嵌套的值等等最终返回一个只有一层的数组. 既完成了 Fcc 的挑战.

### 前期思考

1. 数组遍历, 需要使用什么方法. 不止一个哦. 除了 for 循环
2. 检查这个元素, 做判断嘛.
    1. 是数组, 要继续扁平化, 可以跳到思考 1 需要用到递归或者另一种多维度数组的处理方法.
    2. 不是数组, 添加到结果数组中. \*这里的结果数组需要在函数内定义还是全局定义呢? 见下面同学示例.
3. 编写代码 , 想好了, 那就实践吧, 即使出现了 bug.

### 代码示范

**一个同学的代码示例**

```javascript
let newArr = []; //定义全局结果数组
function steamrollArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        // 循环遍历`当前传入数组`元素   注意是当前传入数组袄
        if (Array.isArray(arr[i]))
            // 如果是元素是数组而不是值,  那就条件为真
            steamrollArray(arr[i]);
        // 这里用了递归的方法 循环调用
        else newArr.push(arr[i]); //不是数组, 就push到结果数组里
    }
    return newArr;
}
steamrollArray([1, [2], [3, [[[4]]]]]);
```

返回结果是

```javascript
[1, 2, 3, 4];
```

但并没有通过这道题. 为什么呢?

在题中调用两次 steamrollArray 后,

```javascript
steamrollArray([1, [2], [3, [[[4]]]]]);
// [1, 2, 3, 4]
steamrollArray([[['a']], [['b']]]);
// [1, 2, 3, 4, 'a', 'b']
```

结果却不是我们想要的 ["a", "b"] 而是[1,2,3,4,"a", "b"] 为什么会把上一次调用的结果也 push 到了 结果数组中了?

代码分析
原因就是, 在上面那个同学的代码中, 他的结果数组: newArr 是在全局定义的! 这也就导致, 他的结果数组保存着所有的调用 steamrollArray 函数的值. 所以这样当然不会通过测试啦~

那机智如你会想到把结果数组定义到函数内, 但是当我们要扁平化的是多维数组时, 它就出现了只有第一个元素的尴尬现象.

What the hall???

so, 这个时候, 你可以了解 [javascript 的闭包函数](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)了, 同学们点击左侧链接, 跳转, 查看什么是闭包及其原理和应用.

一定去看袄.

以及, 这一题我也用了闭包, 在看完阮一峰老师的闭包讲解后, 可以先尝试着修改代码. 也可以查看我的, 分析示例. 我有写注释. 据说代码写注释是一个好习惯, 请问这个据说对不对 >.< ~~~

**我的代码示例**

```javascript
function steamrollArray(arr) {
    // I'm a steamrollArray, baby
    var result = []; //定义结果数组
    function steam(ifArr) {
        // 定义内部函数.
        if (Array.isArray(ifArr)) {
            return ifArr.forEach(function (val) {
                //我这里用了forEach 循环数组, 想知道它的详情, 下面有链接.
                return steam(val); // 递归调用 steam函数.
            });
        } else result.push(ifArr);
    }

    steam(arr); //调用函数,

    return result; // 返回结果数组
}

steamrollArray([1, [2], [3, [[[4]]]]]);
steamrollArray([[['a']], [['b']]]);
```

这样, 就算我在代码中调用了两次 steamrollArray 函数. 还是只有最后一次调用的结果.

这就是闭包的魅力

资源汇总
题目提供的判断是否为数组的 Array.isArray()

代码中涉及到的 [递归 递归](http://www.ruanyifeng.com/blog/2015/04/tail-call.html) PS: 这里还对递归的缺点进行了讲解, 优化.

代码中涉及到的 [闭包 闭包函数](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html) o_o

[原题中文版链接](https://learn.freecodecamp.one/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/steamroller)

[原题英文版链接](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/steamroller)

## 最后

![](/images/blog/fcc_success.png)
