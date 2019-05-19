/**
 * 本节代码实例主要为
 */

let debounce =(fn,delay)=>{
    let timer;
    return function(...args){
        timer? clearTimeout(timer):'';
        timer = setTimeout(()=>{
            fn(...args)
        },delay)
    }
}

let throttleByTimestamp=(fn,interval)=>{
    let lasttimestamp;
    return (...args)=>{
        if(!lasttimestamp){
            console.log(lasttimestamp);
            lasttimestamp = Date.now();
            return fn(...args)
        }
        console.log(Date.now()-lasttimestamp , interval)
        if( Date.now()-lasttimestamp > interval){
            lasttimestamp = Date.now();
            fn(...args)
        }
    }
}

let throttleByTimer=(fn,interval)=>{
    let timer
    return (...args)=>{
        if(!timer){
            timer=setTimeout(()=>{
                timer=null;
                fn(...args);
            },interval)
        }
    }
}

module.exports =  {
    debounce,
    throttleByTimestamp,
    throttleByTimer
}