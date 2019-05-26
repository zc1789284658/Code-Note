# 迭代器模式
- 外部迭代器 
    - 必须显式地请求迭代下一个元素,如var next = Iterator.next()
- 内部迭代器
    - 传入函数，自动根据下标取元素执行函数
> 自定义内部迭代器
```js
var forEach = function(item , fn){
    if(!item.length){
        throw 'the arguments is not iterable'
    }
    for(var i = 0, l = item.length ; i < l ; i++){
        fn(item[i] , i)
    }
}

forEach([1,2,3,4,5],function(item , idx){
    console.log(item , idx)
})
//1 0
//2 1
//3 2
//4 3
//5 4
```
> 自定义内部迭代器
```js
var Iterator = function(obj){
    var current = 0;
    var next = function(){
        current++;
    }
    var isDone = function(){
        return current >= obj.length
    }
    var getCurrentItem =function(){
        return obj[current]
    }
    return {
        next:next,
        isDone:isDone,
        getCurrentItem:getCurrentItem,
        length:obj.length
    }
}

var iterator = Iterator([1,2,3,4,5,6])
console.log(iterator.getCurrentItem())//1
console.log(iterator.next(),iterator.getCurrentItem(),iterator.isDone())//undefined 2 false
console.log(iterator.next(),iterator.getCurrentItem(),iterator.isDone())//undefined 3 false
console.log(iterator.next(),iterator.getCurrentItem(),iterator.isDone())//undefined 4 false
console.log(iterator.next(),iterator.getCurrentItem(),iterator.isDone())//undefined 5 false
console.log(iterator.next(),iterator.getCurrentItem(),iterator.isDone())//undefined 6 false
console.log(iterator.next(),iterator.getCurrentItem(),iterator.isDone())//undefined*2 true
console.log(iterator.next(),iterator.getCurrentItem(),iterator.isDone())//undefined*2 true
```

> 对于ES6中部分实现iterator接口的数据类型，可以使用xxx.[Symbol.iterator]()获取迭代器
```js
var arr = [1,2,3];
let iterator = arr[Symbol.iterator]();
 
console.log(iterator.next());  //{ value: 1, done: false }
console.log(iterator.next());  //{ value: 2, done: false }
console.log(iterator.next());  //{ value: 3, done: false }
console.log(iterator.next());  //{ value: undefined, done: true }
```

> ES6 中的 of关键字，可以对所有实现了iterator接口的对象进行迭代
```js
var arr = [1,2,3,4,5]

var obj = {a:1,b:2,c:{name:'fu'}}

var map = new Map()
    map.set('age',18)
    map.set('name','wangwu')
    map.set('gendet','man')

var set = new Set()
    set.add(5)
    set.add(5)
    set.add(2)
    set.add(3)
    set.add(4)

console.log(map,set,arr)   
//Map { 'age' => 18, 'name' => 'wangwu', 'gendet' => 'man' } Set { 5, 2, 3, 4 } [ 1, 2, 3, 4, 5 ]

console.log('-----------')

for(let item of arr){
    console.log(item);//1 2 3 4 5
}

console.log('-----------')

for(let item of map){
    console.log(item);  //[ 'age', 18 ]     [ 'name', 'wangwu' ]    [ 'gendet', 'man' ]
}

console.log('-----------')

for(let item of set){
    console.log(item);// 5 2 3 4
}

console.log('-----------')

for(let item of obj){
    console.log(item);//TypeError: obj is not iterable,对象未实现iterator接口，无法使用of关键字进行迭代
}
```

