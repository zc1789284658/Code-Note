# NOTES
## web性能
### 1.资源方向
- 图片压缩
- 小图片转base64嵌入页面
- 使用fontCss或者svg（个人更习惯svg）
- 使用css-spirit 整合图片资源
- 文件prefetch/preload
    - prefetch : 将来可能会用到，空闲加载
    - preload : 关键资源，优先加载
- 懒加载  ：需要使用时再发请求加载
- css/js 合并压缩：看具体情况，单文件太大也不是好事
- cdn
- 服务器开启gzip等压缩算法压缩资源文件
- 请求合并
- js递归拆分
- js大循环使用 Duff's Device进行简化
    ```
    function duff(items) {
        var len = items.length, //缓存局部变量
            iterations = Math.floor(len / 8),  //商数，存放duff迭代次数
            startAt = len % 8,    //余数，存放duff一次迭代调用process的次数
            i = 0;
            
        do {
            switch(startAt) {
                case 0:
                    process(items[i++]);
                case 7:
                    process(items[i++]);
                case 6:
                    process(items[i++]);
                case 5:
                    process(items[i++]);
                case 4:
                    process(items[i++]);
                case 3:
                    process(items[i++]);
                case 2:
                    process(items[i++]);
                case 1:
                    process(items[i++]);
            }
            
            startAt = 0;
        } while(iterations--);    //书上是--iterations，貌似不对吧，应该是iterations--
    ```