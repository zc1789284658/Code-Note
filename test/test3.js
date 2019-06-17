// class Drink{
//     constructor(){
//         this.init()
//     }
//     boilWater(){
//         console.log('烧热水')
//     }
//     brew(){}
//     pourInCup(){}
//     addCondiments(){}
//     init(){
//         this.boilWater()
//         this.brew()
//         this.pourInCup()
//         this.addCondiments()
//     }
// }

// class Coffee extends Drink{
//     brew(){console.log('冲咖啡')}
//     pourInCup(){console.log('倒咖啡')}
//     addCondiments(){console.log('加糖/牛奶')}
// }

// class Tea extends Drink{
//     brew(){console.log('冲茶叶')}
//     pourInCup(){console.log('倒茶水')}
//     addCondiments(){console.log('加柠檬')}
// }
// new Coffee()
// new Tea()


var Drink = function (param) {

    var boilWater = param.boilWater || function () {
        console.log('烧热水 BY Drink')
    }
    var brew = param.brew || function () {

    }
    var pourInCup = param.pourInCup || function () {

    }
    var addCondiments = param.addCondiments || function () {

    }
    var needCondiments = param.needCondiments || function () {
        return true
    }

    var F = function () {
        this.init()
    }
    F.prototype.init = function () {
        boilWater();
        brew();
        pourInCup();
        if (needCondiments()) {
            addCondiments();
        }
    }
    return F
}

var Coffee = Drink({
    brew() {
        console.log('brew BY Coffee')
    },
    pourInCup() {
        console.log('pourInCup BY Coffee')
    },
    addCondiments() {
        console.log('addCondiments BY Coffee')
    },
    needCondiments() {
        console.log("Coffee Don't Need Condiments");
        return true;
    }
})

var Tea = Drink({
    brew() {
        console.log('brew BY Tea')
    },
    pourInCup() {
        console.log('pourInCup BY Tea')
    },
    addCondiments() {
        console.log('addCondiments BY Tea')
    },
    needCondiments() {
        console.log("Tea Do Need Condiments");
        return false
    }
})

new Coffee();
new Tea();