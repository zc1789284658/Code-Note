// // 这是将要被劫持的对象
// const data = {
//   name: '',
//   age: "12",
//   "gender": 'man'
// };

// function say(name) {
//   if (name === '古天乐') {
//     console.log('给大家推荐一款超好玩的游戏');
//   } else if (name === '渣渣辉') {
//     console.log('戏我演过很多,可游戏我只玩贪玩懒月');
//   } else {
//     console.log('来做我的兄弟');
//   }
// }

// console.log(Object.keys(data))
// // 遍历对象,对其属性值进行劫持
// Object.keys(data).forEach(function (key) {
//   Object.defineProperty(data, key, {
//     enumerable: true,
//     configurable: true,
//     get: function () {
//       console.log('get');
//     },
//     set: function (newVal) {
//       // 当属性值发生变化时我们可以进行额外操作
//       console.log(`大家好,我系${newVal}`);
//       say(newVal);
//     },
//   });
// });

// data.name = '渣渣辉';
// //大家好,我系渣渣辉
// //戏我演过很多,可游戏我只玩贪玩懒月
// console.log('\r\n----------------')

var ceshi = {
  get: function(target, key) {
    test(key, "get");
    return target[key];
  },
  set: function(target, key, value) {
    test(key, "set");
    if (key === "age") {
      if (0 < value < 100) {
        console.log(`年龄是${value}`);
      }
      if (value > 100) {
        console.log("输入的年龄无效！！！");
      }
      if (value < 0) {
        console.log("年龄不能为负数");
      }
    } else {
      console.log("你传入的参数不对");
    }
    return true;
  }
};
function test(key, action) {
  if (key[0] === "_") {
    return console.log("你传入的参数不对，请重新传入参数");
  }
}
var target = {};
var proxy = new Proxy(target, ceshi);

console.log(proxy.age); //undefined
console.log((proxy.age = 20)); //年龄是20  20
console.log((proxy.age = 120)); //年龄是120      输入的年龄无效！！！ 120
console.log(proxy._age); //undefined
