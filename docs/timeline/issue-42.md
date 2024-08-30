### 使用vite读取modules文件夹中的所有文件名称

  :::tip 原文地址
  [在vite中通过 import.meta.glob 读取modules文件夹中的所有文件名称 | GitHub](https://github.com/jynba/jynba.github.io/issues/42)
  :::
  ● 应用场景：（全局注册自定义指令、读取路由文件夹、读取api/mock文件夹（*.ts）、全局注册组件（*.vue））
1.全局注册自定义指令  ( app.directive )
```javascript
/**
 * @description 注册modules中的自定义指令，以文件夹名字做指令名称
 * @param app
 */
import type { App } from 'vue';
const modules = import.meta.glob('./**/*.ts', { eager: true }) as {};

export function setupDerective(app: App) {
  Object.keys(modules).forEach((key) => {
    let derectiveStr = key.match(/(\w*).ts/);
    let directive;
    derectiveStr && (directive = derectiveStr[1]);
    app.directive(directive, modules[key].default);
  });
}

main.ts中调用
```

2.读取路由文件j夹

```javascript
// 旧版 import.meta.globEager("./modules/*.ts");
const modules: {} = import.meta.glob('./modules/**/*.ts', { eager: true });

const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

//webpack中
require.context('./modules', true, /\.js$/)
```

3.读取api/mock

```javascript
// 自动导入modules
const files: any = import.meta.globEager("./modules/*.ts");
let modules: any = {};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
Object.entries(files).forEach(([k, v]) => {
  Object.assign(modules, v);
});
export default {
  ...modules
};

// useApi
import { ComponentInternalInstance, getCurrentInstance } from "vue";
export default function useApi() {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance;
  const proxy = appContext.config.globalProperties;
  return {
    proxy
  };
}
```

4.全局注册组件
```javascript
import { App } from 'vue';
// 全局组件
const modules:{} = import.meta.glob('./global/**/*.vue',{eager:true});

export function registerGlobalComponent(app: App) {
  Object.keys(modules).forEach((key) => {
    const component = modules[key].default;
    app.component(component.name, component);
  });
}
```


**Vue.component 和 Vue.use 的区别** 
●Vue.use注册插件。这个方法接收一个对象。并且这个参数必须具有install方法。install方法可以接收app实例 （因此也可以用 app实例做一些其他事情，如 全局属性 等等）；其中install中也需要用 app.component 注册组件

