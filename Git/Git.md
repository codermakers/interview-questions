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

#### 2、如何解决使用Git合并代码时的冲突？
- 代码冲突：当多个分支修改同一个文件同一处代码，会产生冲突。常用场景：git merge /rebase /cherry-pick / pull会出现冲突
- 步骤
  定位冲突文件(git status查看冲突文件) => 手动编辑冲突文件 => 编辑提交远程，并标记冲突已完成(git add/commit)
#### 3、git rebase/merge 区别？
- git rebase用于整理历史提交
- git merge用于合并代码