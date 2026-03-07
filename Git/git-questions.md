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
  - 当前合并后的分支(目标分支)历史会保留被合并分支的历史提交，比较混乱,但是方便追溯问题
  - 分支结构会产生分叉(当目标分支有提交时)，保留被合并分支。同时会产生一个 commit。用于记录该次的合并的历史
  - 适用于公共分支整合
- git rebase
  - 重写历史，线性提交记录，比较干净
  - 将提交`移植`到目标分支的顶部，形成单一直线。
  - 适用于本地分支整理提交
- 应用示例

  ```http
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

- git stash: 临时保存工作进度
  - 主要用于临时保存工作区或者暂存区没提交到远程的修改(必须是已经被git已经被追踪的内容)

### 7、Git cherry-pick(樱桃提交)

- git cherry-pick [commit-hash]: 用于将单个提交或者多个提交复制到目标分支。

- Q1: 提交错了分支，如何补救？

```shell
  # 目标分支: git cherry-pick 提交到目标分支
  # 错误分支： git reset 回滚历史
```

### 8、git commit (--amend)用法？

- Q1: 如何修改上一次提交？或者说提交完代码，发现遗留文件，如何修改上一次提交，而非新增提交？

```shell
 git add [遗漏文件]
 git commit --amend -m 'XXX'

 # 若以推送，需要强制推送
 git push --force
```

### 9、Git 分支管理规范（如 Git Flow）？日常开发如何使用分支

- git flow 分支：
  - master/main：生产环境分支（不可直接开发）；
  - develop：开发主分支（集成功能）；
  - feature/<功能名>：功能分支（从 develop 切，完成后合回 develop）；
  - hotfix/<bug名>：紧急修复分支（从 master 切，完成后合回 master+develop）；
  - release/<版本号>：发布分支（从 develop 切，测试后合回 master+develop）
- 日常使用流程：
  - 从 develop 切 feature 分支开发；
  - 开发完成后提 MR/PR；
  - 代码评审通过后合回 develop；
  - 发布前切 release 分支测试，测试通过合回 master/develop。

### 10、Git如何将本地仓库代码绑定多个远程仓库，并一键推送?

- 【本质】: Git 中给远程地址起的「别名」（默认是 origin），一个本地仓库可以绑定多个远程别名，也可以给同一个别名配置多个推送地址
- 【推送逻辑】: git push <远程别名> <分支名> 会推送到该别名对应的所有地址（若配置了多个）
- 【解决办法】
  - 方法1: 一个别名添加多个推送地址(一个origin 对应多个remote-url)，推荐√。

  ```bash
   // 确认当前仓库配置
   git remote -v

   // 添加多个仓库地址（比如github/gitee）
   # 先添加第一个仓库（GitHub）
   git remote add origin https://github.com/yourname/your-repo.git
   # 再添加第二个仓库（Gitee）
   git remote set-url --add origin https://gitee.com/yourname/your-repo.git
   # 如需第三个，继续执行 add 命令
   git remote set-url --add origin https://gitlab.com/yourname/your-repo.git

   // 再次验证配置
   git remote -v

  ```

  - 方法2: 配置不同远程别名：可以给多个仓库配置不同别名(比如想推送github、不推送gitee等)

  ```bash
  // remote add [alias] url
   # 别名1：github（对应GitHub仓库）
   git remote add github https://github.com/yourname/your-repo.git
   # 别名2：gitee（对应Gitee仓库）
   git remote add gitee https://gitee.com/yourname/your-repo.git
   # 别名3：gitlab（对应GitLab仓库）
   git remote add gitlab https://gitlab.com/yourname/your-repo.git

   // push 多个平台
   # 推送到GitHub
   git push github main
   # 推送到Gitee
   git push gitee main
   # 推送到GitLab
   git push gitlab main

  ```
