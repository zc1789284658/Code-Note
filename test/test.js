// let debounce = function(fn,sec){
//     let timer=debounce.getTime();
//     let a=()=>{
//         let now= debounce.getTime();
//         if(now - timer > sec){
//             fn()
//             timer = debounce.getTime()
//         }else{
//             // console.log(now - timer , sec)
//         }
//         a.timer =timer;
//     }
//     return a;
// }
// debounce.getTime = ()=>{
//     return new Date().getTime();
// }

// let fn=()=>{
//     console.log(1)
// }
// let fn2=()=>{
//     console.log(2)
// }


// let c  =  debounce(fn,1000)
// let d  =  debounce(fn2,3000)


// setInterval(()=>{
//     c();
//     d();
// },1000)


var SuperVipRate=(type)=>{
    if(type === 2){
        console.log("超级会员")
        return 0.8
    }else{
        return false
    }
}
var VipRate=(type)=>{
    if(type === 1){
        console.log("普通会员")
        return 0.95
    }else{
        return false
    }
}

var NotVipRate=(type)=>{
    console.log("普通用户")
    return 1
}

// var Chain = function(fn){
//     this.fn = fn
// }
// Chain.prototype.setNext=function(next){
//     this.next = next
// }
// Chain.prototype.run = function(arg){
//     if(!this.fn(arg)){
//         this.next.run(arg)
//     }
// }
// var Chain1= new Chain(SuperVipRate);
// var Chain2= new Chain(VipRate);
// var Chain3= new Chain(NotVipRate);

// Chain1.setNext(Chain2)
// Chain2.setNext(Chain3)

// Chain1.run(2);

// Chain1.run(1);

// Chain1.run(0);

Function.prototype.after = function(fn){
    var self = this;
    return function(){
        var ret = self.apply(this,arguments);
        if(!ret){
            return fn.apply(this,arguments)
        }
        return ret
    }
}

var AopChain = SuperVipRate.after(VipRate).after(NotVipRate);
AopChain(2)
AopChain(1)
AopChain(0)