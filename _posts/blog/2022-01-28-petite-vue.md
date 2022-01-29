---
layout: post
title: Petite-vue，尤大几个月前的悄悄写的 mini-vue，项目实践一下
categories: [Blog]
description: Petite-vue, vue, vue 3
keywords: Petite-vue, vue, vue 3
---

几个月前，尤大开整了一个轻量级的 vue，之前看到过，大致看一遍点了个 star 后，就没再看了，前几天要为运营写一个处理数据的小工具，也就一个页面，再 vite 一个项目不值得，写原生吧，感觉麻烦的，忽然就想到了之前看到的 petite-vue 了，这个约 6kb 的渐进增强的 vue 替代版，那不是妥妥的合适吗。

没想到短短几个月，这 star 量蹭蹭的涨，尤大不愧是前端巨擎 hhh
![](/images/20220128161542.png)

## 介绍

> 官方简介：petite-vue 是为[渐进增强](https://developer.mozilla.org/zh-CN/docs/Glossary/Progressive_Enhancement){:target='\_blank'}优化的 Vue 的替代发行版。它提供与标准 Vue 相同的模板语法和反应性思维模型。但是，它专门针对在由服务器框架呈现的现有 HTML 页面上“散布”少量交互进行了优化。
>
> 也就是说，petite-vue，它在提供 vue 基本功能的同时，还能一个轻量级，简单应用的微框架，这样也能保证开发者有一个不错的使用体验。

-   只有~6kb
-   Vue 兼容的模板语法
-   基于 DOM，就地变异
-   通过驱动@vue/reactivity

## 用法

<script src="https://unpkg.com/petite-vue@0.4.1/dist/petite-vue.iife.js"></script>

### 1. 超级简单的 CDN 加载和使用

```html
<script src="https://unpkg.com/petite-vue" defer init></script>

<!-- anywhere on the page -->
<div v-scope="{ count: 0 }">
    { { count }}
    <button @click="count++">inc</button>
</div>
```

-   v-scope 标记页面，这里用 petite-vue 进行渲染，同时，也是声明 data 和 methods。
-   script 的 defer 属性使脚本在 HTML 内容被解析后执行。
-   script 的 init 属性告诉 petite-vue 自动查询和初始化页面上的所有元素 v-scope。
    -   这里的 init 其实也就是 `PetiteVue.createApp().mount()` 的简洁写法；
    -   阅读源码可知，
        -   const s = document.currentScript;
        -   if (s && s.hasAttribute('init')) {
        -                                   createApp().mount();
        -   }
    -   如果不想自动初始化，那么移除 init 属性，且在 script 标签中，增加 `PetiteVue.createApp().mount()`。
    -   当然，如果目标浏览器支持模块引用的话，也可以使用 ES 模块构建

```html
<script type="module">
    import { createApp } from 'https://unpkg.com/petite-vue?module';
    createApp().mount();
</script>
```

**重点：在开发时期，CDN 地址可以是`https://unpkg.com/petite-vue`这样简短的，但对于生产使用时，应该要使用完整解析的 CDN URL。**

**如：`https://unpkg.com/petite-vue@0.4.1/dist/petite-vue.iife.js` 或者 `https://unpkg.com/petite-vue@0.4.1/dist/petite-vue.es.js`(ES 模块引用时)，避免解析和重定向文本之外，还有避免版本不同导致项目出现意外情况**

> 使用终端命令可以快速简单下载代码到本地
>
> curl https://unpkg.com/petite-vue@0.4.1/dist/petite-vue.iife.js --output petite-vue@0.4.1-iife.js

### 2. Root Scope：设置数据表达式的根范围

`createApp()`，它接收一个数据对象作为根范围中的变量，供模版中使用。

```html
<script type="module">
    import { createApp } from 'https://unpkg.com/petite-vue?module';

    createApp({
        count: 0,
        // getters
        get plusOne() {
            return this.count + 1;
        },
        increment() {
            this.count++;
        },
    }).mount();
</script>

<!-- v-scope value can be omitted -->
<div v-scope>
    <p>{{ count }}</p>
    <p>{{ plusOne }}</p>
    <button @click="increment">increment</button>
</div>
```

这样，在模版中就可以使用 `count` 变量、`increment` 方法了，

### 3. mount()：挂载元素

`mount()`没有传入挂载元素时，Petite-vue 作用于整个页面，但当传入挂载元素时，那么仅作用于挂载元素及其内的元素。

这也意味着，我们可以在同一页面挂载多个 Petite-vue 应用，每一个应用都有其独立的根变量范围。

```javascript
createApp({
    // root scope for app one
}).mount('#app1');

createApp({
    // root scope for app two
}).mount('#app2');
```

### 4. 生命周期

在 petite-vue 中，可以监听每一个元素的挂载和卸载事件。

在 v0.4.0 开始，绑定生命周期事件需要加上 `@vue:`前缀。

```html
<!-- v0.4.0 以下 -->
<div v-if="show" @mounted="console.log('mounted on: ', $el)" @unmounted="console.log('unmounted: ', $el)">
    some node
</div>

<!-- v0.4.0 以上 -->
<div v-if="show" @vue:mounted="console.log('mounted on: ', $el)" @vue:unmounted="console.log('unmounted: ', $el)">
    some node
</div>
```

### 5. 组件

麻雀虽小，五脏俱全，那 mini-vue，它的组件是怎样的呢？

组件有两种方式来创建，分别是 纯数据的函数组件 和 带有模板的函数组件，那让我们来简单写一下看看吧～

使用组件，是需要在元素中用 `v-scope` 来调用函数。

#### 函数组件

```html
<script type="module">
    import { createApp } from 'https://unpkg.com/petite-vue?module';

    function Counter(props) {
        return {
            count: props.initialCount,
            inc() {
                this.count++;
            },
            mounted() {
                console.log(`I'm mounted!`);
            },
        };
    }

    createApp({
        Counter,
    }).mount();
