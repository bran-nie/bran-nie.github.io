---
layout: post
title: Github 的注册与使用教程以及github page (二)
categories: [Tutorials]
description: Github page 使用
keywords: 'Github page'
---

# 使用 Github 来托管你的代码

**_须知_**

> 1.  **`写在前面的话:`** 如果你自认为是做技术的, 我强烈推荐你 **学会翻墙**, 好处不用多说, 讲道理某度搜索真的会误人! ! !
> 2.  **`关于使用客户端还是命令行`** 两个都可以上传你的代码, 就是看你喜欢哪种风格了.
> 3.  **`善于使用左侧目录跳转`** 这篇文章比较长, 我把客户端和命令行放在一起了. 所以请读者合理使用左侧目录跳转, 以节省时间.
> 4.  本文是从小白开始的教程, 大牛勿喷. 再说. 这是我第一次写, 难免过于幼稚. 体谅哈~

<!--more-->

**_相关_**

> **第一部分** [认识 Github 和 Github Page](/2016/12/08/github-page-1/)
>
> 在第一部分中, 我简单的写了 Github 的注册, 建仓库, 初次使用 Github page. 还是用的网页上的**create new file** 在实际生产中, 我们肯定不可能是那样的写文件吧, 所以. 这个博文就是教你如何上传代码文件的

> **第二部分** [使用客户端或命令行上传你的代码](/2016/12/18/github-page-2/)
>
> ​    本文讲述了如何上传 本地的代码 到 Github 上. 常见的方式有 **`客户端`** 和 **`终端命令行`** 这两种. 我在这里用文字加图片的方法, 讲述一下 Github 的上传代码的事情.

# Github 的客户端使用

当今盛行的代码托管服务平台. 而我们作为一个程序员, 岂有弃之不用之理~ 好绕哈哈. 下面我就直接进入主题 客户端的使用. 分别有 Mac 端 和 windows 端 的使用.

> 客户端是简单的操作, 适合新手.

## Mac 客户端下载与使用

### 1. 下载与安装

-   官网下载地址: https://desktop.github.com/
-   如果网速慢, 可以在我的网盘下载. 链接: http://pan.baidu.com/s/1i4B4tzZ 密码: gjpy

### 2. 登录客户端

-   快捷键 `command` + `, ` 打开客户端的设置.
-   点击 **Accounts** 然后 sign in 你的 Github 账号.

### 3. 克隆仓库

-   登陆成功后, 在客户端的左上角点击 **_+_** 图标, 在弹出来的框框中, 有三个选项: Add Create Clone, 这里我们需要点击 Clone.
-   这时会出来你 Github 账号上, 所有的仓库. 你需要 clone 哪个, 就点击仓库名字, 右下角的按钮就亮了. click it
-   弹出 clone 选项, 你选择好文件夹就可以了.

### 4. 写代码咯

你想托管在 Github 平台的代码放在你克隆到本地的仓库下面就好了, 然后接着下一步, push 你的代码吧.

