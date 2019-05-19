// const C=require('./common.js')

// let a =function(e){
//     console.log(Date.now(),e)
// }
// let b =C.debounce(a,1000)
// let d =C.debounce(a,2000)
// let e = C.throttleByTimer(a,2000)
// b('1000')
// d('2000')

// setInterval(()=>{
//     e('e')
// },500)

let p = new Promise(function(resolve,reject){
    setTimeout(()=>{
        resolve()
    },500)
})

/**
 * Promise手写：1，状态2.队列，3失败成功描述,非异步
 */
class Promise2{
    constructor(fn){
        const _this = this;
        _this.succ_res = null;
        _this.erro_res = null;
        _this.status = '';
        _this.queue = [];

        let resolve = (...arg)=>{
            _this.succ_res = arg
            _this.status = 'succ'
            _this.queue.forEach((json)=>{
                json.succ(...arg);
            })
        }
        let reject = (...arg)=>{
            _this.erro_res = arg
            _this.status = 'err'
            _this.queue.forEach((json)=>{
                json.err(...arg);
            })
        }

        fn(resolve , reject);
    }
    
    then(succ,err){
        switch(this.status){
            case 'succ':
                succ(...this.succ_res);
                break;
            case 'err':
                err(...this.erro_res);
                break;
            case '':
                this.queue.push({succ,err})
        }
    }
}

// Promise2.all=function(arr){
//     let aResult=[];
//     return new Promise2(function(resolve,reject){
//         let i = 0;
//         next();

//         function next(){
//             arr[i].then(function(res){
//                 arr.push(res);

//                 i++;
//                 if(i = arr.length){
//                     resolve(aResult)
//                 }else{
//                     next()
//                 }
//             },reject);
//         }
//     })
// }

// Promise2.all([]).then(
//     arr=>{
//         console.log(arr,'succ')
//     },
//     err=>{
//         console.log(err,'fail')
//     }
// )

console.log('start')

let a = new Promise2((resolve,reject)=>{
    console.log('start promise\n')
    resolve('promise\n','2',3,4)
}).then((...args)=>{
    console.log('then\n',args,'then end')
    return args;
})
console.log('result\n',a)

console.log('sencond\n')

console.log('------------------------------')

console.log('start')

let b = new Promise((resolve,reject)=>{
    console.log('start promise\n')
    resolve('promise\n','2',3,4)
}).then((...args)=>{
    console.log('then\n',args,'then end')
    return args;
})
console.log('result\n',b)

console.log('sencond\n')