[figma-iconify-bot项目地址](https://github.com/jynba/figma-iconify-bot)

  :::tip 原文地址
  [自动化从Figma导出图标并生成Iconify的npm包更新到项目 | GitHub](https://github.com/jynba/jynba.github.io/issues/82)
  :::
  [icon-demo-app项目地址](https://github.com/jynba/icon-demo-app.git)

### 背景
在公司项目的日常开发中，UI设计师会频繁更新 Figma 上的图标资源，而前端项目需要和UI设计师沟通，手动导出图标，添加到项目中。
为了避免手动导出图标等重复劳动，计划搭建一套自动化的 图标资源管理与分发流程，核心目标包括：
- 设计资源自动同步：通过 Figma 插件触发工作流，将最新图标自动拉取、转换为前端可用格式（Iconify 组件），并发布为 npm 包，减少手动导出与版本管理的工作量。
- 前端项目依赖自动更新：通过 Renovate 机器人，自动检测 npm 包更新，自动创建合并请求，保证项目和相关业务项目始终使用最新图标。
- 降低沟通成本：通过自动化流程，前端开发、设计之间减少重复沟通，缩短设计更新到项目落地的时间。
- 组件按需引入优化： Iconify 组件支持 Vite 的 IconResolver 按需加载，提升开发体验和构建效率。

### 已实现

**figma-iconify-bot 项目**：
- 通过 Figma 插件触发 GitHub Action Dispatch
- 自动从 Figma 拉取 SVG 图标
- 使用 `@iconify/tools` 转换为 Iconify JSON
- 自动更新 GitHub 仓库源代码，发布/更新 npm 包版本

**icon-demo-app 项目**（需要应用的项目demo）：
- 添加 renovate 自动mr；项目定时触发renovate，自动保持最新的npm依赖

### 待完善

- 将 iconify json 转成 svg 的组件，如`@element-plus/icons-vue`，通过 vite iconResolver 按需引入。
- npm发布后自动触发工作流，通知对应项目自动 renovate 自动mr 使得项目始终保持最新的npm依赖；
