# Git 知识

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

### 参考

1. https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html
2. http://firstaidgit.io/#/
3. https://github.com/k88hudson/git-flight-rules/blob/master/README_zh-CN.md
4. https://yanhaijing.com/git/2014/11/01/my-git-note/