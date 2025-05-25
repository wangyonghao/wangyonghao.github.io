## `insights/` 踩坑记录与经验总结

> 目标：记录你遇到的问题、错误提示与解决方法

| 文件名                 | 建议标题                        |
| ---------------------- | ------------------------------- |
| volume-not-mounted.md  | 挂载数据卷不生效？几个常见原因  |
| permission-denied.md   | 容器内文件权限问题排查实录      |
| build-cache-issue.md   | Dockerfile 缓存命中不生效的原因 |
| container-crashloop.md | 容器无限重启问题排查            |
| docker-in-docker.md    | DinD 是个啥？为什么我不推荐用   |



## 问题排查

### Removal In Progress 状态的容器无法删除

**问题起因：** 清理Docker容器时发现，有一个容器始终处于 Removal In Progress 状态，强制删除时报错。

```
$ docker ps -a | grep 1442cf6452b7
1442cf6452b7    gitlab/gitlab-ce    "/assets/wrapper"    3 years ago    Removal In Progress    gitlab

$ docker rm -f 1442cf6452b7
Error response from daemon: container 1442cf6452b79d44ce6fdb66e6fb3a75383e1044ef70f740d2afe1273e91156b: driver "overlay2" failed to remove root filesystem: unlinkat /var/lib/docker/overlay2/3635d12dcb9e2f7e3c661a09b335f55a6f738da9fe3d6270c4815a575a2f4b7b/diff/root/.cache/lesskey: operation not permitted
```

**解决办法：**使用 `chattr` 取消文件的 Immutable 属性

```
$ chattr -R -i /var/lib/docker/overlay2/3635d12dcb9e2f7e3c661a09b335f55a6f738da9fe3d6270c4815a575a2f4b7b/diff/

$ docker rm 1442cf6452b7
1442cf6452b7
```







