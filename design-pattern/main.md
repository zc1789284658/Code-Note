# 设计模式（js）
## 创建类模式
### 构造器模式
> 关键词：使用原型/类，替代重复的对象创建操作
```js
//使用构造器模式前
var wangyi = {
    name:'wangyi',
    age:50,
    gender:'男'
}
var wanger = {
    name:'wanger',
    age:50,
    gender:'男'
}
var wangsan = {
    name:'wangsan',
    age:50,
    gender:'男'
}
var wangsi = {
    name:'wangsi',
    age:50,
    gender:'男'
}
console.log(wangyi,wanger,wangsan,wangsi)

//--------------------使用构造器模式后---------------
function Person(name , age , gender){
    this.name = name;
    this.age = age;
    this.gender = gender;

    //此处函数会复制到每一个new出来的实例中，需要原型模式优化
    this.getAge = function(){
        return 'my age is :'+ this.age
    }
}

var wangyi = new Person('王一',50,'男')
var wanger = new Person('王二',50,'男')
var wangsan = new Person('王三',50,'男')
var wangsi = new Person('王四',50,'男')
console.log(wangyi,wanger,wangsan,wangsi)
```
### 原型模式
> 将共用的属性/函数，挂载到原型中，免于每次new对象时，都将公用的部分复制一份到实例中

```js
//以上面构造器模式为例，修改后
Person.prototype.getAge = function(){
    return 'my age is :'+ this.age
}
```
> ES6 class 为构造器模式和原型模式的结合
```js
//ES6 class
class Person {
    constructor((name , age , gender){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    getAge(){
         return 'my age is :'+ this.age
    }
}

```
### 构建者/创建者/创造者 模式
> 对象的结构不变的情况下，需要在创建对象前，进行各种中间层处理时，可以使用创建者模式，交由创建者统一管理创建（统一管理后，便于统计/验证/管理）
```js
//ES5
function Student(){}

function StudentBuilder(){
    this.student = new Student();
}
StudentBuilder.prototype.setName = function(name){
    //可以添加中间层，例如统计/验证规则/入口管理等，防止出现在其他地方设置属性，导致出现难以查找的bug
    this.student.name = name;
}
StudentBuilder.prototype.setAge = function(age){
    this.student.age = age;
}
StudentBuilder.prototype.setGender = function(gender){
    this.student.gender = gender;
}
StudentBuilder.prototype.build = function(){
    return this.student;
}

var studentBuilder =new StudentBuilder();
studentBuilder.setName('wangsi');
studentBuilder.setAge(99);
studentBuilder.setGender('男');
studentBuilder.build();

//ES6
var StudentCreatedCount = 0;
var StudentBuiltCount = 0;
class Student{
    constructor(){

    }
}
class StudentBuilder{
    constructor(){
        StudentCount ++;
        this.student = new Student()
    }
    setName(name){ 
        this.student.name = name 
    }
    setAge(age){ 
        this.student.age = age; 
    }
    setGender(gender){ 
        this.student.gender = gender;
    }
    build(){
        console.log(`has created ${StudentCreatedCount} student , has built {StudentBuiltCount} student`)
        return this.student
    }
}

var a = new StudentBuilder();
var b = new StudentBuilder();
var c = new StudentBuilder();
var d = new StudentBuilder();
var e = new StudentBuilder();
var f = new StudentBuilder();
var g = new StudentBuilder();
a.build();
b.build();
c.build();
d.build();
e.build();
f.build();
g.build();
//has created 7 student , has built 1 student
//...
//has created 7 student , has built 7 student

```

### 工厂模式
> 根据入参的不同，创建**部分参数不同**的对象或者**不同类型的对象**
```js
//ES5
function Student(name,subjects){
    this.name =  name;
    this.subjects = subjects;
}
function  StudentFactory(name,type){
    switch(type){
        case "LIBERALARTS":
            return new Student(name,['政治','历史','地理']);
            break;
        case "SCIENCE":
            return new Student(name,['物理','化学','生物'])
            break;
        default:
            throw 'StudentFactory arguments error: not valid argument `type`:'+type 
    }
}
var whh = StudentFactory('王花花','LIBERALARTS')
var lsd = StudentFactory('李双但','SCIENCE')
console.log(whh,lsd)
//Student { name: '王花花', subjects: [ '政治', '历史', '地理' ] } Student { name: '李双但', subjects: [ '物理', '化学', '生物' ] }

//ES6
class Student{
    constructor(name , subjects){
        this.name =  name
        this.subjects = subjects
    }
}
const StudentFactory(name , type) =>{
     switch(type){
        case "LIBERALARTS":
            return new Student(name,['政治','历史','地理']);
            break;
        case "SCIENCE":
            return new Student(name,['物理','化学','生物'])
            break;
        default:
            throw `StudentFactory arguments error: not valid argument 'type':${type}`
    }
}

const whh = StudentFactory('王花花','LIBERALARTS')
const lsd = StudentFactory('李双但','SCIENCE')
const error = StudentFactory('李双但','error')
console.log(whh,lsd)
//StudentFactory arguments error: not valid argument 'type':error
```


## 单例模式



## 发布订阅模式

## 观察者模式


## 迭代器模式

## 代理模式

## 