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

#### 依赖：[inquirer.js](https://github.com/SBoudrias/Inquirer.js/){:target='\_blank'}，[chalk](https://github.com/chalk/chalk/blob/main/source/utilities.js){:target='\_blank'} (可选，这是一个控制台 log 日志添加颜色的库)

`inquirer.js` 是一个很不错的创建交互式命令的工具，这里有 [一篇文章介绍它的基本使用](https://blog.csdn.net/qq_26733915/article/details/80461257){:target='\_blank'}，可以参考一下，更多的配置可以查看 [GitHub 上它的文档](https://github.com/SBoudrias/Inquirer.js#documentation){:target='\_blank'}

#### 代码：[GitHub](https://github.com/bran-nie/bran-nie.github.io/tree/master/script){:target='\_blank'}

代码主要有两部分

-   收集用户的输入

```javascript
// infoCollector.js
// 收集命令行的输入数据
const inquirer = require('inquirer');
const fs = require('fs-extra');

const { formatTime } = require('../utils/index.js');

const RegxMap = {
    IS_FILE_NAME: /^[a-zA-Z0-9\-]+$/g,
    IS_DIRECTORY_NAME: /^[a-z]+$/g,
};

module.exports = async () => {
    const meta = await inquirer.prompt([
        {
            type: 'list',
            message: '请选择 layout',
            name: 'layout',
            default: 'post',
            choices: ['post', 'page'],
        },
        {
            type: 'input',
            message: '请输入文章所在 _post 下的目录名（小写字母）',
            name: 'filepath',
            default: 'blog',
            validate(answer) {
                const done = this.async();
                const validateRes = RegxMap.IS_DIRECTORY_NAME.test(answer);
                if (!validateRes) {
                    done('请输入正确的目录名');
                    return;
                }
                done(null, true);
            },
        },
        {
            type: 'input',
            message: '请输入文章文件名（英文和 - ）',
            name: 'filename',
            validate(answer, answers) {
                const done = this.async();
                const validateRes = RegxMap.IS_FILE_NAME.test(answer);
                if (!validateRes) {
                    done('请按要求输入正确的文章名');
                    return;
                }

                const filename = `${formatTime(new Date(), 'yyyy-mm-dd')}-${answer}.md`;
                const fullFilePath = `./_posts/${answers.filepath}/${filename}`;

                if (fs.existsSync(fullFilePath)) {
                    done('文件已经存在啦');
                    return;
                }
                done(null, true);
            },
        },
        {
            type: 'input',
            message: '请输入文章标题',
            name: 'title',
            default: 'blog title',
            validate(answer) {
                const done = this.async();

                if (answer.trim().length === 0) {
                    done('请输入正确的目录名');
                    return;
                }
                done(null, true);
            },
        },
    ]);

    const { filepath, filename } = meta;
    const _filename = `${formatTime(new Date(), 'yyyy-mm-dd')}-${filename}.md`;
    meta.fullFilePath = `./_posts/${filepath}/${_filename}`;

    console.log({ meta });
    return meta;
};
```

-   处理输入，生成文件

```javascript
// genBlog.js
const fs = require('fs');
const chalk = require('chalk');
const { red, green, yellow, cyanBright, redBright } = chalk;
const { log } = require('console');

/**
 *
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

function logError(error) {
    log('\n', red(error.toString()), '\n');
    log(yellow(`该路径 ${redBright(error.path)} 不存在，请输入正确的路径，或者先创建好文件夹再输入～\n\n`));
    exit();
}

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

module.exports = async (meta) => {
    const layoutStr = readLayoutFile(meta.layout);
    const newFileData = layoutStr.replace('$title$', meta.title);

    try {
        fs.writeFileSync(meta.fullFilePath, newFileData, 'utf-8');
        log(green.bold(`\n新建"${cyanBright(meta.filename)}"成功～ 开始写博客吧～～～\n\n`));
        log(`「${green.italic(getRandomMotto())}」\n\n\n`);
    } catch (err) {
        logError(err);
    }
};
```

最后再调用执行一遍即可

```javascript
const infoCollector = require('./infoCollector');
const genBlog = require('./genBlog');

async function run() {
    const meta = await infoCollector();
    genBlog(meta);
}

run();
```
