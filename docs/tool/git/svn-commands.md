---
title: SVN 常用命令
date: 2025-06-19 11:26
---

## 命令篇

官方资料：http://svnbook.red-bean.com/zh/1.8/svn.ref.svn.html

### 代码检出 checkout

```bash
svn checkout svn://svnbucket.com/xxx/xxx
# 指定存储目录
svn checkout svn://svnbucket.com/xxx/xxx save-dir
# 指定用户名密码。
svn checkout svn://svnbucket.com/xxx/xxx --username xxxx --password xxx
```

### 提交代码 commit

```bash
# 描述是必须的，但是可以填写空字符串，不指定
svn commit -m "提交描述"
# 只提交指定文件或目录
svn commit /path/to/file-or-dir -m "提交指定文件"
# 指定后缀的所有文件
svn commit *.js -m "提交所有 js 文件"
```

### 更新代码 update

```bash
# 更新到最新
svn update
# 更新到指定版本的代码。特别是最新版本代码有问题时，我们可以用这个命令回到之前的版本
svn update -r xxx 
# 仅更新指定文件或者目录
svn up /path/to/file-or-dir
# 更新目录子文件和直接子目录，子目录为空
svn update --set-depth immediates
```

### 添加文件 add

```bash
# 添加指定文件或目录
svn add /path/to/file-or-dir
# 添加当前目录下所有 php 文件
svn add *.php
```

### 删除文件 delete

```
svn delete /path/to/file-or-dir 
svn delete /path/to/file-or-dir --keep-local # 删除版本控制，但是本地依旧保留文件 
```

### 查看日志 log

```bash
# 查看当前目录的日志
svn log
# 查看指定文件或目录的提交日志
svn log /path/to/file-or-dir
# 查看日志，并且输出变动的文件列表
svn log -v
# 限定只输出最新的 5 条日志
svn log -l 5
```

### 查看变动 diff

```bash
# 查看当前工作区的改动
svn diff
# 查看指定文件或目录的改动
svn diff /path/to/file-or-dir
# 本地文件跟指定版本号比较差异
svn diff /path/to/file-or-dir -r xxx
# 指定版本号比较差异
svn diff /path/to/file-or-dir -r 1:2
```

### 撤销修改 revert

```bash
# 撤销文件的本地修改
svn revert test.php
# 递归撤销目录中的本地修改
svn revert -R /path/to/dir
```

### 添加忽略 ignore

SVN 的忽略是通过设置目录的属性 prop 来实现的，添加后会有一个目录属性变动的修改需要提交，记得要提交一下喔，这样其他人也有了这个忽略配置。

```bash
# 忽略所有 log 文件。注意最后有个点号，表示在当前目录设置忽略属性。
svn propset svn:ignore "*.log" .
# 递归忽略 global-ignores
svn propset svn:global-ignores "*.log" .
# 从文件读取忽略规则，一行一个规则。
svn propset svn:ignore -F filename.txt .
# 打开编辑器修改忽略属性
svn propedit svn:ignore .
# 查看当前目录的属性配置
svn proplist . -v
# 删除当前目录的忽略设置
svn propdel svn:ignore .
```

### 查看状态 status

会列出来哪些文件有变动

```bash
svn status
svn status /path/to/file-or-dir
```

### 清理 cleanup

这个命令我们经常在 SVN 出现报错时可以执行一下，这样就会清理掉本地的一些缓存

```bash
svn cleanup
```

### 查看信息 info

```bash
svn info
```

### 查看文件列表 ls

```bash
svn ls 
# 指定版本号
svn ls -r 100
```

### 查看文件内容

```bash
# 查看指定版本的文件内容，不加版本号就是查看最新版本的
svn cat test.py -r 2
```

### 查看 blame

显示文件的每一行最后是谁修改的（出了BUG，经常用来查这段代码是谁改的）

```bash
svn blame filename.php
```

### 地址重定向

如果你的 SVN 地址变了，不需要重新 checkout 代码，只需要这样重定向一下就可以了。

```bash
svn switch --relocate 原 SVN 地址 新 SVN 地址
```

### 分支操作

```bash
# 创建分支，从主干 trunk 创建一个分支保存到 branches/online1.0 
svn cp -m "描述内容" http://svnbucket.com/repos/trunk http://svnbucket.com/repos/branches/online1.0 
# 合并主干上的最新代码到分支上 
cd branches/online1.0 
svn merge http://svnbucket.com/repos/trunk  
# 分支合并到主干 
svn merge --reintegrate http://svnbucket.com/repos/branches/online1.0 
# 切换分支 
svn switch svn://svnbucket.com/test/branches/online1.0 
# 删除分支 
svn rm http://svnbucket.com/repos/branches/online1.0
```

### 帮助命令

```bash
# 查看SVN帮助 
svn help 
# 查看指定命令的帮助信息 
svn help commit
```





