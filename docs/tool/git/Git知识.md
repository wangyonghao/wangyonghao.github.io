# Git 入门

### Git常用命令

整理记录一些实用但不太容易记的Git命令

![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015120901.png)

专用名词

Workspace：工作区
Index / Stage：暂存区
Repository：仓库区（或本地仓库）
Remote：远程仓库



## 查看信息

```shell 
# 查看将要Push的内容
git log --stat -1
# 显示指定文件是什么人在什么时间修改过 
$ git blame [file]
```



如果想放弃本地的文件修改，可以使用 `git reset --hard FETCH_HEAD` ，`FETCH_HEAD` 表示上一次成功`git pull` 之后形成的commit点。然后 `git pull`

```
git reset --hard FETCH_HEAD	
```



git config pull.rebase false

```bash
git pull = git fetch + git merge
```

git config pull.rebase true

```bash
git pull = git fetch + git rebase
```

git config pull.ff only





git merge

git rebase

Git飞行规则

### 参考

1. https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html
2. http://firstaidgit.io/#/
3. https://github.com/k88hudson/git-flight-rules/blob/master/README_zh-CN.md
4. https://yanhaijing.com/git/2014/11/01/my-git-note/


# Git 应用

怎么用



Git 协作流程



简化持续发布流程

开发环境 -> 测试环境 -> 生产环境

按环境划分支

- Master/Main  -> Production
- Develop -> Testing
- Feature -> 







参考文章：

- [Git 工作流程](https://www.ruanyifeng.com/blog/2015/12/git-workflow.html)
- 

ssh配置



克隆



创建特性分支



Commit 类型及规范



push推送

​	pull













特性分支push前

   保持commit历史清晰， 使用 squash 将多次commit合并



什么建立一个创建





**git rebase 和 git merge 有啥区别？**

**rebase**会把你当前分支的 commit 放到公共分支的最后面,所以叫变基。就好像你从公共分支又重新拉出来这个分支一样。
 举例:如果你从 master 拉了个feature分支出来,然后你提交了几个 commit,这个时候刚好有人把他开发的东西合并到 master 了,这个时候 master 就比你拉分支的时候多了几个 commit,如果这个时候你 rebase master 的话，就会把你当前的几个 commit，放到那个人 commit 的后面。

![img](https:////upload-images.jianshu.io/upload_images/1547393-a7e4e04dd5ee4c09.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/332/format/webp)

**merge** 会把公共分支和你当前的commit 合并在一起，形成一个新的 commit 提交

![img](https:////upload-images.jianshu.io/upload_images/1547393-5f57703ff8b889d3.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/584/format/webp)



##### **注意:**

- **不要在公共分支使用rebase**
- **本地和远端对应同一条分支,优先使用rebase,而不是merge**

### **rebase黄金定律**

**永远不要rebase一个已经分享的分支（**到非remote分支，比如rebase到master,develop,release分支上）**，也就是说永远不要rebase一个已经在中央库中存在的分支.只能rebase你自己使用的私有分支**

参考：

[merge和rebase的区别](https://www.cnblogs.com/xueweihan/p/5743327.html)

http://gitbook.liuhui998.com/4_2.html

[https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%8F%98%E5%9F%BA](https://git-scm.com/book/zh/v2/Git-分支-变基)

