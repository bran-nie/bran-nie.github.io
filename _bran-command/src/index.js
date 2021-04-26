#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
const { exit } = require('process');
const { Command } = require('commander');

const { formatTime } = require('../util/dateFormat.js');
const { log } = require('console');

const { red, green, yellow, cyanBright, redBright } = chalk;

// log(green('命令详细说明：(若全局安装)bran help new 或 yarn/npm bran help new  '));

// 1. 解析命令
// 2. 符合标准 - N 打印帮助信息，退出。
// 3. 目录已存在 - N 打印帮助信息，退出。
// 3.1 读取模板文件，- N 打印错误信息，退出
// 3.2 读取待生成文件，若命令没带 -r，且文件已存在，打印帮助信息，退出
// 4. 根据命令参数创建文件。
// 5. 打印成功信息，结束。

// 创建命令工具的实例
const program = new Command();

program.version('1.0.0');

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
