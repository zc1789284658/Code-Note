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