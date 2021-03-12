---
layout: post
title: 360浏览器、QQ浏览器等 <meta> 标签选择webkit内核问题
categories: [Tutorials]
---

## 忽略 IE 吧(8)！

先上一张图，很有趣。
![](/images/blog/ie.webp)
哈哈哈哈 标配

## 但是 leader 并不会让你这样做

> 于是乎你和 leader 促膝长谈一晚上，得到了这样一个结果：那用户打开 360 浏览器、QQ 浏览器等国内双核的浏览器商，就要正常显示

谷歌一下，呀这个好办。一搜索，两大把。。
如图
![360浏览器 meta](/images/blog/brower_meta.webp)

兴致勃勃的打开几个页面，看看资料。哦好简单啊，就是添加一个 meta 标签就可以了。
于是在 head 里面，眼疾手快的加了一行

`<meta name="renderer" content="webkit">`
保存，刷新。
似乎没有用。 冷漠。。
又看到一篇文章，是这样说：
`<meta name="renderer" content="webkit" />`
ok，我再改。。
然并卵。。

## 下面听好了，坑在这里

**meta 标签并不支持 以 ip 地址访问 的查询修改内核使用。 来自 360 社区的产品答疑师回复。。。**

![产品答疑师](/images/blog/brower_meta2.webp)

## 最后，如果你是和我一样的情况

> -   使用 Mac 做开发，
> -   不需要兼容 ie8，但又需要顾及到国内非 chrome 浏览器用户
> -   需要在上线前进行测试啊测试

那么可以选择的方法有一个是：
使用 meta 标签。
使用局域网，用 Windows 电脑上的非 chrome 浏览器做测试。

> 这里使用局域网，就是拿到你 Mac 的 ip 地址，在 Windows 上，修改 hosts，将 ip 地址重定向为一个域名。再在浏览器里打开。因为 meta 标签不支持 以 ip 地址访问 的查询修改内核使用嘛。
