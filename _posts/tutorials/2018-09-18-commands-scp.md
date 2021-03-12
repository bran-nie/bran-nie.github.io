---
layout: post
title: Linux命令- - - scp 服务器间传输，基于ssh
categories: [Tutorials]
description: Mac scp Linux 文件传输 服务器
keywords: Mac scp Linux 文件传输 服务器
---

> scp 是 secure copy 的缩写，scp 是 Linux 系统下基于 ssh 登录，进行的远程文件拷贝命令

## scp 简易写法

scp 【可选参数】【原路径】 【目标路径】

## 可选参数 (常见)

-   -r：递归复制整个目录
-   -C：允许压缩
-   -p：保留原文件的修改时间，访问时间，访问权限。
-   -P port：指定数据传输用到的端口号。如 -P 8080
-   -I limit：限定用户所能使用的带宽，kbit/s 为单位
-   -v：详细方式显示输出，可以用于调试连接，验证和配置问题。
-   -i identity_file： 从指定文件中读取传输时使用的密钥文件，此参数直接传递给 ssh。

## 示例

### 从本地上传到远端，（1、2 需要已指定用户的密码，3、4 需要输入用户名和密码）

-   scp /www/test.txt root@192.168.1.1:/www/scp 上传到远端的 scp 目录下
-   scp /www/test.txt root@192.168.1.1:/www/scp/new_test.txt 上传到远端的 scp 目录下并修改文件名
-   scp /www/test.txt 192.168.1.1:/www/scp 上传到远端的 scp 目录下
-   scp /www/test.txt 192.168.1.1:/www/scp 上传到远端的 scp 目录下并修改文件名
-   如果是文件夹，就加上 -r 参数，如 scp -r /www/test/ 192.168.1.1:/www/scp/
-   PS：这里有个关于权限的问题，如果登录到远程的用户是普通用户，则不能上传到根目录，而是上传到用户目录。

### 从远端下载到本地

-   下载和上传类似，换换上面的位置即可。如 scp -r 192.168.1.1:/www/scp/ /www/test/
-   PS：如果远程的服务器开启防火墙并指定的 scp 的端口号，则需要使用 -P 参数来设置这个端口号，如 scp -r -P 8080 192.168.1.1:/www/scp/ /www/test/

## 补充

上面两个 ps。 scp 命令也是需要权限的，所以在使用的过程中，要确保连接的用户具有可读取服务器相应文件的权限。否则就 Permission denied 🌚
