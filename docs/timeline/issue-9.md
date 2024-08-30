> 复习一下正则表达式

  :::tip 原文地址
  [如何使用JS将驼峰转为横杠写法？(fooBarTest变为foo-bar-test) | GitHub](https://github.com/jynba/jynba.github.io/issues/9)
  :::
  
* `'/[a-z]/'.test(x)`可判断x是否为小写，返回true/false
* `'abc'.replace('/[a-z]/g',(item)=>item)`  g表示全局匹配，因此会将全局的小写字母替换为item

## 最终答案
```
function tuoTo(targetString) {
    return targetString.replace(/([A-Z])/g,function(match) {
        return '-' + match.toLowerCase()    
    })
}
console.log(tuoTo('qiLin'))
```