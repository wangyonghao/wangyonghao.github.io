---
title: Docker 命令备忘录
date: 2025-08-22
tags: [Docker]
---

# Docker 命令备忘录

## Docker 容器

查看容器

| 命令                          | 描述                   |
| :---------------------------- | ---------------------- |
| `docker ps`                   | 列出正在运行的容器     |
| `docker ps -a`                | 列出所有容器           |
| `docker logs nginx-server`    | 容器日志               |
| `docker inspect nginx-server` | 检查容器               |
| `docker events nginx-server`  | 容器事件               |
| `docker port nginx-server`    | 公共端口               |
| `docker top nginx-server`     | 运行进程               |
| `docker stats nginx-server`   | 容器资源使用           |
| `docker diff nginx-server`    | 列出对容器所做的更改。 |

操作容器

| 命令                                                  | 描述           |
| :---------------------------------------------------- | -------------- |
| `docker start nginx-server`                           | 开始           |
| `docker stop nginx-server`                            | 停止           |
| `docker restart nginx-server`                         | 重启           |
| `docker pause nginx-server`                           | 暂停           |
| `docker unpause nginx-server`                         | 取消暂停       |
| `docker wait nginx-server`                            | 阻塞容器       |
| `docker kill nginx-server`                            | 发送 SIGKILL   |
| `docker attach nginx-server`                          | 连接到现有容器 |
| `docker rename my-nginx nginx-server`                 | 重命名容器     |
| `docker rm nginx-server`                              | 删除容器       |
| `docker update --cpu-shares 512 -m 300M nginx-server` | 更新容器信息   |

## Docker 镜像

操作镜像

| 命令                                                         | 描述                  |
| :----------------------------------------------------------- | --------------------- |
| `docker images`                                              | 列出镜像              |
| `docker rmi nginx`                                           | 删除镜像              |
| `docker load < ubuntu.tar.gz` 或`docker load --input ubuntu.tar` | 从 tar 文件载入镜像   |
| `docker save busybox > ubuntu.tar`                           | 将镜像另存为 tar 文件 |
| `docker history`                                             | 显示镜像的历史        |
| `docker commit nginx`                                        | 将容器另存为镜像      |
| `docker tag nginx eon01/nginx`                               | 为镜像打tag           |
| `docker push eon01/nginx`                                    | 推送镜像              |

构建镜像

```shell
$ docker build .
$ docker build github.com/creack/docker-firefox
$ docker build - < Dockerfile
$ docker build - < context.tar.gz
$ docker build -t eon/nginx-server .
$ docker build -f myOtherDockerfile .
$ curl example.com/remote/Dockerfile | docker build -f - .
```

## Docker 网络

### 操作

删除网络

```shell
docker network rm MyOverlayNetwork
```

列出网络

```shell
docker network ls
```

获取有关网络的信息

```shell
docker network inspect MyOverlayNetwork
```

将正在运行的容器连接到网络

```shell
docker network connect MyOverlayNetwork nginx
```

启动时将容器连接到网络

```shell
docker run -it -d --network=MyOverlayNetwork nginx
```

断开容器与网络的连接

```shell
docker network disconnect MyOverlayNetwork nginx
```

### 创建网络

```shell
docker network create -d overlay MyOverlayNetwork
docker network create -d bridge MyBridgeNetwork
docker network create -d overlay \
  --subnet=192.168.0.0/16 \
  --subnet=192.170.0.0/16 \
  --gateway=192.168.0.100 \
  --gateway=192.170.0.100 \
  --ip-range=192.168.1.0/24 \
  --aux-address="my-router=192.168.1.5" \
  --aux-address="my-switch=192.168.1.6" \
  --aux-address="my-printer=192.170.1.5" \
  --aux-address="my-nas=192.170.1.6" \
  MyOverlayNetwork
```

## 其他

### Docker 仓库

| 命令                                              | 描述                     |
| :------------------------------------------------ | :----------------------- |
| `docker login` 或 `docker login localhost:8080`   | 登录 Docker 仓库         |
| `docker logout` 或 `docker logout localhost:8080` | 注销登录 Docker 仓库     |
| ``docker search search_word``                     | 在 Docker 仓库中搜索镜像 |
| `docker pull user/image `                         | 从Docker 仓库下载镜像    |
| `docker push user/image`                          | 将镜像上传到Docker 仓库  |

### 批量清理

| 命令                                | 描述         |
| :---------------------------------- | :----------- |
| `docker stop -f $(docker ps -a -q)` | 停止所有容器 |
| `docker rm -f $(docker ps -a -q)`   | 删除所有容器 |
| `docker rmi -f $(docker images -q)` | 删除所有图像 |

### Docker 卷

检查容量

```shell
$ docker volume ls
```

清理未使用的容量

```shell
$ docker volume prune
```