---
layout: post
title: 算法题：根据运算优先级添加括号
categories: [Algorithm]
description: 算法题：根据运算优先级添加括号
keywords: 算法题：根据运算优先级添加括号
---

根据运算优先级添加括号，现已知一个字符串是由正整数和加减乘除四个运算符`+ - \* /`组成。例如存在字符串 `const str = '11+2-3*4+5/2*4+10/5'`，现在需要将高优先级运算，用小括号包裹起来，例如结果为 `'11+2-(3*4)+(5/2*4)+(10/5)'`。注意可能会出现连续的乘除运算，需要包裹到一起。

请用 javascript 实现这一过程

## 根据规则，一次遍历实现。

```javascript
function addBrackets(str) {
    let left = false,
        prevNum = '';

    let ans = '';

    const isNumber = (c) => /\d/.test(c);
    const isNeedQ = (c) => /[\*\/]/.test(c);
    const isNotNeedQ = (c) => /[\+\-]/.test(c);

    for (let c of str) {
        if (isNumber(c)) {
            prevNum = prevNum ? prevNum + c : c;
            continue;
        }

        // 当前没有左括号时，
        if (!left) {
            // 遇到需要左括号的字符，即 * /；
            if (isNeedQ(c)) {
                ans += `(${prevNum}${c}`;
                left = true;
            } else {
                ans += `${prevNum}${c}`;
            }
        } else {
            // 已经有左括号了，那么遇到 + -，则添加右括号
            if (isNotNeedQ(c)) {
                ans += `${prevNum})${c}`;
                left = false;
            } else {
                ans += `${prevNum}${c}`;
            }
        }
        // 重置上一个数
        prevNum = '';
    }

    // 最后的判断
    prevNum && (ans += prevNum);
    left && (ans += ')');

    return ans;
}

addBrackets('11+2-3*4+5/2*4+10/5');
```

## 暗黑操作

```javascript
function addBrackets(str) {
    return str
        .split('-')
        .map((item) => {
            if (item.includes('+')) {
                return item
                    .split('+')
                    .map((val) => {
                        if (val.includes('*') || val.includes('/')) {
                            return `(${val})`;
                        }
                        return val;
                    })
                    .join('+');
            } else {
                return item;
            }
        })
        .join('-');
}
```
