> Git 子模块（Git Submodule）是一个 Git 仓库嵌套在另一个 Git 仓库中的机制。这使得你可以将一个 Git 仓库作为另一个 Git 仓库的子目录，并能够独立地管理它们。Git 子模块通常用于包含外部依赖库或其他项目，这些依赖库或项目的版本需要独立管理。

  :::tip 原文地址
  [Git Submodule是什么？如何使用？ | GitHub](https://github.com/jynba/jynba.github.io/issues/66)
  :::
  * 通俗易懂大白话： 子模块是独立git仓库，在主项目中copy了一份在submodule目录便于在项目中引用，保存着某次commit版本，可以同步更新；可以同步推到远程仓库
###  Git 子模块（Git Submodule）的基础概念
* 子模块（Submodule）：是一个 Git 仓库，它作为另一个 Git 仓库的子目录存在。子模块通常用于包含和管理外部库或项目，特别是在需要引用一个特定版本的情况下。
* 独立版本控制：子模块本身是一个独立的 Git 仓库，具有独立的提交历史和分支。它只是在主项目中作为一个目录存在。
* 子模块的引用：主项目中的子模块不会直接包含其源代码，而是仅保存子模块引用的某个特定 commit 哈希。
###  如何开始一个子模块
* 添加子模块：你可以通过 git submodule add 命令将外部仓库作为子模块添加到当前仓库。
  ```bash
  git submodule add <repository-url> <path/to/submodule>
  ```
  * `<repository-url>`：子模块仓库的 URL 地址。
  * `<path/to/submodule>`：子模块在主项目中的路径，通常是你希望将其放置的位置。
  例如，添加一个 GitHub 上的开源库作为子模块：
  ```bash
  git submodule add https://github.com/example/repo.git libs/repo
  这样会在当前 Git 仓库的 libs/repo 目录下创建一个子模块。
  ```

* 初始化和更新子模块：添加子模块后，需要初始化子模块并拉取它的内容。
  ```bash
  git submodule update --init --recursive
  ```
  * --init：初始化所有子模块（在第一次克隆或添加子模块时需要）。
  * --recursive：初始化并更新嵌套的子模块（如果子模块本身也有子模块）。

* 查看子模块状态：可以使用 git submodule status：
  ```bash
  git submodule status
  1234567890abcdef1234567890abcdef12345678 libs/repo (heads/main)
  ```
  该命令会显示子模块的当前 commit 哈希、路径以及子模块是否有任何变更。

### 子模块的优缺点
#### 优点：
* 模块化管理：子模块允许你将一个大项目分解为多个小项目，每个小项目都可以独立管理版本。
* 代码复用：你可以将常用的库作为子模块引入多个项目，避免重复开发和维护。
* 精确版本控制：你可以确保主项目引用的是子模块的某个特定版本，而不是一直同步到最新的提交。
#### 缺点：
* 管理复杂性：子模块增加了项目的管理复杂性，尤其是在多人协作的环境下，团队成员需要特别注意如何更新、初始化子模块。
* 操作不便：子模块的更新和切换通常比普通的 Git 操作要复杂，需要手动处理子模块的版本。
* 依赖问题：如果子模块的外部依赖发生了变化（如子模块删除或迁移），可能需要额外的工作来处理这些变化。





