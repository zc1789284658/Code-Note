# vue笔记

## 1.组件中传参
- this.$attrs.data
- data={}
```
<ListItem :data='data' :plus='plus' :minus='minus'>
```
//传函数,优点没有，可以传，但是不建议，结构复杂时修改会死人

---

## 2.v-model='checked'
可以监视checked属性（dom意义上以及vue-data意义上）

{
    methods:{
        minus(){}
        plus(){}
    }
}

---

## 3.axios
```
Vue.prototype.axios=axios;
new Vue({
    axios,
    xxxxx,
    xxxx,
    filters:{
        mktime(t){
            return t*100
        }
    },
    methods:{

    }
})
async mounted(){
    let res = (await this.axios(url)).data;
}
```

---

## 4.filters
处理数据，一般将相对简单的数据处理函数由methods拆分到filters，使用方法：
```
:title={{data.time|mktime}}
```

---

## 5.vuex
### 5.1 状态管理
- 1.state
    全局唯一
    拆分module

- 2.getter
    
- 3.mutation
    修改状态操作
    进行追溯

- 4.action
    提交mutation
- 官方说法 mutaion同步 action异步
- 5.modules
    state拆分
    1.进行数据分割
    2.父子集action和mutation可重名，执行时将从父级到子集一并执行，便于将操作拆分


### 5.2 创建store
```
const store = new Vuex.Store({
    strict:true,
    state:{
        count:0
    },
    mutations:{
        add_count(state,arg){
                xxxx
        },
        minus_count(state,arg){
                xxxx
        }
    },
    actions:{
        add_count(store,arg){
            console.log(store)
            store.commit('add_count',arg)
        },
        minus_count({commit},arg){
            commit('minus_count',arg)
        }
    },
    getters:{
        getCount(state,){

        }
    }
})

this.$store.dispatch('add_count',参数)

this.$store.state.a;    
this.$store.getters.a;  //相比于state，可以添加中间层，如缓存，重复判断，节流防抖等
```

### 5.3 注册
```
Vue.use(Vuex)

new Vue({
    xxx,
    xxx,
    router,
    store
})
```

### 5.4 流程
> 组件 dispath -> action ->commit ->mutation state.xxx-> state

### 5.5 注意事项
- vuex需要与computed交互使用，否则会出现在mutation中直接赋值时，监听失效的情况，需要computed做中间层进行监听
如 
```
let a=12,
let b =a,
a=15,   //b=12
```

### 5.6 手动触发action
1. 如mouted内进行this.$store.dispatch,适合异步操作
2. 通过getters
    computed进行监听处理，但是如果是异步的话，会很麻烦，async与await与computed兼容差，但是computed还需要触发，导致两难，适合通过不操作

> async可以添加到任何方法上，除非无法使用，async方法的父级function也必须是async方法

---

## 6.vue文件
```
<template>
    <Header/>
</template>
<script>
import Header from './components/header'
export default{
    name:"xxx",
    components:{
        Header
    }
}
</script>
```
```
import MainIndex from './src/main'
import MainIndex_inner from './src/main_inner'
var router = new VueRouter({
    routes:[
        {
            path:'',
            name:'',
            component:MainIndex,
            children:[
                path:'',
                name:'',
                component:MainIndex_inner
            ]
        },
        {}
    ]
})
```

---

## 7.lazyload.
webpack检测到组件函数化写法时，将会把Header模块拆离主文件，当使用到Header时在进行加载

```
export default{
    xxx,
    xxx,
    components:{
        Header(){return import  ('./src/components/header')},
        Footer:()=>require ('@/components/footer')
    }
}
```
```
几个命令
vue list 
vue init webpack test1
```

---

## 8.vue transition 标签
假如动画class为animate则
```
.animate-enter{}
.animate-enter-active{}
.animate-enter-to{}
.animate-leave{}
.animate-leave-active{}
.animate-leave-to{}
```
```
<transition name='animate'></transition>
```
### 8.1 添加事件

- @before-enter        @before-leave
- @enter               @leave
- @after-enter         @after-leave
- @enter-cancelled     @leave-cancelled

### 8.2 强制添加 v-for以及:key属性
```
<transition-group>
</transition-group>
<transition :enter-class="" :enter-active-class="" :enter-to-class="" 
            :leave-class="" :leave-avtive-class="" :leave-to-class="">
</transition>
```
> 不使用规定的class名称限制时，需要手动添加

### tips:
>vue-animate.css直接使用name即可

---

## 9.vue 无法监听基本元素组成的数组
如
```
[true,1,'1'],
```
>因为监听需要将对象修改为Obeserve对象，而基本类型无法转换
>当前vue使用的为Object.defineProperty进行【**对象属性监听**】，后续如果vue使用proxy进行【**对象监听**】，将解决此类问题（新添属性无法监听[由于是属性监听，新添加的属性自然未进行初始化Observe]，直接使用下标修改数组元素无法监听）

### 解决：
- 1.$set 
- 2.内部改成object形式

---

## 10.router跳转时，
- 可以监听route
    ```
    watch:{
        '$route'(){

        }
    }
    ```
- 可以通过添加beforeUpdateRoute(){}

---

## 11.Render函数
new Vue({
    el:'#app',
    render:(mounte)=>{mounte(App)}
})