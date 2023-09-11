# 如何用策略模式优化多个if-else？

### 一、策略模式

##### 定义

定义一系列的算法，把它们一个个封装起来，并且使它们可相互替换。

![img](https://pic1.zhimg.com/80/v2-7c20e73fdade6615874821f7e06f8ab4_1440w.webp)

策略模式由两部分构成：一部分是封装不同策略的策略类，另一部分是 Context。通过组合和委托来让 Context 拥有执行策略的能力，从而实现可复用、可扩展和可维护，并且避免大量复制粘贴的工作。策略模式符合`开放-封闭原则`。

##### 优势

- 方便在运行时切换算法和策略
- 代码简洁，避免使用大量的条件判断 if-else
- 关注分离，每个 strategy 控制自己的算法逻辑，strategy 和其使用者之间也相互独立

##### 应用场景

- 大量的`if-else`语句
- 想使用对象中各种不同算法变体来在运行时切换算法
- 拥有很多在执行某些行为时有着不同的规则

具体的应用场景有：表单验证、登录鉴权、数据压缩等

### 二、奖金计算例子

不同职位对应不同的奖金计算规则

##### 朴实无华的写法

```javascript
const getSalary = (type, salary) => {
	if (type === 'A') return salary * 4;
	if (type === 'B') return salary * 2;
	if (type === 'C') return salary * 1;
};
```

存在问题：

- getSalary 函数逻辑太多
- 复用性差：当需要在某处使用 typeA 的算法，不能复用只能复制。同一逻辑在不同位置实现，若后续需要修改`typeA`的计算逻辑时，则多个位置都需要修改，易错漏。
- 违背开放封闭原则：开放封闭原则要求函数应该对扩展开放，但对修改关闭。当需要新增类型 typeD 时，必须修改原有的 `getSalary` 函数，而不是扩展它。

##### 小改造——逻辑拆分成小函数

```javascript
const handleTypeA = (salary) => salary * 4;
const handleTypeB = (salary) => salary * 2;
const handleTypeC = (salary) => salary * 1;

const getSalary = (type, salary) => {
	if (type === 'A') return handleTypeA(salary);
	if (type === 'B') return handleTypeB(salary);
	if (type === 'C') return handleTypeC(salary);
};
```

改造的优点：将每个类型的处理逻辑封装在独立的函数中，后续如果需要修改类型的逻辑，只需关注相应的小函数，不必修改`getSalary`函数的逻辑，提高了可维护性和可复用性。

存在问题：依旧违背开放封闭原则，新增类型 typeD 时，还是需要在 getSalary 函数添加`if xxx`。

##### 策略模式改造——策略类和环境类

```javascript
//策略类封装具体的方法
const strategies = {
	A: (salary) => salary * 4,
	B: (salary) => salary * 2,
	C: (salary) => salary * 1,
};
//环境类接受用户请求，并委托给某一个策略
const getSalary = (type, salary) => {
	return strategies[type](salary);
};
```

改造的优点：

- 消除大量的 if-else 逻辑判断，通过对象的`key-value`映射的巧妙方式
- 遵循开放封闭原则：新增类型 typeD 时，只需在策略类 strategies 扩展一个类型即可，而不修改 getSalary 函数

### 三、表单验证例子

##### 朴实无华的写法

```html
<body>
	<form id="registerForm">
		用户名: <input type="text" name="userName" /> 密码：<input
			type="text"
			name="password" />
		手机号：<input type="text" name="phoneNumber" />
		<button type="submit">提交</button>
	</form>
	<script>
		let registerForm = document.getElementById('registerForm');
		registerForm.onsubmit = function () {
			if (registerForm.userName.value.trim() === '') {
				alert('用户名不能为空');
				return false;
			}
			if (registerForm.userName.value.length > 10) {
				alert('用户名不能超过10个字');
				return false;
			}
			if (registerForm.password.value.length < 6) {
				alert('密码不能少于6位');
				return false;
			}
			if (!/^1[3-9]\d{9}$/.test(registerForm.phoneNumber.value)) {
				alert('手机号码格式不正确');
				return false;
			}
		};
	</script>
</body>
```

##### 策略模式改造

1、定义策略类`strategies`对象，`key`作为规则的标识，`value`写具体的校验规则函数

- 需要根据表单来思考如何抽离出最本质的校验规则，例如用户名称长度限制 1-8 位、密码长度有限制 6-20 位，就可以抽离出`minLength`和`maxLength`，而具体是用户名还是密码，具体是几位长度的限制，通过参数来传递即可
- 校验规则函数的参数顺序有点重要，因为与下文的验证类`Validator`中的数据处理有关。

```javascript
// 策略类
const strategies = {
	isNotEmpty: function (value, errMsg) {
		if (value.trim() === '') {
			return errMsg;
		}
	},
	minLength: function (value, length, errMsg) {
		if (value.length < length) {
			return errMsg;
		}
	},
	maxLength: function (value, length, errMsg) {
		if (value.length > length) {
			return errMsg;
		}
	},
	isMobile: function (value, errMsg) {
		// 以1开头，第二个数字在3-9之间，后面还有九位数字
		if (!/^1[3-9]\d{9}$/.test(value)) {
			return errMsg;
		}
	},
};
```

2、定义验证类`Validator`，包含构造器`constructor`，`add`和`start`函数

- 核心是每一次处理完数据后，通过闭包的方式委托给策略类 `strategies` 里的某一个校验规则执行，即`return strategies[strategy].apply(dom, strategyArr);`
- 在构造器`constructor`里，定义一个`cache`空数组，用于存储验证规则的匿名函数。
- `add`函数是处理“调用代码”表单需要匹配的规则，一个表单项可以有多个规则，存放在数组`rules`。通过遍历 `rules` 数组，依次处理每个规则`rule`。
  - 对每个规则`rule`，首先解析出验证策略和错误消息，这将被用于后续的验证过程。
  - 然后创建一个匿名函数，将该函数添加到 `cache` 数组中。这个匿名函数把参数`strategyArr`处理完成后，通过调用策略对象中的相应验证函数，传入参数`strategyArr`来进行表单验证。
- `start` 方法用于执行表单验证。它遍历 `cache` 数组中的每一个匿名函数，依次执行这些函数，得到验证结果。
  - 如果验证失败（即匿名函数返回了错误消息），则立即返回该错误消息，表示验证未通过。
  - 如果所有验证规则都通过，最终返回 `undefined`，表示验证通过，可以提交表单数据。

```javascript
// 验证类
class Validator {
	constructor() {
		this.cache = [];
	}
	//dom为表单节点，rules为规则
	add(dom, rules) {
		//遍历每一个规则rule（如用户名有两个规则）
		for (let i = 0, rule; (rule = rules[i++]); ) {
			//比如minLength:2会分割成数组['minLength','2'];isNoEmpty是['isNoEmpty']
			let strategyArr = rule.strategy.split(':');
			//拿到错误信息
			let errMsg = rule.errMsg;
			//push一个匿名函数到cache数组中
			this.cache.push(() => {
				//从数组头部取一个元素，比如把['isNoEmpty']取出来就是'isNoEmpty'；把['minLength','2']取出来就是'minLength'
				let strategy = strategyArr.shift();
				//把用户输入即dom.value添加到strategyAry数组的第一位
				strategyArr.unshift(dom.value);
				//把errorMsg添加到strategyAry数组的最后一位
				strategyArr.push(errMsg);
				// 此时strategyAry为[dom.value,errorMsg]或者[dom.value,length,errorMsg]

				//指定函数内部的this值为dom，即表单节点，strategyAry为参数列表
				//一个函数内部返回一个函数，就是闭包，闭包指内部函数（被返回的函数）可以访问外部函数（包含它的函数）的变量
				return strategies[strategy].apply(dom, strategyArr);
			});
		}
	}
	start() {
		//遍历cache里的每一个匿名函数
		for (let i = 0, validatorFunc; (validatorFunc = this.cache[i++]); ) {
			let errMsg = validatorFunc();
			if (errMsg) {
				return errMsg;
			}
		}
	}
}
```

3、用户触发提交按钮

- 实例化验证类`Validator`，调用`add`方法，添加不同的表单项需要匹配的规则，`strategy`将在 add 方法中作为策略类`strategies`的 key 来匹配对应的规则
- 表单项规则添加完成后，要`return validator.start();`目的是开始执行表单验证，并返回验证结果。若返回 `undefined`，表示表单验证通过，没有错误消息；若返回`errorMsg`，则弹框提示用户。

```javascript
//调用代码
let registerForm = document.getElementById('registerForm');
let validataFunc = function () {
	let validator = new Validator();
	validator.add(registerForm.userName, [
		{
			strategy: 'isNotEmpty',
			errMsg: '用户名不能为空',
		},
		{
			strategy: 'maxLength:10',
			errMsg: '用户名不能超过10个字',
		},
	]);
	validator.add(registerForm.password, [
		{
			strategy: 'minLength:6',
			errMsg: '密码不能少于6位',
		},
	]);
	validator.add(registerForm.phoneNumber, [
		{
			strategy: 'isMobile',
			errMsg: '手机号码格式不正确',
		},
	]);
	return validator.start();
};
registerForm.onsubmit = function () {
	let errorMsg = validataFunc();
	if (errorMsg) {
		alert(errorMsg);
		return false;
	}
};
```

### 扩展：史诗的表单校验

可以了解下 [async-validator](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fyiminghe%2Fasync-validator) ，`element-ui` 和` antd` 的表单校验都是基于`async-validator`封装的，是史诗级别的表单校验

### 参考资料

[使用策略模式调用百度 AI 图像识别，使用策略模式封装 Vue Select 组件](https://juejin.cn/post/6844903670849470472?searchId=20230906112124D14538FE28A6705C822C)

[多端登录方式示例](https://juejin.cn/post/7165667166593744927?searchId=20230906112124D14538FE28A6705C822C)

https://juejin.cn/post/7270791767180345363?share_token=87013925-f1ef-460a-8985-c51489ff94d9

https://juejin.cn/post/6844904032826294286?searchId=2023090600170921E63C4E52A74124B12E#comment

https://senior-frontend.pages.dev/jsadvanced/designpattern.html
