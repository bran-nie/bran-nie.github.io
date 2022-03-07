---
layout: post
title: 个人理解的 js 中的防抖和节流，通俗易懂
categories: [JavaScript]
description: 个人理解的js中的防抖和节流，通俗易懂
keywords: 个人理解的js中的防抖和节流，通俗易懂
---

防抖、节流，本质上是为了减少高频事件的触发次数，在实现上是使用闭包、定时器两个技术，在规定时间内对事件回调函数的触发情况进行限制。

## 何时用防抖，何时用节流

我的理解是看**高频事件与触发动作之间的关系**来决定用防抖还是节流，如果有依赖关系就是节流，比如 window resize，没有依赖关系，则是防抖，比如输入框输入事件。

## 防抖实现

```javascript
function debounce(fn, delay = 300) {
    // 创建一个闭包变量，也是用于接收定时器API的返回值
    let timer = null;
    return (...args) => {
        // 如果有旧的定时器，则清除掉
        if (timer) {
            clearTimeout(timer);
        }
        // 定义新的计时器
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// 创建一个防抖函数实例
const fn = debounce(console.log, 300);

for (let i = 0; i < 10; i++) {
    fn(i); // 9
}
// 这里，fn函数实际上只真正执行一次，前面9次的执行，都被 clearTimeout 了。
```

## 节流实现

```javascript
function throttle(fn, delay = 300) {
    // 创建一个闭包变量
    let timer = null;
    // 返回一个函数，即通过 throttle 创建的节流实例，
    return (...args) => {
        // 实例被事件触发
        // 如果没有等待执行的事件，则用定时器在规定时间内执行一次事件。
        // 如果有在执行的事件，则本次触发，不做响应。
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args);
                clearTimeout(timer);
                // 执行完后将 timer 重置，这样就可以接收下一次事件触发
                timer = null;
            }, delay);
        }
    };
}

const fn = throttle(console.log, 1000);
let count = 0;

const timer = setInterval(() => {
    console.log('interval... 300ms');
    fn('throttle... 1000ms');

    count++;
    if (count > 20) {
        clearInterval(timer);
    }
}, 300);
```

在节流函数实例中，我们用计时器来进行验证，高频事件(300ms 触发一次)，节流函数是 1000ms 内触发一次，符合我们的预期

![](/images/20220215120157.png)

<!-- 不过相比于防抖函数的纯粹，节流函数还有个区别在于，节流函数有触发方式从而有两种写法：在规定时间段内，是时间段开始时触发，还是时间段结束时触发(根据传入参数来判断)。上面的代码，是在开始时触发的。我们修改一下代码把 count 打印一下就可知了。
![](/images/20220215120844.png)
那如果是时间段结束时触发怎么写呢？

```javascript
function throttle(fn, delay = 300) {
    // 创建一个闭包变量
    let prevTime = new Date();
    return (...args) => {
        const now = new Date();
        if (now - prevTime > delay) {
            fn.apply(this, args);
            prevTime = now;
        }
    };
}

const fn = throttle(console.log, 1000);
let count = 0;

const timer = setInterval(() => {
    console.log('interval... 300ms', count);
    fn('throttle... 1000ms', count);

    count++;
    if (count > 20) {
        clearInterval(timer);
    }
}, 300);
``` -->

## 两者的相同点与不同点

### 相同点

在不影响用户体验的前提下，将高频触发的事件，通过“闭包、定时器”实现次数缩减，避免大量的计算导致性能变差，影响用户体验。

### 不同点

防抖：将多次执行的事件，变为距离上次触发的时间段内的最后一次执行。
节流：将多次执行的事件，变为时间段内的一次执行。