> 这里上面的几个步骤, 是你第一次使用 Github 提交代码的顺序, 在接下来的时间里, 在你已经克隆过本地仓库后, 你要是需要提交代码到 Github 上, 那直接走 [提交代码到 Github 上](#5-提交代码到Github上) 这一步就好了

### 5. 提交代码到 Github 上

1. 打开客户端. 点击左侧你要同步的仓库

2. 当你本地的代码与网页上的相比, 有变动的时候, 会显示有多少个 changes .

3. 在 changes 下, 在你的头像旁边, 有一个输入框, summary(描述) 输入你为这一次提交的说明.

    - 这个是必须的
    - 你的说明, 如果出现空格, 请用 **""** 把说明包含起来

    ​

4. 输入完上述的 summary 后, 下面的 `Commit to master` 就可以点击了 click it

5. 这时候你已经完成了 90%了, 最后一步就是点击右上角黑色框中的 Sync . 等待上传成功吧.

6. 去 Github 官网上, 登录你的账号, 查看你刚刚提交的代码吧. 啊哈~

### 6. 常见问题

收集中....

## Windows 客户端下载与使用

### 1. 下载与安装

-   官网下载地址: https://desktop.github.com/
-   如果网速慢, 可以在我的网盘下载. 链接:

### 2. 登录客户端

### 3. 克隆仓库

### 4. 写代码咯

### 5. 提交代码到 Github 上

### 6. 常见问题

# 命令行的使用 Git

> 命令行是轻松方便的一个方法, 它舍去了鼠标的点来点去, 舍去了 UI 界面, 用最简单的一行行命令轻松完成 clone commit push 等等, 将你的代码从本地托管到 Github 上

## Mac 下的 git 命令行

### 1. 终端的介绍与使用

1. **终端是什么?**
    - 是以`执行命令的方式`**来完成**`一些操作`的工具, 比如查看某个文件夹下的文件, 你可以在 GUI 界面, 打开 Finder 查看对应的文件. 也可以在终端里通过 cd ls 等命令查看文件.
    - 详情请自行谷歌https://www.google.com/ 或者 必应http://cn.bing.com/
    - **PS:** 如果你自认为是做技术的, 我强烈推荐你 **学会翻墙** 好处不用多说, 讲道理某度搜索真的会误人! ! !
2. **Mac 系统下终端在哪里? 还需要下载吗?**
    - Mac 系统下, 已经有终端软件 Terminal , 可以在 Spotlight 中, 输入 Terminal 查找, 然后打开. 也可以在 Launchpad 中, 有个实用工具程序文件夹, 终端就在里面, 点击打开就好了.
    - Mac 系统自带的有 Terminal, 我觉得它的**功能方面**, 不如我现在用的 `iTerm` 就像是记事本和 Sublime 之间的区别. - 如有感兴趣的可以谷歌搜索, 了解了解. 这里就不详细讲述了.
3. **终端如何使用?**
    - 打开终端后, 输入命令, 回车执行.
    - 输入命令时, 如有命令加文件的, 记得要用空格分隔开, 比如 cd work 中间有空格的, 而不是 cdwork
4. **终端常用的一些命令**
    - ls —— 显示当前路径下的文件 ls -a 可以显示隐藏文件. ls -l 可以显示文件信息. ls -al 组合两个功能了
    - cd —— cd + 文件名 打开文件. 比如 当前路径下有个 work 文件夹, 我想在终端中打开, 那就是 cd work 回车执行
    - chmod —— 改变文件权限 这个命令可能会经常用到, 详情 请谷歌吧, 挺长的.... 偷个懒
    - mkdir —— mkdir + 文件名, 这个命令是新建目录, mkdir work 就是新建了一个 work 文件夹, 中文名和带空格符的 , 要用""符号 如 mkdir "learn mkdir"
    - cp —— 复制文件命令, copy 嘛, 使用方法是 cp 参数 源文件 目标文件 示例: 把 work 下的 text.txt 文件 cp 到 home 目录下, cp -R /work/text.txt /home/ 这样就好了 **PS:注意空格, 另外我只是演示, 这个路径要写完整, 从根目录开始.**
    - rm —— 删除文件 remove 的缩写咯, 示例: rm text.txt 删除了 text 文件.
    - 还有 mv 移动文件 move 的缩写. 等等.... 命令行的命令太多了, 感兴趣的可以自行搜索...

### 2. 公钥密钥的介绍与生成

1. **ssh, (Secure Shell)**

    - 是一种 创建在应用层和传输层 基础上的安全协议.
    - 基于**密钥**的安全验证
    - Github 支持 ssh 密钥

2. **本地生成 ssh**

    1. 如果是第一次使用, 那你的本地应该没有一对密钥的. 不过以防万一还是检查一下吧.
        - 打开终端, 输入命令
        - ```bash
           cd ~/.ssh
          ```
        - 如果返回'...No such file or directory ...' 就说明没有创建过密钥. 那就进行下一步 2 , 生成你的密钥. 如果有, 你确定这个 rsa 是你的 Github 注册邮箱吗? 确定 那就跳到 [3. 上传公钥到 Github](#3-上传公钥到Github)
    2. **生成新的 key**
        - 输入命令 这里 **""** 内输入的是你 Github 账号**绑定的邮箱**. 千万要输入正确袄... 其中 在命令中, github_rsa 是指的 给新建的密钥 **命名** 为 github_rsa , 你也可以更改. 我下文都是用的 github_rsa, 如果更改, 注意替换袄.
            ```bash
            ssh-keygen -f github_rsa -C "your_email@youremail.com"
            ```
        - 然后回车两次, 就生成完毕了, 其中第一次回车是问 passphrase , 这个它会在你每次进行版本控制(提交文件)时, 让你输入, 我个人没有使用, 所以就回车了, 第二次是让你输密码, 然后每次提交也要输密码, 所以为了懒, 我也回车了, 当然你觉得有用, 你可以加上.
        - `ls` 一下. 会有`github_rsa` 和 `github_rsa.pub` 这两个文件, 在下一步中, 我们把公钥上传到 github.

### 3. **上传公钥到 Github**

> 这时, 你已经有了文件.ssh 以及有了你注册 Github 账号时, 所用的邮箱生成的 一对密钥了.

-   Mac 有个命令是 copy 文件到剪贴板. 那我们把上一步生成的公钥复制进去吧 注意命令空格

```bash
pbcopy < ~/.ssh/github_rsa.pub
```

OK 输入完回车. 里面的内容已经十分乖巧的复制到剪贴板里面了

-   打开 Github https://github.com/ 登陆你的账号,
-   打开这个链接 : https://github.com/settings/keys
-   现在打开的页面是设置 ssh 的. 请点击页面上, 右上角区域的 **`New SSH key`**
-   在出现的两个输入框, 第一个输入你给 ssh key 的命名, 比如 `github_id` 第二个输入框, 选中后, `command` + `v` 粘贴你刚刚复制的公钥.
-   点击 `Add SSH key` 就完成了这一步.

### 4. **检查 SSH 链接**

```bash
ssh -T git@github.com
```

如果显示 : Are you sure you want continue connecting (yes/no)? 输入 yes 没有这个也没事

最终显示: Hi yourusername! You're ……… 就 ok 了

参考链接: http://www.jianshu.com/p/0d7038102cd6 详情可点击查看.

### 5. **使用命令上传代码吧 !**

> -   git status // 检查状态. 一般用于查看本地仓库有无改动.
> -   git add . // 更新改动.
> -   git commit -m "first commit" // 提交更新到暂存区并注释是"first commit" **PS** 这个-m 后面 一定要有`"String"` 不然会多麻烦的.
> -   git push // 提交到 Github

### 6. **常见问题**

收集中.......

## Windows 下的 git 命令行

### 1. **Git shell 介绍**

### 2. **密钥生成**

### 3. **上传公钥到 Github**

### 4. **检查 SSH 连接**

### 5. **使用命令上传**

### 6. **常见问题**
