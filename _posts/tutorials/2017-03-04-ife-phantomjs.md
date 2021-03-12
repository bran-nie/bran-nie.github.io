---
layout: post
title: phantomjs———刷IFE琐记
categories: [Tutorials]
description: ife phantomjs
keywords: ife, phantomjs
---

今天在看百度 ife 糯米学院的题，遇到了一个问题，解决后就想拿来写写 😂

## 下载压缩包

[http://phantomjs.org/download.html](http://phantomjs.org/download.html) 常见的系统都有压缩包.

下载后解压, 有 bin、examples、等等文件，其中在 bin 中打开 phantomjs 后 各个系统进入的界面大同小异:

## Windows:

1. 会有带这个 phantomjs> 的命令行, 可以输入语句, enter 执行, 但是这样不能执行 js 文件.
2. 同时在 cmd 里面, 输入 phantoms –version 会报错.
3. 解决方法: 修改环境变量
    1. 将压缩包解压到某个盘, 如我解压到 D 盘, 重命名文件夹为 phantomjs,
    2. 打开>我的电脑>右键属性>高级系统设置>高级>环境变量, 在出现的窗口里, 找到系统变量中的 Path, 点击编辑, 在弹出的页面, 点击编辑文本, 把上一步的路径添加上去. 格式: ;D:\phantomjs\bin 切记不要漏下 ; 这个是各个环境变量的分隔符, 当然, 你编辑的时候发现前面有,那就不用加了.
4. 现在已经 ok 了 开始键 + R 输入 cmd 打开命令提示符, 输入 phantomjs –version 就可以显示版本号了. 输入 phantoms (js 文件, 不在命令提示符同一目录下, 需要加 js 文件的路径) 就可以执行 js 文件了.

> 温馨小提示:
>
> 在文件管理器的地址栏, 输入 cmd 然后回车, 就可以快速的进入当前目录的命令提示符.

## Mac OS X:

1. 报错信息同 Windows
2. 解决方法: 使用绝对路径 和 修改环境变量
    - 将压缩包解压到某个文件夹下面. 重命名文件夹为 `phantomjs`
    - 方法一: 在终端 cd 到这个文件目录下. 此时可以输入命令: `bin/phantomjs examples/hello.js` 回车, 就能看到 输出的 hello world 了. 输入 `bin/phantomjs --version` 可以查看版本, 这个方法简单, 且不用修改什么
    - 方法二: 在终端里设置 PATH 一劳永逸. 命令: `export PATH = "$PATH:/Users/username/phantomjs/bin"` 其中, 在/User/后, 就是你 phantomjs 解压后所在的文件夹了. 如我就是 `export PATH = "$PATH:/Users/pengchengnie/work/phantomjs/bin"` 修改环境变量以后, 在用户下次登陆时生效.
    - 方法二参考链接及深入学习链接: <http://www.2cto.com/os/201308/237281.html>

## 到这里, 环境变量已经搭好了, 可以开始学习 😂

**over**
