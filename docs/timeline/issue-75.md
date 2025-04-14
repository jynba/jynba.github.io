> 从antfu大佬的博客中看到这个小巧又有意思的项目，学习一下

  :::tip 原文地址
  [【源码学习】vite-plugin-package-config | GitHub](https://github.com/jynba/jynba.github.io/issues/75)
  :::
  
项目地址：[vite-plugin-package-config](https://github.com/antfu/vite-plugin-package-config)
相关文档：[vite配置中的define](https://cn.vite.dev/config/shared-options.html#define)
### `vite-plugin-package-config`是什么？
* ` vite-plugin-package-config` 是一个 Vite 插件，它的核心作用是：
👇 从 `package.json` 的自定义字段中读取 Vite 配置并自动合并到当前项目的 Vite 配置中。
有了这个插件，你的 vite.config.ts 可以非常简洁甚至没有，配置逻辑就隐藏在 `package.json` 中

### 🧩 使用场景举例：
很多工具（如 Babel、ESLint、TypeScript、Vite 等）都支持将配置写进 package.json，这样可以减少项目根目录的配置文件数量。这个插件就是为了实现类似的“轻量配置方案”：

在`package.json`中写入以下代码，会自动配置到Vite中，而在Vite中，[define](https://cn.vite.dev/config/shared-options.html#define)可以定义一个全局变量，因此你就拥有一个全局常量`__NAME__`了
```js
"vite": {
  "define": {
    "__NAME__": "\"Package Config\""
  }
}
```

* 注意：对于使用 TypeScript 的开发者来说，请确保在 env.d.ts 或 vite-env.d.ts 文件中添加类型声明，以获得类型检查以及代码提示。
示例：
```js
// vite-env.d.ts
declare const __APP_VERSION__: string
```

### 🧠 源码分析
```TS
import { join } from 'path'
import { existsSync, promises as fs } from 'fs'
import _debug from 'debug'
import type { Plugin } from 'vite'

const debug = _debug('vite-plugin-package-config')

export interface Options {
  /**
   * @default 'package.json'
   */
  packageJsonPath?: string
  /**
   * Field name in package.json to merge with Vite's config
   *
   * @default 'vite'
   */
  field?: string
}

export interface VitePluginPackageConfigPlugin extends Plugin {
  api: {
    options: {
      packageJsonPath: string
      field: string
    }
  }
}

function VitePluginPackageConfig(options: Options = {}): VitePluginPackageConfigPlugin {
  const {
    packageJsonPath = join(process.cwd(), 'package.json'),
    field = 'vite',
  } = options

  return {
    name: 'vite-plugin-package-config',
    async config() {
      if (!existsSync(packageJsonPath)) {
        debug('package.json not found at %s', packageJsonPath)
        return
      }

      debug('loading package.json at %s', packageJsonPath)

      try {
        const packageJson: Record<string, any> = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'))
        const extend = packageJson[field]
        if (!extend) {
          debug('no %s field found in package.json, skip', field)
          return
        }

        debug('merging config with %o', extend)
        return extend
      }
      catch (e) {
        debug('parse error: %o', e)
        debug('error on loading package.json at %s, skip', packageJsonPath)
      }
    },
    api: {
      options: {
        packageJsonPath,
        field,
      },
    },
  }
}

export default VitePluginPackageConfig
```

### 📦 实际用途总结

* 小项目快速配置 | 减少配置文件数量，轻量优雅|  ✅ 推荐
* 结合 monorepo 子包 | 每个子包可以在自己的 package.json 里写 Vite 配置 | ✅ 推荐
* 多人协作项目 | 不如专门的 vite.config.ts 可维护 | ⚠️ 谨慎
