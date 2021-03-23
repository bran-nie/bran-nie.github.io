---
layout: post
title: 博客由 username.github.io 转为自定义域名
categories: [Blog]
description: '域名，GitHub Page'
---

> 发现在国内，username.github.io 不能解析，了解一下是运营商的 DNS 问题。科学上网和通过本地修改 DNS 可以解决，但这只是针对个人，对其他人一点也不友好。而自定义域名可以完美的解决这个问题，再者，GitHub Page 也是很完美的支持自定义域名。
>
> 故今早打算购买一个域名用作博客，HTTPS 也是要考虑的。看了一些服务商，最后选择了腾讯云，花半个小时左右完美的解决需求。**且为了培养写博客的习惯，便记录一下这个流程，也供同道中人参考使用。**

<!-- ![](/images/blog/inaccessible.png) -->
<img src="/images/blog/inaccessible.png" height="360">

## 购买域名

域名注册服务商有不少，你可以依据自己喜爱选择一个即可。我是今天看到 <a href="https://www.dnspod.cn/promo/domainscarnival?promo_code=G2LSXI22380&from=fugongdacu" target="_blank">腾讯云的复工大促活动</a> ，再加上之前一些云服务也是用的他们的，所以就选择了这个服务商。

至于其他的域名服务商，也都大同小异，这里说几个熟悉的平台：<a href='https://sg.godaddy.com/' target='_blank'>Godaddy</a>，<a href='https://wanwang.aliyun.com/domain/' target='_blank'>阿里云</a>，<a href='https://dnspod.cloud.tencent.com/' target='_blank'>腾讯云</a>。

选好平台后，如何购买域名。

-   首先是要查询你想要注册的域名，是否还在。不在的话就换吧，换名字或者一级域名(即后缀如 `com`, `cn`, `xyz`)。
-   域名选好后，加到购物车进行支付购买即可。
-   备注：国内的服务商，要填好个人的信息，需要实名认证的。

## 域名解析

在购买好域名之后，我们就可以进到域名服务商提供的域名管理页面。这一步就是用来解析域名，通俗点讲，就是要让网络知道这个域名指向哪里，因为域名本质上只是一个名字。你叫张三，他叫李四，张三与李四只是两个人的名字。

1. 打开域名的管理页面，找到解析这个功能，(找不到的可以自行查询 <a href='https://cn.bing.com' target='_blank'>Bing 搜索</a>)，下面展示的均为腾讯云(没广告费哎)。
   ![](/images/blog/domain_1.png)

2. 添加记录，两条 A 记录和一个 CNAME 记录即可。可以仿照图片添加，**需要替换的是 CNAME 那里的记录值，换成你的 GitHub page 地址。**
   ![](/images/blog/domain_2.png)

    - 这里简单说一下两个 A 记录是什么，这两个 A 记录指向的是 GitHub Page 的 IP 地址，![](/images/blog/domain_3.png)
    - 另外，关于 GitHub Page 自定义域名，<a href='https://docs.github.com/cn/github/working-with-github-pages/configuring-a-custom-domain-for-your-github-pages-site' target='_blank'>官方也有相应的文档</a>，感兴趣的可以看一下，多了解一些总归是好的～。

## GitHub Page 添加 CNAME

当域名也购买好了，解析也配置 OK 了。接下来就是在 GitHub 上面，开启自定义域名配置了。

1. 首先，在博客项目仓库，新建一个`CNAME`文件，**强调，文件名就是 CNAME，且没有后缀**
    - 注意，如果你用类似 Hexo 生成的博客，然后 deploy 到 GitHub page 仓库的，请注意需要把这个文件也存放到生成的文件夹根目录下。具体可以搜索或者在文章下方留言。
      ![](/images/blog/domain_5.png)
2. 这个文件里面就写上你自己的域名，如 `bran-nie.com`，不要 http、https 等这些协议。

3. 随后，你在项目仓库的 Setting 中，就能看到类似我的这样的信息。
   ![](/images/blog/domain_4.png)
   说明已经 OK 了

## 修改博客配置文件

这里我踩了一个坑。修改过自定义域名后，把配置`\_config.yml`中的 url 属性忘记修改成申请的域名了，因此导致博客网站的链接都还是 `bran-nie.github.io/xxx`，实际上国内还是访问不到。

因此，切记还需要在配置文件中，修改站点 URL，这样，GitHub Page 生成的页面中的链接，站点才是正确的 `bran-nie.com/xxx` 。

## 域名 SSL（可选

现在浏览器打开一个网页，如果是 http 协议的网站，则浏览器会提示一个不安全。现在又是大家会比较重视信息安全的时代，那么，很有必要给我们的博客加一把小锁了.

我们的博客网站，几乎都是静态页面了，现在 SSL 证书也有免费的，就我所购买的腾讯云域名，在域名管理页面，就可以快速申请 SSL 证书，点击一下就可以的那种。其他服务商，也都大同小异吧～

便捷方式：是在域名解析的这里，点击右侧的 SSL，根据提示操作即可。（我这里是已经申请过了，所以是绿色的 SSL 文字。
![](/images/blog/domain_2.png)

再或者，可以在域名控制台，找到证书相关的菜单，申请证书即可。如图：
![](/images/blog/domain_6.png)

## 最后

配置好博客，这是一个愉快的开端，希望我们不要忘记，为什么开通这个博客，折腾了这么久，不要忘记初心呀～

一点一滴的想，一字一句的写，将自己所了解的、学到的、感悟的知识输出出来，既能有益他人的学习，更能帮助自己进一步的掌握。加油，干饭人！

PS：确实，一开始写博客，是会耗时。眨眼间，两三个小时过去了，就拿这个博客来说吧，我早上从申请域名到完成迁移，也就半个小时左右，但输出这篇文章，大概花费了两个多小时。猛的一想还挺浪费时间的，其实呀，万事开头难，写多了，就好了。**写着写着就习惯了** hhh
