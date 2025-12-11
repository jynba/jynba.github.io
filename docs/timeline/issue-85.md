# Git Alias 使用指南

  :::tip 原文地址
  [Git Alias 使用指南，含规范化提交的 Alias（feat / fix） | GitHub](https://github.com/jynba/jynba.github.io/issues/85)
  :::
  
## 1. 什么是 Git Alias？
Git Alias（Git 别名）允许你将复杂或冗长的 Git 命令定义成更短更易记的简写，从而提升操作效率。

例如：
```bash
git status → git st
git commit -m "msg" → git cm "msg"
```

---

## 2. 为什么使用 Git Alias？
- ⏱ 减少重复输入
- 🧠 避免记忆复杂命令
- 👨‍💻 可自定义工作流（例如规范 commit message）
- 🌍 可配置为全局，全工作目录通用

---

## 3. Alias 的配置级别

| 级别 | 生效范围 | 文件位置 |
|------|----------|----------|
| system | 系统级 | Git 安装目录 |
| global | 当前用户 | ~/.gitconfig |
| local | 当前仓库 | .git/config |

通常用 **global** 最方便：
```bash
git config --global alias.st status
```

---

## 4. 常用 Git Alias

### 基础快捷指令
```bash
git config --global alias.st "status"
git config --global alias.co "checkout"
git config --global alias.br "branch"
git config --global alias.cm "commit -m"
git config --global alias.mg "merge"
```

使用示例：
```bash
git st
git co main
git cm "init"
git mg
```

---

## 5. 规范化提交的 Alias（feat / fix）

以下 alias 可快速生成符合 Conventional Commits 的格式。

### feat（携带 scope）
```bash
git config --global alias.cm '!f(){ git commit -m "$1($2): ${*:3}"; };f'
```

使用：
```bash
git cm feat login 登录页样式优化
# => feat(login): 登录页样式优化
```

### 携带 scope(含有错误提示)
```bash
git config --global alias.cm '!f(){ 
  if [ "$#" -lt 3 ]; then 
    echo "Usage: git cm <type> <scope> <message>"; 
    return 1; 
  fi; 
  git commit -m "$1($2): ${*:3}"; 
}; f'
```

使用：
```bash
git cm fix
# => Usage: git cm <type> <scope> <message>
```

---

## 6. 查看所有 Alias

### macOS / Linux
```bash
git config --list | grep alias
```

### Windows PowerShell
```powershell
git config --list | findstr alias
```

---
## 7. 修改 / 删除 Alias

### 修改（覆盖即可）：
```bash
git config --global alias.co "checkout -b"
```

### 删除指定 alias：
```bash
git config --global --unset alias.cmfeat
```
---

## 8. 查看 alias 来源（local 覆盖 global 的情况）
```bash
git config --show-origin alias.st
```

输出会告诉你它来自：
- `.git/config`
- `~/.gitconfig`
- 系统 gitconfig

local 会覆盖 global。

---

## 9. 我的 Alias 清单（示例，可自行修改）
```ini
[alias]
	cm = "!f(){ \n  if [ \"$#\" -lt 3 ]; then \n    echo \"Usage: git cm <type> <scope> <message>\"; \n    return 1; \n  fi; \n  git commit -m \"$1($2): ${*:3}\"; \n}; f"
	sta = status
	sa = status
	st = status
	lg = log
	co = checkout
	ck = checkout
	ps = push
	mg = merge
	cp = cherry-pick
	pl = pull
	as = !git config --list | findstr ^alias\\.
	al = !git config --list | findstr ^alias\\.
```

---

## 10. 总结

Git Alias 是让 Git 变得更顺手、提升开发效率的最简单方式。  
通过 alias，你可以让：
- 提交更规范
- 操作更快速
- 工具更契合你的工作流