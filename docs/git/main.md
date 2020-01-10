---
title: git
date: 2019-06-25
tags: [git]
categories: [工具]
---

# git

## 连接过ssr后，push不上去  fatal: unable to access 'https://github.com/zc1789284658/Code-Note.git/': Empty reply from server

本来已经启用了shadowsocks开启了代理，能够正常服务github的网站。但是在使用git工具时，git clone时却一直出现这个报错，即使shadowsocks开全局模式也不行。原因是这个git客户端访问github没有走ss的代理。

解决办法，在开启shadowsocks的前提下，手动配置git的代理。git客户端输入如下两个命令就可以了。
$ git config --global http.proxy http://127.0.0.1:1080
$ git config --global https.proxy http://127.0.0.1:1080


取消代理：
$ git config --global --unset http.proxy 
$ git config --global --unset https.proxy 

## 
$ git config http.sslVerify "false"

## 
$ git config --global credential.helper store

## git全局仓库设置

git config --global user.name  xxxxx
git config --global user.email xxxxxxxx

## git当前仓库用户设置

git config --local user.name  xxxxx
git config --local user.email xxxxxxxx

## ssh测试链接是否正常

    ssh -T git@github.com
    ssh -T git@gitlab.com
    ...

## git多ssh管理

### 1.ssh-keygen 创建新ssh
    ```bash
    ssh-keygen
    ```

### 2.本地链接新仓库host信息
    ```bash
    git remote show origin
    ```

### 3.在.ssh/目录下添加config配置各网址所使用的ssh-key

#### 3.1 .ssh目录
    ```bash
    # windows:
    $ cd C:\Users\xxx\.ssh
    # linux:
    $ cd ~/.ssh
    ```

#### 3.2 生成的ssh通过ssh-add添加(临时添加/永久添加需要脚本协助)
    ```bash
    $ ssh-agent
    # if windows , use Administrator account to excuse POWERSHELL，and excute `Set-Service -Name ssh-agent -StartupType automatic`，then excute `ssh-agent`
    $ ssh-add C:\Users\EDZ\.ssh\id_rsa
    $ ssh-add C:\Users\EDZ\.ssh\id_rsa_github
    ```

#### 3.2 创建config
    ```bash
    $ touch config
    $ vi config
    ```

#### 3.3 添加配置
    ```bash
    #  /.ssh/config
    Host github
        HostName github.com
        IdentityFile ~/.ssh/id_rsa_github
    Host gitlab
        HostName gitlab.com
        IdentityFile ~/.ssh/id_rsa
    ```