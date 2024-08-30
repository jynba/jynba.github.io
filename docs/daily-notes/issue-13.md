## TypeScript基础类型

  :::tip 原文地址
  [TypeScript基础类型和内置类型 | GitHub](https://github.com/jynba/jynba.github.io/issues/13)
  :::
  一、简单基础类型
<html>
<body>
<!--StartFragment-->

JavaScript原始基础类型 | TypeScript类型
-- | --
number | number
boolean | boolean
string | string
null | null
undefined | undefined
symbol | symbol
bigInt | bigInt

<!--EndFragment-->
</body>
</html>

二、复杂基础类型
元组、枚举、Any、void、never、unknown

【详细参考】(https://juejin.cn/post/6997576373728444446)

## TypeScript内置类型一览
让我们来了解一下TypeScript官方的内置类型，让你的开发效率再上一层楼

* Pick
从类型中选择几个属性，形成新的类型
* Omit
去除类型中几个属性，形成新的类型
* Partical
让传入类型中的所有属性变成都是可选的
* Required
让传入类型中的所有属性变成都是必填的
* Record
构建一个类型，这个类型用来描述一个对象，这个对象的属性都具有相同的类型
_Record应该是日常使用频率较高的内置类型了，主要用来描述对象，一般建议是不用Object来描述对象，而是用Record代替，Record<string, any>几乎可以说是万金油了_
* Exclude
针对联合类型，取两个联合类型中不同的
* Extract
针对联合类型，取两个联合类型中相同的
* Parameters
获取传入函数的参数组成类型
...
参考：https://juejin.cn/post/7040300769072906277