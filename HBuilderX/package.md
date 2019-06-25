---
title: HBuilderX打包
date: 2019-06-25
tags: [HBuilderX]
categories: [工具]
---

# HBuilderX打包

## 安卓：免费打包

### 需要jdk环境
#### 使用genkey

```cmd
C:\Users\87716> keytool -genkey -alias epic7docs_zc -keyalg RSA -keysize 2048 -validity 36500 -keystore epic7docs_zc.keystore

输入密钥库口令:
再次输入新口令:
您的名字与姓氏是什么?
  [Unknown]:  x
您的组织单位名称是什么?
  [Unknown]:  x
您的组织名称是什么?
  [Unknown]:  x
您所在的城市或区域名称是什么?
  [Unknown]:  x
您所在的省/市/自治区名称是什么?
  [Unknown]:  x
该单位的双字母国家/地区代码是什么?
  [Unknown]:  x
CN=x, OU=x, O=x, L=x, ST=x, C=x?
  [否]:  y

输入 <epic7docs_zc> 的密钥口令
        (如果和密钥库口令相同, 按回车):

Warning:
JKS 密钥库使用专用格式。建议使用 "keytool -importkeystore -srckeystore epic7docs_zc.keystore -destkeystore epic7docs_zc.keystore -deststoretype pkcs12" 迁移到行业标准格式 PKCS12。
```

<!--more-->

#### 使用行业标准格式 PKCS12
```cmd
C:\Users\87716> keytool -importkeystore -srckeystore epic7docs_zc.keystore -destkeystore epic7docs_zc.keystore -deststoretype pkcs12
```

---

## IOS：需要收费