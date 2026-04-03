# Mac 上手指南：必备软件、终端配置与高效使用实践

  :::tip 原文地址
  [Mac 上手指南：必备软件、终端配置与高效使用实践 | GitHub](https://github.com/jynba/jynba.github.io/issues/86)
  :::
  
## 📖 背景

新入手 Mac（或从 Windows 切换）时，常见问题：
- 不熟悉 macOS 操作逻辑
- 软件生态不清楚（替代工具）
- 终端环境不好用
- 缺少高效使用习惯

本文整理一套从 “原始 Mac → 可高效开发环境” 的完整实践。

---

## 🚀 一、基础认知（与 Windows 差异）

- ⌘ Command ≈ Windows Ctrl
- Finder ≈ 文件管理器
- .dmg 安装 = 拖入 Applications
- ⌘ + W 退出窗口 ⌘ + Q 退出应用
- 三指上滑切换应用
- ⌘ + 空格搜索万物
- 窗口设置在外层的左上角
- ⌘ + H 隐藏窗口；⌘ + M 最小化

---

## 🧰 二、必备软件推荐

- Homebrew（必须；丝滑下载各种软件应用/包）
- Raycast（强烈推荐，优化⌘ + 空格）
- Rectangle （丝滑分屏；控制窗口位置/大小；有显示器必备）

---

## 🛠️ 三、终端环境配置（重点）

推荐仓库：
https://github.com/lewislulu/terminal-setup

```bash
git clone https://github.com/lewislulu/terminal-setup.git
cd terminal-setup && ./setup.sh
```

该脚本会自动完成：
- Ghostty 终端
- Zsh / Fish 配置
- Starship prompt 
- CLI 工具升级
- Node (fnm)

---
