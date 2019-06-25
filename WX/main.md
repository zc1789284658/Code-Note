---
title: 微信相关
date: 2019-06-25
tags: ['wx']
categories: [前端]
---
# 微信
- 1.订阅号
    每天一次推送，个人可注册
- 2.服务号
    每月4次推送，功能复杂
- 3.小程序
    功能强，不能推送

<!--more-->

---

## 0.WXML+JS+WXSS
- 自定义标签+自定义属性
- JS类似于vue
- API

## 1.事件
- bind:事件   正常事件
- catch:事件  正常事件不冒泡
- capture-bind:事件   捕获事件
- capture-catch:事件  捕获不冒泡
- 以上都可以加冒号[:]以及省略冒号
- 无click，有tap

## 2.单位
- rpx，设备总宽度750rpx（无论多宽，都为750rpx（relative pixel？））

## 3.标签
- view，scroll-view， button......

## 4.缓存
- 小程序缓存存于为微信中

## 5.API
- 登陆扫码等都在公众平台API中

## 6.输出输入变量
- wx输出变量(除了函数)时，都需要用`双大括号`进行包裹，无论是作为wxml的属性还是内容，否则将解析为字符串,如 hidden="{{true}}";
- 输出函数时，无法添加参数，需要参数时添加data-xxx;
- 取data-xxx时，可以通过event进行获取，ev.target.dataset.xxx;
```html
<scroll-view scroll-y="{{true}}">
    <view class='parent'>
        <view wx:for="{{arr}}" class="{{index===now?'active':'now'}}" bind:tap="setnow" data-index='{{index}}'>{{item}}</view>
     </view>
</scroll-view>
```

## 7.wx:for循环
- 循环中wx系统定义的下标以及元素：index/item
```html
<view wx:for="{{arr}}" wx:key="{{index}}"> 
        {{index}}:{{item}}
</view>
```   
- 重命名下标以及元素字面量
-  wx:for-item="element" wx:for-index="idx"

## 8.wx:if="{{xxx}}"

## 9.操作数据以及钩子函数
```html
<!-- 函数内获取 ：this.data.xxx
    页面内获取 ：{{xxx}} 
    函数内设置：this.setData({xxx:xxxx,...args})
    -->
Page({
    data:{
        show:true
    },
    fn(){
        this.setData({
            show:!this.data.show
        })
    },
    onLoad(Object query){},
    <!-- 生命周期函数 -->
    onShow(),
    onReady(),
    onHide(),
    onUnload(),
    <!-- 页面事件处理函数 -->
    onPullDownRefresh(),
    onReachBottom(),
    onPageScroll(Object),
    onShareAppMessage(Object),
    onResize(object),
    onTabItemTap(Object),
    <!-- 组件事件处理函数 -->
    <!-- Page.route，Page.prototype.setData(Object data, Function callback) -->

})
```

## 10.开发者工具
- 将wxml解析为html后，渲染完毕后再解析会wxml进行开发者工具展示
- wxml->html->wxml
- 在html->wxml时，会出现bug，导致代码层级和实际显示的层级不一致

## 11.远端获取数据
```js
wx.request({
    url:,
    dataType,
    success(res){},
    fail(){e}
})
```

结合Promise

```js
wx.$request = function(){
    return new Promise(function(resolve,reject){
        wx.request({
            url:'xxxxxx',
            success:function(res){
                resolve(res)
            },
            fail:function(e){
                reject(e)
            }        
        })
    })
}
```
## 12.页面切换
```js
<!-- 页面跳转 -->
<view>
    <navigator url="/pages/cam/cam"></navigator>
</view>
<!-- js跳转 -->
    wx.navigatorTo...
```
## 13.拍照
- 配合<camera>标签使用
```js
const cam = wx.createCameraContext();
cam.takePhoto({
    quality:'high',
    success:(res)=>{
        this.setData({
            src:res.tmpImagePath;
        })
    }
})
```
## 14.扫码
```
wx.scanCode()...
```
## 15.扒小程序
- 利用抓包工具抓包
- 缺点：只能抓编译后代码

## 16.插件
- 插件都有id
    * 插件所属的小程序的id
- 写插件
    * 插件里面可以有多个page
    * 插件需要声明：哪些需要输出public
- 用插件
    * 声明：引用哪些插件
- 插件项目
    * |-miniprogram\    测试目录,主要有app.json
    * |--pages
    * |---index.js
    * |---index.wxml
    * |---index.json    引入插件中的Component
    * |--app.js
    * |--app.json       引入对方插件
    * |-doc\
    * |-plugin\         主体目录,主要有index.json中的publicComponent
    * |-project.config.json

## 17.声明：
```
小程序
    APP({})
    Page({})
组件（插件）
    Component({})
```

## 18.底部菜单栏
app.json中，一级输入tab，即可自动提示如下内容
```js
{
    "tabBar": {
        "list": [{
            "pagePath": "pages/index/index",                    //导航至哪个页面
            "text": "index",                                    //显示文字
            "iconPath": "asset/images/index/home.png",          //默认图标
            "selectedIconPath": "asset/images/index/home.png"   //选中图标
        }]
    }
}
```
![](https://raw.githubusercontent.com/zc1789284658/Code-Note/master/WX/images/wx-tabbar.png)