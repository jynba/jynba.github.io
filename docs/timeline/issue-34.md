# 编写 postcss 插件 px-to-viewpoint

  :::tip 原文地址
  [编写 postcss 插件实现移动端的页面适配 | GitHub](https://github.com/jynba/jynba.github.io/issues/34)
  :::
  
## 原理

- postcss 是什么？：postcss 会直接处理原生 CSS 文件，不引入新的语法元素、通过插件来转换和优化 CSS、对输入的 CSS 代码进行解析，将其转换成抽象语法树（AST），以便能够分析和操作 CSS 的结构；它不是预处理器

* vite 中使用 postcss，导入插件；自己手写一个脚本（正则表达式识别，将 px 转为 vw）

## 如何使用

- 在 vite.config.ts 中引入 postcss 插件，导入脚本 jyPostcssViewport（先 pnpm i postcss）

```js
import { defineConfig } from "vite";

import { jyPostcssViewport } from "./src";

export default defineConfig({
  css: {
    postcss: {
      plugins: [jyPostcssViewport()],
    },
  },
});
```

- 编写脚本

1. 配置中默认视口宽度为 375（移动端）

2. 正则表达式识别 px，将数字进行单位转换，/ opt.viewportWidth 再\*100 将其替换为 vw

```js
import type { Plugin } from "postcss";

const Option = {
  transform: "px",
  viewportWidth: 375,
};

interface Options {
  transform?: string;
}

const getUnitRegexp = (unit: string) => {
  return new RegExp(
    "\"[^\"]+\"|'[^']+'|url\\([^\\)]+\\)|(\\d*\\.?\\d+)" + unit,
    "g"
  );
};

export const jyPostcssViewport = (Options: Options = Option): Plugin => {
  const opt = Object.assign({}, Option, Options);
  return {
    postcssPlugin: "jy-postcss-viewport",
    Declaration(node) {
      const value = node.value;
      if (value.includes(opt.transform)) {
        const pxRegexp = getUnitRegexp(opt.transform);
        node.value = value.replace(pxRegexp, (match) => {
          return match.replace(/(\d*\.?\d+)/, (m) => {
            return ((Number(m) / opt.viewportWidth) * 100).toFixed(2) + "vw";
          });
        });
        let reg = new RegExp(Options.transform + "", "ig");
        node.value = node.value.replace(reg, "");
      }
    },
  };
};
```

## How to Use？
Vite中内置了PostCss，只需编写插件，在vite中的css引出插件即可

> 可能存在问题：对于border 等多个px可能设置不了