### 需求：

  :::tip 原文地址
  [ElementUI表单项关联校验 | GitHub](https://github.com/jynba/jynba.github.io/issues/41)
  :::
  需要对表单中两个输入框相关联，可以两个都不存在或两个都存在，但不允许单个存在（需求真是无奇不有QAQ）
### 解决方法：
`首先明确需要用`{ validator: func(rule,value,callback) }`修改校验规则
1. 由于我将rules写在另一个cost.ts文件中，因此在cost.ts中无法获取到form中的变量，因此需要在script中修改才能获取到form中所需的变量。
于是我通过cloneDeep复制了cost.ts文件中的rules；
2. 我发现仅仅为每个表单项添加以下规则无法解决问题，**因为当两个都不存在时，需要清除另一个的校验，而通常情况下规则触发的机制是聚焦或失焦**
```js
if (a && !b) {
    callback(new Error(errorMessage));
} 
```
解决方法：formRef.value.clearValidate([`cost.${field2}`]);
清除另一个表单项的校验规则
最终代码：
```js
// 修复top_time和top_money、pre_time和pre_money的不能单个存在的校验
const fixRules = () => {
  const fixRules = cloneDeep(rules);
  const validateField = (field1, field2, errorMessage) => {
    return (_rule, _value, callback) => {
      if (!state.form.cost[field1] && !state.form.cost[field2]) {
        // 两个都不存在时，清除另一个的校验（由于另一个的触发机制是在聚焦/失焦，因此需要在此控制）
        formRef.value.clearValidate([`cost.${field2}`]);
        callback();
      } else if (state.form.cost[field2] && !state.form.cost[field1]) {
        callback(new Error(errorMessage));
      } else {
        callback();
      }
    };
  };
  fixRules.cost.pre_time = [{ validator: validateField('pre_time', 'pre_money', '请输入提前时间') }, ...normalRuleWithoutRequired];
  fixRules.cost.pre_money = [{ validator: validateField('pre_money', 'pre_time', '请输入提前费用') }, ...moneyOtherWithoutRequired];
  fixRules.cost.top_money = [{ validator: validateField('top_money', 'top_time', '请输入封顶费用') }, ...moneyOtherWithoutRequired];
  fixRules.cost.top_time = [{ validator: validateField('top_time', 'top_money', '请输入封顶时间') }, ...normalRuleWithoutRequired];
  return fixRules;
};
```