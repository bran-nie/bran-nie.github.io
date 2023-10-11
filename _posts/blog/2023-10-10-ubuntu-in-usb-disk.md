---
layout: post
title: 将 Ubuntu 安装在 USB 移动硬盘上，随时随地使用
categories: [Blog]
description: 将 Ubuntu 安装在 USB 移动硬盘上，随时随地使用
keywords: 将 Ubuntu 安装在 USB 移动硬盘上，随时随地使用
---

前段时间折腾了一下 `Ubuntu`系统，起因是家里的 Windows 除了作为游戏机，似乎也没别的作用了，平时又不想带 mac 回家时，想敲敲代码或者或者折腾东西时，Windows 环境一个是配置麻烦，另一个是也不好使，偶然间，就想到了 `Linux`系统。

原本是想着 Windows 装个双系统的，无奈中间遇到一些意外，没有装好，后来发现还有外置硬盘装系统这种操作，瞬间觉得很赞，因为我看到角落里遗落的那个来自**废旧笔记本的固态硬盘**！(没错，就是和 <a href='/2023/09/28/diy-display/' target='_blank'>DIY 屏幕</a> 用的同一个笔记本，嘿嘿 😁)

## 前置准备

- USB 移动硬盘，推荐固态的（我的是 240G 的固态，笔记本拆卸，几十块钱买个硬盘盒，搞定
- U 盘，8G 及以上即可（注意 ⚠️：制作成启动盘时，会格式化 U 盘数据，请注意数据存储
- 电脑一台（Windows、Mac OS）我所使用的是 Windows
- <a href='https://cn.ubuntu.com/download/desktop' target='_blank'>Ubuntu 官网镜像 </a>（我使用的是 22.04 LTS，23.04 我在安装的时候，似乎有问题，在分区的步骤时，扫描不出硬盘列表，omz）
- 镜像烧录软件，推荐两种
  - <a href='https://etcher.balena.io/' target='_blank'>balenaEtcher</a>，多平台支持
  - <a href='https://rufus.ie/zh/' target='_blank'>Rufus</a>，Windows

## 制作 USB 启动盘

安装好烧录软件 balenaEtcher，也下载好镜像后，就可以制作启动盘了

将准备好的 U 盘插入电脑，打开软件，选择镜像，选择 u 盘，点击 Flash 进行烧录，等待即可。三板斧后，启动盘就制作好了

![img](/images/a40f15d2-select-iso.png)

## 移动硬盘格式化

格式化为 NTFS 即可，后续分区时还会继续操作

## 设置 BIOS

如果不知道怎么进入到 bios，可以根据电脑型号（笔记本）或者电脑主板型号进行搜索，常见的进入方式有：开机的同时，按住 F12 / F5 / F2 / Del 中的其中一个，具体是哪个，需要看品牌的。

请注意，Windows 电脑，一般默认打开了 `secure boot` 这个选项，会导致我们无法安装其他操作系统，比如 Ubuntu。因此 Windows 如果在安装 Ubuntu 中遇到问题，需要检查下面两点：

1.  secure boot 是否开启，如果 able，则设置为 enable
2.  硬盘模式需要改为 achi 模式

设置 bios 的系统启动顺序，我这里设置为 USB、USB disk、电脑本身的硬盘

## 安装系统（重点是分区

### 进入安装流程

设置好 bios，将移动硬盘、USB 启动盘都插入到电脑后，开启电脑，可以进入到安装程序

![img](/images/image-20231011161742791.png)

选择第一个进入即可。

### 选择安装步骤的语言

稍作等待，就可以进入到系统的安装流程界面了，首先是选择安装语言，这里我们在语言选择的滚动区域，找到简体中文即可。

### 选择安装 Ubuntu

第一步，是让我们选择，是安装系统，还是试用系统，这里我们选择安装，当然，也可以先试试，不过之后，要重新进来。

### 安装设置

这里选择正常安装即可，其他选择自由勾选

### 安装类型

这里一定一定要注意，**选择其他选项**，除非不打算用原本的系统了（hhh

### 分区

在出现的磁盘列表中，找到移动硬盘，如果不确定是哪个，可以根据磁盘的大小来确认

![](/images/fenqu.jpg)

选中移动磁盘后，在列表下方有个 + 号，可以给磁盘进行分区，可以参考下面的进行分区

分区之后，**安装启动引导器的设备**选择 efi 那个选项即可，随后点击现在安装，会让选择地区，设置用户名、账户、密码，设置好之后，点击继续，等待安装好。安装好之后，不要选择重启。

到这里后，是不是以为已经搞定了？嘿嘿，不是的，我试了两次，发现 Ubuntu 的引导是写入到 Windows 的系统盘上，这就导致想拿着移动硬盘到其他电脑上使用时，根本进入不到系统。。。

ok，怎么解决这个问题呢，在我们等待安装好之后，先不要重启系统，参考 <a href='https://help.ubuntu.com/community/Boot-Repair' target='_blank'>Boot-Repair</a> 文章中的第二个选项，我们需要做的是：

0. 需要联网

1. 在 Ubuntu 系统中（安装好之后，不要重启）打开 terminal，输入以下命令：

```bash
sudo add-apt-repository ppa:yannubuntu/boot-repair && sudo apt update
sudo apt install -y boot-repair && boot-repair
```

2. 等命令执行成功之后，在出现的界面中，选择默认的选项继续就行了。

这些操作，是将 Ubuntu 的引导移动到移动硬盘中。完成后，就可以重启了，也可以试着将移动硬盘插入到其他电脑试试效果。

## 任意电脑使用

当制作好移动硬盘的 Ubuntu 系统盘后，只需要将其插到一台 Mac/Windows 电脑上，就能够随时随地的使用了，移动电脑，哈哈哈。

- Windows：进入到 bios，设置系统启动顺序，将 usb 设置在内置硬盘的前面，保存后重启即可
  - 不同的电脑进入到 bios 方式不同，可以根据电脑/主板型号，搜索进入 bios 的方式
- Mac：Mac 没有 bios 设置，u 盘启动，需要在开机的时候，长按 option 键，进入到磁盘选择界面，选择 Ubuntu 所在的移动硬盘即可
