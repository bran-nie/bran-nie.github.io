---
layout: post
title: 使用脚本生成新的博客文章，取代CV
categories: [Blog]
description:
keywords:
---

之前写过一篇文章，在[使用 node.js 创建一个属于你的命令](/2021/03/30/create-commands/)，美中不足的是，我很容易就忘记命令的参数，尽管我已经写了描述，但时隔几个月还是会忘记。

当我们使用 webpack、vite 等脚手架初始化项目时，那种交互式命令就很棒，于是我想，将生成博客的脚本更新为交互式的如何，于是查阅一番就开撸。

效果图：

![](/images/20220114180848.png)

#### 依赖：[inquirer.js](https://github.com/SBoudrias/Inquirer.js/)，[chalk](https://github.com/chalk/chalk/blob/main/source/utilities.js)

#### 代码：[GitHub](https://github.com/bran-nie/bran-nie.github.io/tree/master/script)
