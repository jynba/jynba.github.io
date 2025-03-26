### 需求背景

  :::tip 原文地址
  [动态新增/删除表单，如何绑定ref使得校验规则生效 | GitHub](https://github.com/jynba/jynba.github.io/issues/70)
  :::
  * 需要使用动态增加和删除表单来动态添加游戏应用，动态表单中需要动态绑定ref，写rule来对表单内容校验

### 解决方法
```js

  <div v-for="form, formidx in state.game_apps">
    <el-form :ref="el => formRefs[formidx] = el" label-position="right" label-width="150px" :model="form"
      :rules="rules">
      <el-form-item label="应用名称" prop="game_app_name">
      </el-form-item>
    </el-form>
  </div>

  const rules = {
    game_app_name: [{ required: true, message: '请输入应用名称', trigger: 'blur' }],
  };
  const formRefs: Ref<any>[] = [];
  const validate = async () => {
    const results = await Promise.all(formRefs.filter(Boolean).map(formRef => formRef?.validate()));
    return results.every(result => result);
  };
  
```
#### ` :ref="el => formRefs[formidx] = el"`的作用是什么，可以写成:ref=" formRefs[formidx]l"吗

#### 一、`:ref="el => formRefs[formidx] = el"` 的作用**
这段代码的作用是动态地将每个 el-form 组件的实例引用存储到 formRefs 数组的对应索引位置中。

* el：是当前 el-form 组件的实例。
* formRefs[formidx] = el：将当前 el-form 的实例存储到 formRefs 数组的 formidx 索引位置。

这种写法适用于动态生成的表单（如通过 v-for 渲染的表单），因为 formidx 是动态的索引，能够确保每个表单实例都存储在正确的位置。

#### 二、是否可以写成 :ref="formRefs[formidx]"？
**不可以**，原因如下：

ref 属性的工作机制：
ref 的值需要是一个字符串（Vue 2）或一个函数（Vue 3）。
如果直接写成 :ref="formRefs[formidx]"，Vue 会尝试将 formRefs[formidx] 的值作为 ref 的目标，而不是将组件实例赋值给 formRefs[formidx]。
动态索引的需求：

在动态生成的表单中，formidx 是一个动态的索引，必须通过函数的方式将实例存储到正确的索引位置。
如果直接写成 :ref="formRefs[formidx]"，无法动态地将实例存储到数组的对应位置。

### 总结
* **动态表单**：必须使用` :ref="el => formRefs[formidx] = el" `的写法，确保每个表单实例都存储在 formRefs 数组的正确位置。
* **静态表单**：如果表单是静态的，可以直接使用字符串形式的 ref，例如 ref="formRef"。