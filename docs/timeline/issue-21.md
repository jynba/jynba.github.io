### 思路

  :::tip 原文地址
  [如何实现add[2][3][4] = 9、add[4]+2 = 6 ? | GitHub](https://github.com/jynba/jynba.github.io/issues/21)
  :::
  > add是一个对象,对象可以添加属性，属性值返回一个对象，可以返回一个值（当遇上符号时）
* 使用proxy代理add对象，其中属性加到初始值_store上，当代理的属性是符号(即遇到 Symbol.toPrimitive属性)时，则直接返回_store进行运算。
* 注意点：Symbol.toPrimitive、如何使得不同add互不干扰、prop字符串需转为数字
```js
  <script>
      //1. 如何实现add[2][3][4] = 9、add[4]+2 = 6 ?
      const ADD = () => {
        const add = new Proxy(
          {
            _store: 0,
          },
          {
            get(target, prop, receiver) {
              // symbol.toPrimitive将对象描述为原始值转换
              //#region
              // console.log(target, prop, receiver);
              // Symbol.toPrimitive 允许我们将对象描述为原始值转换
              // 如果没有 Symbol.toPrimitive，那么 JavaScript 将尝试寻找 toString 和 valueOf 方法
              /*
              [Symbol.toPrimitive](hint) {
                alert(`hint: ${hint}`);
                return hint == "string" ? `{name: "${this.name}"}` : this.money;
              }
              等价于
              toString() {
                return `{name: "${this.name}"}`;
              }
              valueOf() {
                return this.money;
              }
              （string优先调用toString，其他优先调用valueOf）
              */
              //#endregion

              // 如果是+号（或其他符号）的话（加号也能进入get），则直接返回_store
              if (prop === Symbol.toPrimitive) {
                return () => target._store;
              }
              target._store += +prop;
              //返回代理对象
              return receiver;
            },
          }
        );
        return add;
      };
      const add1 = ADD();
      // 通过闭包使得不同的add互不干扰
      console.log(ADD()[2][3][4]);
      // add[2][3];
      // console.log(add[2] + 4);
    </script>
```  
