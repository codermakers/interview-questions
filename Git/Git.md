### Git 高频面试题

#### 1、常见的 Git 命令有哪些？

- 基础命令：
  - git init/clone/add/commit/status/log
- 分支管理
  - git branch/checkout/merge/rebase
- 远程协作
  - git remote/fetch/pull/push
- 撤销回滚
  - git resolve/reset/revert/stash
- 标签管理
  - git tag

#### 2、如何解决使用 Git 合并代码时的冲突？

- 代码冲突：当多个分支修改同一个文件同一处代码，会产生冲突。常用场景：git merge /rebase /cherry-pick / pull 会出现冲突
- 步骤
  定位冲突文件(git status 查看冲突文件) => 手动编辑冲突文件 => 编辑并标记冲突已完成(git add/commit),提交到远程仓库

#### 3、git pull vs git fetch

- git pull = git fetch + merge

### 4、git merge vs rebase ?

- 本质都用于整合分支代码
- git merge
  - 当前合并后的分支(目标分支)历史会保留被合并分支的历史提交，比较混乱
  - 分支结构会产生分叉(当目标分支有提交时)，保留被合并分支。同时会产生一个 commit。用于记录该次的合并的历史
  - 适用于公共分支整合
- git rebase
  - 重写历史，线性提交记录，比较干净
  - 将提交`移植`到目标分支的顶部，形成单一直线。
  - 适用于本地分支整理提交
- 应用示例

  ```md
  // 初始分支
       A---B---C feature
      /
  D---E---F---G main

  // git merge (合并)
        A---B---C  feature
      /          \
  D---E---F---G ---H (合并后的 commit)

  // git rebase (变基)

  D---E---F---G---A'---B'---C' main (feature 变基后)
  ```

- 最佳实践
  - 黄金规则：不要对已推送到远程的分支执行 rebase（除非你明确知道后果）。
  - 公共分支用 merge，私有分支用 rebase
  - 合并前清理提交：在 rebase 本地分支后，用 git merge --no-ff 合并到主分支，保留清晰历史
  ```bash
    git checkout main
    git merge --no-ff feature  # 强制生成合并提交，明确分支合并点
  ```

### 5、git reset vs git revert?

- 本质都用于`撤销更改`
- git reset (危险的指令，前提你知道这么做的后果)
  - 原理是移动 HEAD 指针到指定提交，丢掉后续提交历史
- git revert(安全)
  - 原理是创建一个指定提交的逆向操作.保留原始提交历史
- 应用示例

  ```md
  A --- B --- C (HEAD) // 初始分支

  A--- B // git reset HEAD~1

  A--- B --- c --- B’ // B 与 B'是逆向操作 git revert B'
  ```

- 最佳实践

  - 黄金规则：
    - 未推送的提交：用 git reset
    - 已推送的提交：用 git revert
  - 慎用 git reset --hard：确保已备份重要修改
  - 协作分支优先 revert：避免强制推送（git push --force）导致团队混乱
  - 如果误用 reset 丢了提交，可用`git reflog`找回目标 Hash，重置到该提交
  ```bash
   git reflog            # 查看操作历史，找到目标提交的哈希
   git reset --hard abc123  # 恢复到指定提交
  ```

### 6、git stash 用法及应用场景
- git stash
  - 主要用于临时保存工作区或者暂存区没提交到远程的修改(必须是已经被git已经被追踪的内容)
