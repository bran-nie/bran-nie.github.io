---
layout: post
title: 简单开启Mac下的服务器
categories: [Tutorials]
description: Mac 终端 服务器
keywords: Mac 终端 本地服务器
---

> 有时候，我们写了一个 demo，想在本地调试简单的 HTML 文件时，需要开启一个本地 Web 服务器，除去一些 IDE 和熟悉 Apache 操作的人，有没有什么简单的方法，让我们在本地开启服务器吗？let’ go

在 Mac 上，我们可以轻松的使用如下两个方法，开启服务器。当然，由于 Python 和 php 是跨平台的，那么只要其他电脑也装好环境，应该也是可以的。

## Python 方法

在 Mac 上已经预装好 Python2.7 版本的环境，所以下面的 SimpleHTTPServer 是已经有安装的。如果是自己装的 py，是要 install 这个 module 的。

-   打开终端
-   进入本地文件目录（确定根目录）
-   使用 Python 开启服务器，最后是端口号，如果不填，默认是 8000，地址是本机的 ip 地址。

```bash
$ cd user/test/
$ python -m SimpleHTTPServer 1001
```

**PS：**如果遇到权限问题，加上 sudo 指令。 sudo python -m …….
然后在浏览器地址栏输入网址即可。 http://localhost:1001

## Php 方法

只是命令不同

```bash
$ cd user/test/
$ php -S localhost:1001
```

php 官网关于 👉 [web 内置服务器](http://php.net/manual/zh/features.commandline.webserver.php)的文档

我是应用于手机端访问，所以

-   手机和电脑先在同一个局域网内。
-   使用 Python，设置完端口号，手机浏览器输入电脑 ip 地址加设置的端口号，就可以进行访问。
-   使用 php，在启动服务器的时候，输入 ip 地址+端口号，在手机端浏览器输入地址即可进行访问。

ok，是不是很简单啦，

停止服务器，在终端 Ctrl+C 即可。
