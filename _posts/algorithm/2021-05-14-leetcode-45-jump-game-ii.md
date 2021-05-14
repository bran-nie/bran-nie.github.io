---
layout: post
title: Leetcode-45 -- 跳跃游戏II
categories:
description:
keywords:
---

贪心算法，通过局部最优解得到全局最优解。

## 题目

> 给定一个非负整数数组，你最初位于数组的第一个位置。
>
> 数组中的每个元素代表你在该位置可以跳跃的最大长度。
>
> 你的目标是使用最少的跳跃次数到达数组的最后一个位置。
>
> 假设你总是可以到达数组的最后一个位置。
>
> 示例 1:
>
> 输入: [2,3,1,1,4]
>
> 输出: 2
>
> 解释: 跳到最后一个位置的最小跳跃数是 2。
>   从下标为 0 跳到下标为 1 的位置，跳  1  步，然后跳  3  步到达数组的最后一个位置。
>
> 示例 2:
>
> 输入: [2,3,0,1,4]
>
> 输出: 2

## 解题思路

### 读题

1. 可以得出数组元素值表示可以跳跃的次数，也就是可以前进的次数。
2. 在元素 nums[i] 处跳跃时，可以选择不跳完。即 元素值是 4，可以跳跃 4 次，但跳跃 2 次后，可以选择更大的数字重新跳跃。

### 思路

1. 一次跳跃，因为可以选择不跳跃完，那就是在跳跃的过程中，要求出跳跃路径上，是否有比跳跃完更好的选择，如果有，就放弃之前的跳跃，从更好的选择开始新的出发。
2. 可以将数组的开始到最后，一次次跳跃拆分出来，每次只处理一次跳跃的情况。即编写一个`nextIndex`函数，它接受两个参数`nums`和`index`，分别是跳跃的数组与跳跃的起始位置，返回值则是下一个跳跃位置。函数内部就会计算跳跃过程中性价比最高的下个跳跃位置。
3. 有了`nextIndex`函数，我们就可以通过`while`循环，判断`index`是否为最后一个元素下标来决定跳跃情况。
4. `nextIndex`函数需要注意的情况是：如果起跳位置`index`可以跳到终点，则无需再做贪心算法，直接返回终点下标即可。

## 代码

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
    /**
     *
     * @param {number[]} nums
     * @param {number} index
     * @return {number}
     */
    const nextIndex = (nums, index) => {
        let cur = nums[index];
        // 当传入下标值可以跳到最后时，直接返回
        if (cur + index >= nums.length - 1) {
            return nums.length - 1;
        } else if (cur === 1) {
            return index + 1;
        }
        // 差值：下一个值减去传入下标值跳跃后的剩余值
        let difference = 0,
            max = {}; // 用来存放最大的差值及其所属下标
        // 传入下标值可以跳跃的时候
        while (cur > 0) {
            // 跳跃一次，值减 1，index + 1
            cur--;
            index++;
            difference = nums[index] - cur;
            // max 若存在，则判断当前 index 的差值是否是最大的。不存在则初始化。
            max = max.difference ? (max.difference > difference ? max : { index, difference }) : { index, difference };
        }
        return max.index;
    };
    // 初始化数组下标，跳跃次数
    let index = 0,
        count = 0;
    // 当数组下标不是最后一个下标时，表明还可以继续跳跃。
    while (index < nums.length - 1) {
        index = nextIndex(nums, index);
        count++;
    }
    return count;
};
```

## AC

![](/images/blog/algorithm/leetcode-45ac.png)
