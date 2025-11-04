# 时间线（Timeline）功能使用指南（VSCode/Cursor同理）

  :::tip 原文地址
  [恢复 VSCode/Cursor 误删的文件，时间线/History | GitHub](https://github.com/jynba/jynba.github.io/issues/84)
  :::
  
## 概述
- VSCode 从 1.44 版本开始内置了**时间线（Timeline）**功能
- 用于记录文件操作、工作区变更和 Git 提交记录
- 1.44 版本之前需要通过插件（如 Local History）实现类似功能

## 核心功能
- **自动记录**：文件修改保存后自动生成历史版本节点
- **版本控制**：支持版本回退和内容比较
- **多类型记录**：同时支持本地文件记录和 Git 提交记录

## 使用方法
### 查看时间线
- 在面板中打开 Timeline tab
- 点击右侧筛选按钮可选择显示：
  - ✅ 本地文件记录
  - ✅ Git 提交记录

### Git 记录查看
- 仅勾选"Git 提交记录"可查看文件的 Git 提交历史

## 重要限制
> **时间线功能仅对当前打开的文件有效**
> 
> 如果文件被误删除，由于无法在 VSCode 中打开，时间线面板将不可用

## 误删文件恢复方案

### 历史文件存储位置
VSCode: `C:\Users\xxx\AppData\Roaming\Code\User\History`
Cursor: `C:\Users\xxx\AppData\Roaming\Cursor\User\History`

### 恢复步骤
1. 在 编辑器 中打开上述 History 文件夹
2. 使用搜索功能（全局搜索或终端命令）
3. 查找对应的历史版本文件
   - 每个文件夹对应一个文件的记录
   - 文件夹名由 hash 生成，无需理解
4. 从历史版本中找回最新版本

## 提示
- 历史版本可能较多，需要手动筛选最新版本
- 建议使用熟悉的搜索工具提高效率