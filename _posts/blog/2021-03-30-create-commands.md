---
layout: post
title: 使用 node.js 创建一个属于你的命令
categories: [Blog]
description: 创建一个属于你的命令
keywords: 创建一个属于你的命令, 'commander.js', 'node.js'
---

> 这是一个小工具，可以解放我们的双手，将那些重复性的工作，让机器用工具化的方式来处理。
> 偷懒真是一种生产力呀，因为不想手洗衣服，于是洗衣机出现了，于是自动刷碗机出现了。

> 这篇文章讲了什么？
>
> 1. 讲述了博主从零到一，怎么实现了命令来新建博客文章的。
> 2. 作为参照吧，希望这篇文章能激发读者的想象力，写一个命令也是简单的，或许什么时候，你也有了类似的需求了呢？

## 起因

看一个文章，其中看到一个问题：**脚手架怎么搭建？**自己想了一下，大概就是利用命令，操作文件。随后搜索看看，是这个大致方向。

然后呢，突然想到我的博客，现在写文章有个不友好的地方，就是写新的文章时，我每次都是要手动新建一个文件，复制其他博客的顶部文章信息(layout、title、categories 那些)，总之是有些繁琐。

而之前用 hexo 写博客时，是通过命令行来新建文章的。

于是乎，这个脚手架的概念，也可以运用到我的博客上面。

## 需求整理

借鉴 <a href='https://hexo.io/zh-cn/docs/commands#new' target='_blank'>Hexo 的 new 命令使用</a>，那我想要的自定义命令，也就是输入路径、文件名、文章 title、等这些参数，来生成一个带有头信息的空 md 文件。格式大概如：

```bash
$: yarn bran new [layout] --path blog <filename> [title]
```

命令参数描述如下图所示：「之前在草稿纸上写的参数描述不见了，这是写好后的命令 help 文档」

![](/images/blog/create-commands_1.png)

![](/images/blog/create-commands_2.png)

## 功能拆分与规划

### 功能拆分

1. 解析命令
2. 符合标准 则继续执行 - N 打印帮助信息，退出。
3. 目录已存在 则继续执行 - N 打印帮助信息，退出。
    - 读取模板文件，正确读取， 则继续执行 - N 打印错误信息，退出。
    - 读取待生成文件，若命令没带 -r，且文件已存在，打印帮助信息，退出。
4. 根据命令参数创建文件。
5. 打印成功信息，结束。

### 规划开发功能所需环境 & 工具

-   环境的话，我们是基于`node.js`来开发的。PS：我的 node 版本是：`12.16.1`，可用`nvm`进行 node.js 版本管理。
-   工具这块，经过一番了解，有这么几个不错的工具：
    -   <a href='https://github.com/tj/commander.js' target='_blank'>commander.js</a>
        -   一个封装完整的 node.js 命令行库，在命令处理参数可选项等上面会很方便，详细可以谷歌查询。
    -   <a href='https://github.com/chalk/chalk' target='_blank'>chalk.js</a>
        -   在控制台可以打印彩色 log 的工具，让你的 log 日志不再单调。

OK，我这里的需求，大概只需要上述两个工具即可。如果你的需求还有别的功能，简单谷歌一下，找一下符合的工具即可。

接下来，开始撸代码吧～

## 开始撸代码

### 新建命令目录

```bash
$: mkdir my-command && cd my-command  # 创建并进入存放命令的目录，我是放在项目根目录下。
```

### 创建 package.json 文件

```bash
$: yarn init  # 输入相应的包信息
```

### 创建目录结构

```bash
├── bin
│   └── index.js           # 命令执行文件的链接
├── src
│   └── index.js           # 命令实际文件
├── util
│   └── dateFormat.js      # 工具函数
└── package.json           # 命令的包文件
```

其中，`bin/index.js`文件内容如下。（第一行是必须，告诉终端是要用 node 环境执行代码。

```javascript
#!/usr/bin/env node
require('../src/index.js');
```

而 `package.json`文件需要注意的是`bin`字段：

```json
{
    "bin": {
        "bran": "bin/index.js"
    }
}
```

`bin`字段，是用来指定各个内部命令对应的可执行文件的位置。在上面的示例中，是声明一个`bran`的命令，它的可执行文件是`bin/index.js`。

`src/index.js`文件可以先创建一个空白的`js`文件。

### 安装工具依赖

```bash
$: yarn add commander
$: yarn add chalk
```

### 开始写命令代码

在初始化目录结构，安装好依赖后，接下来就是在`src/index.js`中写命令代码了。（第一行依旧是要声明 node 环境)

