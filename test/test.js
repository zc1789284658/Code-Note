/**
 #下载babel decorator插件
 #.babelrc中添加decorator支持
 $ npm i @babel/core babel-loader @babel/preset-env -D
 $ npm i @babel/preset-es2015 -S
 $ npm i --save-dev @babel/plugin-proposal-decorators
.babelrc  {
    "presets": [
        "@babel/preset-env"
    ],
    "plugins": [
        [
            "@babel/plugin-proposal-decorators",
            {
                "decoratorsBeforeExport": true
            }
        ]
    ]
}
*/
//装饰类
@testDec
class Demo{

}
function testDec(target){
    target.isDec = true
}

console.log(Demo.isDec)
//装饰方法