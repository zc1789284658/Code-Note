---
title: Angular
date: 2019-06-25
tags: [js,angular]
categories: [前端]
---

# Angular
## ng 1.x(对ng历史不感兴趣的可以跳过)

        ng-app=''

        ng-model='a'   {{a}}

        ng-init='a=12;arr=[1,2,3,4]'

        ng-bind='a'             输出并覆盖到html中
        <div ng-bind='a'>我是：</div>   //div中将显示12

        ng-repeat='a in arr track by $index'
        ng中系统变量基本都带$前缀

        ng事件： onclick->ng-click=''，onmouseover->ng-mouseover,以此类推

        ng-show

        ng-if


### `controller`  
对应vue中的let vm =new Vue({})
1. 声明组件
2. 给组件添加controller
3. 挂载组件
4. 挂载controller
5. 挂载$scope函数时需要添加(),方便添加参数，并且不添加的话将失效，

        x ng-click='fn'
        √ ng-click='fn()'

```js
let mod = angular.module('name',[parentMod1,parentMod2,...parentMods])

mod.controller('ctrl1',function($scope,$http,$interval){
        alert(1);
        $scope.a=12;
        $scope.fn=function(){

        }
})
mod.controller('ctrl2',function(){
        alert(2)
})

<div ng-app='mod'>
    <div ng-controller="ctrl1">{{a}}</div>
    <div ng-controller="ctrl2" ng-click='fn()'></div>
</div>
```

### `小记`
ng1.x对异步数据不友好
1. 如jquery中的ajax获取到数据后赋值到$scope时，无法监听到
2. 由于出的比较早，数据检查形式为被动的脏检查，而vue后出，采用的是Observe主动检查
3. 解决：
- 1.执行$scope.$apply()，
- 2.使用controller中的$http模块

### `依赖注入`
> ng的controller中，arguments顺序随意编写，会自动处理，但是其原理还待解析，下两者等同 
```js
mod.controller('ctrl3',function($scope,$interval,$http){});
mod.controller('ctrl4',function($interval,$scope,$http){});
``` 

### `filter`，如
```js
{{birthday*1000|date:'yyyy-MM-dd'}}
//自定义filter：
mod.filter('mktime',(){})
```

---

## ng 4.x
`安装，新建项目`

        npm i -g @angular/cli
        ng new [projectname]
        //目录结构
        |-src
        |--app
        |---app.component.html
        |---app.component.css
        |---app.component.ts
        |---app.module.ts
        |--list
        |---list.component.html
        |---list.component.css
        |---list.component.ts
        |---list.module.ts
        |---list_item.component.html
        |---list_item.component.css
        |---list_item.component.ts

        html和css照样写
        ts中将组件export出去
        module中将组件进行挂载

`组件实例：`
```js
list.component.ts
import {Component} from '@angular/core'
@Component({
        selector:'List',        //对外使用的名称
        templateUrl:'',         //html模板地址
        styleUrls:[],           //css数组
        inputs:['str'],         //父组件传入的参数名
})
export class List{

}
//list.module.ts
```

```js
import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {xxx} from 'xxx'                 //组件引入
import {yyy} from 'xxx'                 //组件引入
@NgModule({
        declarations:[xxx,yyy],
        imports:[
                BrowserModule
        ],
        exports:[],
        providers:[],
        boostrap:[AppComponent]
})
export class ListModule{}
```

`解析：`
1. declarations：声明module使用了那些组件，
2. imports：该module使用了哪些module，
3. exports：该module对外暴露出哪些module
4. bootstrap：该module以那个为主

`传参(只能以变量的形式)：`
```
<list-item [str]='aaa'></list-item>
<list-item [str]='222'></list-item>
<list-item [str]='111'></list-item>
```

`使用参数`
```
//item.component.html
<li>{{str}}</li>
```

父组件
```
//list.component.ts
export class List{
        private aaa:string = 'hello'
}
```
子组件
```
@Component中添加inputs
export class ListItem{
        private str;
}
```

`循环`

ng4.x版本指令以*开头
```html
<li-item *ngFor='let a of arr' [str]='a'></li-item>
```

`事件`
```html
<li (click)='fn()'></li>
```

```js
export class ListItem{
        fn(){
                alert('a')
        }
}
```

`钩子函数和http连接`

```js
import {OnInit,Component} from '@angular/core'
import {Http} from '@angular/http'
export class ListItem{
        constructor(private http:Http){
                //下面方法将数据转为promise进行处理
                this.http.get('http://localhost:8080').toPromise()
                        .then(res=>{
                                this.arr=res.json();
                                console.log(res.json())
                        },err=>{
                                console.log(err)
                        });
                        //下面方法用于处理http/2中并行数据
                this.http.get('http://localhost:8080').forEach((res,err)=>{
                        console.log(res.json)
                })
        }

        ngOnInit(){

        }
}
```

`http依赖项`

1. 向框架请求http依赖项
2. 添加http依赖
在appmodule中引入httpModule
```js
import {HttpModule} from '@angular/http'
@NgModule({
        declarations:[],
        imports:[...restModule,HttpModule],
        exports:[],
        boostrap:[],
})
```

`router路由`

```js
import {RouterModule,Routes} from '@angular/router'
import {routeComponentModule} from 'xxxxxx'     //将组件以module形式exports出去，否则挂载时报找不到
@NgModule({
        ...rest,
        imports:[...rest,RouterModule]
})
```
`路由表`
```js
const routes:Routers=[
        {path:'a',component:CmpA},
        {path:'b',component:CmpB},
        {path:'c',component:CmpC},
]
```

```js
import {RouterModule,Routes} from '@angular/router'
import {CmpA} from '/component/CmpA'
import {CmpB} from '/component/CmpB'
const routes:Routes = [
        {path:'a',component:CmpA},
        {path:'b',component:CmpB}
]

export default RouterModule.forRoot(routes)
```
使用：非hash，即直接在路径中进行切换,好处是hash的#消失，坏处是会进行页面刷新，会不会与后台接口路径重复待确定

http:localhost:8080 ->http://localhost:8080/a

`子路由`
```js
const child:Routes=[
        {path:'c',component:'xxx'},
        {path:'d',component:'xxy'},
]
RouterModule.forChild('a',child)
```

`路由参数`
```js
import {ActivatedRoute,Params} from '@angular/router'

export class DetailComponent{
        private id:string;
        private data:Object;
        constructor(private http:Http,private route:ActivatedRoute){
                this.id= this.route.snapshot.params.id;
        }
        ngOnInit(){
                this.http.get().toPromise().then(res=>{},err=>{})
        }
}
```