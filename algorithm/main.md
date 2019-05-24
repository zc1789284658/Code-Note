# 算法
## 排序
- 1.快速排序

    ```js
    let quickSort=(arr)=>{
        if(arr.length ===0){
            return []
        }
        let left = [];
        let right = [];
        let pivot = arr[0];
        for(let i=1,l=arr.length; i<l; i++){
            if( arr[i] < pivot ){
                left.push(arr[i])
            }else{
                right.push(arr[i])
            }
        }

        return quickSort(left).concat(pivot,quickSort(right))
    }
    console.log(quickSort([1,0,3,6,9,454,89,56,123,54,8789,31,21,498788,45,23123,456,897,1231,546548,78994]))
    ```


- 归并排序

    > 分治策略：拆分为子序列，子序列排序完后合并为大序列

    ```js
    let counter1 = 0
    let counter2 = 0

    let mergeSort = (arr) => {
        if (arr.length < 2) {
            return arr;
        }
        let middle = Math.floor(arr.length / 2)
        let left = arr.splice(0, middle)

        console.log('counter1',counter1++)
        return merge(mergeSort(left),mergeSort(arr))
    }

    let merge = (left, right) => {
        var result = [];

        while(left.length && right.length){
            if(left[0] < right[0]){
                result.push(left.shift())
            }else{
                result.push(right.shift())
            }
        }
        
        console.log('counter2',counter2++)
        return result.concat(left,right)
    }

    console.log(mergeSort([10,5,6,8,9,7,1,5,68,9,158,8998,9,5456]))
    ```