---
title: hexo
date: 2019-06-25
tags: [git]
categories: [工具]
---

# hexo
目录：
- [hexo连接github并发布](#use)
- [hexo 常用命令](#cmd)
- [保留CNAME、README.md等文件](#style)
- [如何让博文列表不显示全部内容](#more)

[hexo官网](https://hexo.io/zh-cn/)

<!--more-->

## hexo连接github并发布 <span id='use' />
- 创建仓库
    - 如果用户名是123，则需要仓库为123.github.io
    - 仓库为public
    - 需要初始化readme.md
- 下载git
    - git配置账号密码
    ```cmd
    git config --global user.name "xxxxx"
    git config --global user.email  "xxxxx"
    ```
- 创建github公钥
    - ssh-keygen -t rsa -C "这里填账号邮箱"
    - 一路回车下去，直到结束，cmd输出公钥私钥文件目录，.pub文件是公钥文件
    
    ```cmd
    Generating public/private rsa key pair.
    Enter file in which to save the key (C:\Users\87716/.ssh/id_rsa):
    Enter passphrase (empty for no passphrase):
    Enter same passphrase again:
    Your identification has been saved in C:\Users\87716/.ssh/id_rsa.
    Your public key has been saved in `C:\Users\87716/.ssh/id_rsa.pub`.
    The key fingerprint is:
    SHA256:VHTCnlW68nN6TvUS/xBUBYNqlt4Q+P67no7g4li84LQ 877165468@qq.com
    The key's randomart image is:
    +----[SHA256]-----+
    ```
- 仓库中添加公钥
    - github主页->头像->settings ->SSH and GPG keys -> new SSH key
    - 将上一步创建出来的公钥文件内容，复制到面板中，title自己设置
- 测试公钥是否正常连接github
    - ssh -T github@github.com
    - 正常会输出类似以下内容
    > Hi xxxxxxxxx! You've successfully authenticated, but GitHub does not provide shell access.
- 下载node（自带npm）
- 下载hexo-cli
    - npm i  -g hexo-cli
- 新建目录，初始化hexo
    ```cmd
    hexo init hexo #表示在当前文件夹    下  新建hexo文件夹进行初始化
    cd hexo 
    npm i hexo -S  #安装本地hexo
    npm install hexo-asset-image --save #图片插件
    npm install --save hexo-deployer-git    #部署到git上插件
    npm install

    ```
- 修改hexo主题
    - 下载心仪的主题到hexo实例下的themes文件夹，如next
    ```
    cd hexo\themes
    git clone https://github.com/iissnan/hexo-theme-next themes/next

    vim ../_config.yml
    ```
- 配置_config.yml
    ```xml
    deploy:
        type: git
        repo: git@github.com:xxxxx/xxxxxx.github.io.git
        branch: master

    theme: next        #theme后面需要空格
    ```
- 通过hexo写博文并发布
    ```cmd
    hexo new "newblog"          #用于生成新md
    hexo new page "newblog"     #用于生成新页面目录以及index.md
    ```

---

## hexo 常用命令    <span id='cmd' />
常见命令：

    hexo new "postName" #新建文章
    hexo new page "pageName" #新建页面
    hexo generate #生成静态页面至public目录
    hexo server #开启预览访问端口（默认端口4000，'ctrl + c'关闭server）
    hexo deploy #部署到GitHub
    hexo help  # 查看帮助
    hexo version  #查看Hexo的版本
缩写：

    hexo n == hexo new
    hexo g == hexo generate
    hexo s == hexo server
    hexo d == hexo deploy
组合命令：

    hexo s -g #生成并本地预览
    hexo d -g #生成并上传

---
## 保留CNAME、README.md等文件 <span id='style' />
提交之后网页上一看，发现以前其它代码都没了，此时不要慌，一些非md文件可以把他们放到source文件夹下，这里的所有文件都会原样复制（除了md文件）到public目录的：



由于hexo默认会把所有md文件都转换成html，包括README.md，所有需要每次生成之后、上传之前，手动将README.md复制到public目录，并删除README.html。

## 如何让博文列表不显示全部内容 <span id='more' />
默认情况下，生成的博文目录会显示全部的文章内容，如何设置文章摘要的长度呢？

答案是在合适的位置加上<!--more-->即可，例如：
```md
# 前言

使用github pages服务搭建博客的好处有：

1. 全是静态文件，访问速度快；
2. 免费方便，不用花一分钱就可以搭建一个自由的个人博客，不需要服务器不需要后台；
3. 可以随意绑定自己的域名，不仔细看的话根本看不出来你的网站是基于github的；

<!--more-->

4. 数据绝对安全，基于github的版本管理，想恢复到哪个历史版本都行；
5. 博客内容可以轻松打包、转移、发布到其它平台；
6. 等等；
```

效果：

![more效果](https://raw.githubusercontent.com/zc1789284658/Code-Note/master/git/images/effect.png)