根据我们的[功能拆分](#功能拆分)，依次开发。

因为下面代码中的注释，这里就不做详细讲解了，请看代码吧～ 0.0

```javascript
#!/usr/bin/env node

const fs = require('fs'); // 引入 node 的 fs 文件模块
const chalk = require('chalk'); // 引入彩色 log 工具模块
const { exit } = require('process');
const { Command } = require('commander');

const { formatTime } = require('../util/dateFormat.js');
const { log } = require('console');

const { red, green, yellow, cyanBright, redBright } = chalk;

// 创建命令工具的实例
const program = new Command();
program.version('1.0.0');

// 这里是定义命令的参数与可选项，以及当命令执行时，所触发的方法。
// 使用 commander.js 定义好命令后，它会解析命令，如果不符合命令的定义，则会有对应的提示信息。
const newPost = program
    .command('new')
    .description('生成一个新的文章')
    .option('-L, --layout <layout>', '文章所使用的模版，默认是 post', 'post')
    .option('-p, --path <path>', '文章路径', '')
    .option('-r, --replace', '如果存在同名文章，将其替换', false)
    .arguments('<filename> [title]')
    .description('new post', {
        layout: '文章所用的模板',
        filename: '文件名',
        title: 'post title',
    })
    .action((filename, title, options) => {
        // layout 和 replace 是有默认值的
        const { layout, path, replace } = options;
        createFile(layout, path, filename, title, replace);
    });

// 命令工具的实例，处理参数，这个 parse 方法的默认参数是 process.argv。
program.parse();

/**
 * 读取模板文件，读取成功则返回 string 供后续操作
 * @param {string} layout 模板文件
 * @returns string
 */
function readLayoutFile(layout) {
    try {
        const buffer = fs.readFileSync(`./_scaffolds/${layout}.md`);
        const str = buffer.toString('utf-8', 0);
        return str;
    } catch (error) {
        logError(error);
    }
}

/**
 * 创建文件
 * @param {string} layout 文章布局，取值：post, page, wiki, default: post.
 * @param {string} filepath 文章路径。
 * @param {string} filename 文章的文件名
 * @param {string} title 文章的标题
 * @param {boolean} replace 若存在相同文件，是否替换
 */
async function createFile(layout, filepath, filename, title = '', replace = false) {
    // 根据日期生成符合格式的 filename：yyyy-MM-DD-filename.md
    const now = new Date();
    filename = `${formatTime(new Date(), 'yyyy-mm-dd')}-${filename}.md`;

    const fullFilePath = `./_posts/${filepath ? filepath + '/' : ''}${filename}`;

    // 如果文件已经存在且不能替换。
    if (fs.existsSync(fullFilePath) && !replace) {
        log(`\n\n${yellow('文件已经存在啦，如要强制替换，请加上 -r 参数')}\n\n`);
        exit();
    }

    // 读取的模版数据，（由 Buffer 转 str），替换标题。
    const layoutStr = readLayoutFile(layout);
    const newFileData = layoutStr.replace('$title$', title);

    try {
        fs.writeFileSync(fullFilePath, newFileData, 'utf-8');

        log(green.bold(`\n新建"${cyanBright(filename)}"成功～ 开始写博客吧～～～\n\n`));
        log(`「${green.italic(getRandomMotto())}」\n\n\n`);
    } catch (error) {
        logError(error);
    }
}

// 一个返回随机格言的小函数
function getRandomMotto() {
    const mottos = [
        '一字一句，皆是风采～',
        '你的文笔，洋溢着醉人的光彩。',
        '久不见君，但阅其言，犹在眼前。',
        '君不见黄河之水天上来，奔流到海不复回。',
        '言念君子，温其如玉。',
        '长亭外，古道边，芳草碧连天。',
        '窈窕淑女，君子好逑。',
        '梦里寻他千百度，暮然回首，那人却在灯火阑珊处。',
    ];

    const getRandomNum = (min, max) => {
        return parseInt(Math.random() * (max - min + 1) + min, 10);
    };

    return mottos[getRandomNum(0, mottos.length - 1)];
}

function logError(error) {
    log('\n', red(error.toString()), '\n');
    log(yellow(`该路径 ${redBright(error.path)} 不存在，请输入正确的路径，或者先创建好文件夹再输入～\n\n`));
    exit();
}
```

<a href='https://github.com/bran-nie/bran-nie.github.io/blob/master/_bran-command/src/index.js' target='_blank'>代码 GitHub 地址</a>

## 结语

为了实现最初的想法，我大致花了四五个小时。通过这一番折腾，也算是有了个初版，心里还是蛮开心的。

通过这次折腾，大致有了编写命令的经验、创建脚手架的思维、感叹`commander.js`作者的厉害、了解 `node.js`的`fs模块`，还是很有收获的。

接下来就是，坚持写博客吧，为自己，也为每一个阅读的你～
