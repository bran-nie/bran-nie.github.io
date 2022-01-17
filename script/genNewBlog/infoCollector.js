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
