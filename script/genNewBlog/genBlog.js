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
    const newFileData = layoutStr
        .replace('$title$', meta.title)
        .replace('$categories$', `[${meta.filepath.replace(/^(.{1})/, (v) => v.toLocaleUpperCase())}]`)
        .replace('$description$', meta.title)
        .replace('$keywords$', meta.title);

    try {
        fs.writeFileSync(meta.fullFilePath, newFileData, 'utf-8');
        log(green.bold(`\n新建"${cyanBright(meta.filename)}"成功～ 开始写博客吧～～～\n\n`));
        log(`「${green.italic(getRandomMotto())}」\n\n\n`);
    } catch (err) {
        logError(err);
    }
};
