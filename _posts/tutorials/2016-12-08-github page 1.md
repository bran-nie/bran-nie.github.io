---
layout: post
title: Github 的注册与使用教程以及github page (一)
categories: [Tutorials]
description: Github page 使用
keywords: 'Github page'
---

> 须知:
>
> 1. 本文图片较多, 所以我用了[webp 格式](https://isux.tencent.com/introduction-of-webp.html)的图来加载, 以防止出现网速不好者, 要等待一会~ 还有就是图片作用就是让你确认你的界面应该是怎么样的. 我也有文字说明的.
> 2. (新加) 难过, 移动端暂时不支持 webp 格式的图片, 我在找到解决的方法之前, 还是先用 jpg 格式的.
> 3. 本文是从小白开始的教程, 大牛勿喷. 再说. 这是我第一次写, 难免过于幼稚. 体谅哈~
> 4. 右侧有目录, 可以跳转查看.

# 使用 Github 来托管你的代码

<!--more-->

> **第一部分** [认识 Github 和 Github Page](/2016/12/08/github-page-1/)
>
> 在第一部分中, 我简单的写了 Github 的注册, 建仓库, 初次使用 Github page. 还是用的网页上的**create new file** 在实际生产中, 我们肯定不可能是那样的写文件吧, 所以. 这个博文就是教你如何上传代码文件的

> **第二部分** [使用客户端或命令行上传你的代码](/2016/12/18/github-page-2/)
>
> 本文讲述了如何上传 本地的代码 到 Github 上. 常见的方式有 **客户端** 和 **终端命令行** 这两种. 我在这里用文字加图片的方法, 讲述一下 Github 的上传代码的事情.

# 认识 Github 和 Github Page

> 啰嗦的第一段, 已经了解的可以左侧目录栏跳过啦~

1. **GitHub**是一个通过[Git](https://zh.wikipedia.org/wiki/Git)进行[版本控制](https://zh.wikipedia.org/wiki/%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6)的软件源代码托管服务，由 GitHub 公司开发并运营.

2. 截止到 2015 年，**GitHub**已经有超过九百万注册用户和 2110 万代码库。事实上已经成为了世界上最大的代码存放网站和开源社区。

3. **GitHub**同时提供付费账户和免费账户。这两种账户都可以创建公开的代码仓库，但是付费账户还可以创建私有的代码仓库。

4. **Github**还有一个[github page](https://pages.github.com/)功能. 从而建立一个属于你自己的网站. 并且, 它是免费又快速的.

5. **Github Page**还可以自定义域名, 从而让你更加的与众不同. 出色于你的努力.

6. Are you ready?

# Github 注册

> 首先, 我们应该打开 [Github 官网](https://github.com/)袄~ 当然, 已经注册过的 可以跳过往下看~

#### 注册页面

网址: https://github.com/join?source=header

##### 第一步

-   填写用户名, 注册邮箱(邮箱要正确,且你要知道密码袄, 因为后面需要验证), 填写登录密码.

![](/images/20220117164506.png)

##### 第二步

-   选择你的套餐

![](/images/20220117164552.png)

##### 第三步

-   填写你的信息(这个是可选的) 你也可以跳过.

![](/images/20220117164629.png)

#### 验证邮箱

-   接着上一步, 第三步 ok 后, 点击 **start a project**. 它会让你验证邮箱. 然后发送一个邮件到你的邮箱里, 你去邮箱验证就好啦~
-   后期你还可以在右上角你的头像那里点击, 弹出的下拉菜单倒数第二个 setting 菜单. 这个是设置你的 github 功能的,里面你还可以添加邮箱啦, 更改密码啦, 更改信息啦.

#### 创建仓库

##### 第一步

点击右上角的 **+** , 在弹出的下拉菜单里, 点击 new repository . **仓库的名字**一定要看清,填好袄~ 还有, 有个需要`打钩的地方`, 也顺手打了吧, 这样会方便以后, 尽管后面你还可以自己创建.

![](/images/20220117164727.png)

我这里为了下面的演示 Pages 所以就创建了一个.github.io 格式的仓库.

##### 第二步 (可选)

体验 github page 的魅力吧!

![](/images/20220117164745.png)

点击 `create new file` , 进入后, **注意创建的文件的名字! 注意创建的文件的名字! 注意创建的文件的名字!** 内容你可以仿照我的敲一下, 也可以把你自己写过的静态单个 html 文件的内容复制粘贴过来. `PS: 单个html的意思是指你页面中的js啊,css啊,都在一个.html里面, 这样网页才完整. 不然就有些样式和脚本就不会出现啦~.`

![](/images/20220117164803.png)

ok 后, 在页面的最下方, 除了点击那个绿色的按钮 `commit new file` 其他什么都不要点, 不用填, 就可以了.

好了, 现在深呼吸一下(好累的), 在浏览器里打开一个新的标签页. 输入地址: https://你的用户名.github.io 回车后, 见证你自己的奇迹吧~

如果有人真的很相信我, 就在地址栏输入`https://你的用户名.github.io` , 那我是冷漠呢还是高兴呢. 好难选诶
