---
layout: post
title: 获取对象的键值类型
categories: [JavaScript]
description: 获取对象的键值类型
keywords: 获取对象的键值类型
---

keyof 运算符可以是生成对象键值字面量的并集。
typeof 运算符可以引用变量或属性的类型。
const 断言可以防止文字类型被扩展。
type ValueOf<T> = T[keyof T]，通用的获取对象键值联合类型的方式，前提是相关对象使用了 const 断言，否则会被扩展为键值类型的联合类型。
