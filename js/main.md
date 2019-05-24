# JS

## 关键字 in

- for-in 循环应该用在非数组对象的遍历上，使用 for-in 进行循环也被称为“枚举”。

```js
var Person = function() {};
Person.prototype.name = "Person";

var person = new Person();

console.log("name" in person); //true
console.log(person.hasOwnProperty("name")); //false
//上述console说明person本身没有name属性，但是其所属原型链中有
```

## Object.defineProperty && Object.defineProperties

- value/writable 不能与 get/set 同时被定义，因为一旦可以设置 get/set，那么 get/set 会篡改 value 以及 writable，引起预料之外的问题
- 意思大概就是不可能定一个属性即可以对它进行正常读写，又可以在它上面架设一层 getter/setter 来进行访问改写。

```js
var obj = {};
var property2;  //中间变量，防止get/set死循环
Object.defineProperties(obj, {
  property1: {
    configurable: true,
    enumerable: true,
    value: "this is property1",
    writable: true
    // get:function(){ console.log(arguments);return this.property1;},
    // set:function(){console.log(arguments);this.property1 = '666'}
  },
  property2: {
    configurable: true,
    enumerable: true,
    // value:"this is property1",
    // writable:true,
    get: function() {
      console.log("you got property2",this);
      return property2;     //get中不要使用obj.property2，否则会死循环，使用中间变量或者标识
    },
    set: function(newVal) {
      console.log("you set property2",this);
      property2 = newVal;  //set中不要用this.property2 =xxx,否则会死循环，使用中间变量或者标识
    }
  }
});
```