</script>

<div v-scope="Counter({ initialCount: 1 })" @vue:mounted="mounted">
    <p>{{ count }}</p>
    <button @click="inc">increment</button>
</div>

<div v-scope="Counter({ initialCount: 2 })">
    <p>{{ count }}</p>
    <button @click="inc">increment</button>
</div>
```

#### 带有模板的函数组件

如果还需要模板的话，相比函数组件是多了一个字段来声明模板：`$template`，该字段的值可以是一个模板字符串，也可以是 `<template>`元素的 ID 选择器。(推荐用`template`元素)。

```html
<script type="module">
    import { createApp } from 'https://unpkg.com/petite-vue?module';

    function Counter(props) {
        return {
            $template: '#counter-template',
            // $template: `
            //         My count is {{count}}
            //         <button @click="inc">+aaa+</button>
            //         `,
            count: props.initialCount,
            inc() {
                this.count++;
            },
        };
    }

    createApp({
        Counter,
    }).mount();
</script>

<template id="counter-template">
    My count is {{ count }}
    <button @click="inc">++</button>
</template>

<!-- reuse it -->
<div v-scope="Counter({ initialCount: 1 })"></div>
<div v-scope="Counter({ initialCount: 2 })"></div>
```

### 6. 全局状态管理

没错，即便是简单的 mini-vue，也可以有全局状态管理。这里使用的是 vue3 的 reactive API，来实现全局状态管理。

```html
<script type="module">
    import { createApp, reactive } from 'https://unpkg.com/petite-vue?module';

    const store = reactive({
        count: 0,
        inc() {
            this.count++;
        },
    });

    // manipulate it here
    store.inc();

    createApp({
        // share it with app scopes
        store,
    }).mount();
</script>

<div v-scope="{ localCount: 0 }">
    <p>Global {{ store.count }}</p>
    <button @click="store.inc">increment</button>

    <p>Local {{ localCount }}</p>
    <button @click="localCount++">increment</button>
</div>
```

### 7. 指令

#### 内置指令

-   v-model
-   v- if / else / else-if
-   v-for
-   v-show
-   v-on(别名：@)
-   v-bind(别名：:)
-   v- html / text / pre
-   v-once
-   v-cloak (可用来配合 css 做未渲染时隐藏)

#### 自定义指令

petite-vue 的自定义指令与 vue 有些不同，那么，怎么注册一个指令。

-   指令声明：一个函数， `const myDirective = (ctx) => {}`;
    -   ctx 是一个对象，里面有`el, arg, get, effect`等属性，具体可以[参考文档](https://github.com/vuejs/petite-vue#custom-directives){:target='\_blank'}或者[阅读源码](https://github.com/vuejs/petite-vue/blob/main/src/directives/index.ts){:target='\_blank'}
    -   函数 return，是在指令卸载时候会触发。
-   注册指令：`createApp().directive('dir-name', dirFn).mount()`

v-html 指令的实现

```javascript
const html = ({ el, get, effect }) => {
    // effect, 每次 get() 更改后就会执行
    effect(() => {
        el.innerHTML = get();
    });
};
```

### 8. 自定义模板

这个可以通过给 createApp 的配置项增加属性 `$delimiters: ['${', '}']`，来实现，通常，在服务器端模板语言一起使用时比较有用。

## 实践

这里写了一个[小工具](https://www.makex.cc/en/learn-center-game-create-data){:target='\_blank'}，是用来给运营修改某个页面的数据，支持数据的导入导出，新增编辑。

## 总结 & 最后

总的来说，petite-vue 这个项目，挺适合简单页面搭建，用不到 vue、react 等这些偏大的前端框架。

既有着 vue 的开发体验，也能不增加项目的复杂度，简直是一个完美的体验。

最后，在春节假期里，可以以这个小项目来看看尤大的源码、代码思想等等，真香 hhh，年后再写一篇 Petite-vue 源码阅读系列的博客吧～～
