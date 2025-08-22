

## Docker 架构

Docker 采用客户端-服务器架构。Docker 客户端与 Docker 守护进程通信，后者负责构建、运行和分发您的 Docker 容器。Docker 客户端和守护进程可以运行在同一系统上，或者您可以将 Docker 客户端连接到远程 Docker 守护进程。Docker 客户端和守护进程通过 REST API、UNIX 套接字或网络接口进行通信。另一个 Docker 客户端是 Docker Compose，它允许您处理由一组容器组成的应用程序。

![Docker Architecture diagram](../../assets/docker-architecture.webp)



### Docker daemon 守护进程

Docker 守护进程（ `dockerd` ）监听 Docker API 请求并管理 Docker 对象，例如镜像、容器、网络和卷。守护进程还可以与其他守护进程通信以管理 Docker 服务。

### Docker Client 客户端

Docker 客户端（ `docker` ）是许多 Docker 用户与 Docker 交互的主要方式。当您使用 `docker run` 等命令时，客户端将这些命令发送到 `dockerd` 以执行。 `docker` 命令使用 Docker API。Docker 客户端可以与多个守护进程通信。

### Docker registries 仓库

Docker 仓库存储 Docker 镜像。Docker Hub 是一个公共仓库，任何人都可以使用，Docker 默认在 Docker Hub 上查找镜像。您甚至可以运行自己的私有仓库。

当您使用 `docker pull` 或 `docker run` 命令时，Docker 会从您配置的仓库中拉取所需的镜像。当您使用 `docker push` 命令时，Docker 会将您的镜像推送到您配置的仓库。

### Docker objects 对象

当你使用 Docker 时，你正在创建和使用镜像、容器、网络、卷、插件和其他对象。本节简要概述了其中一些对象。

**Images**

镜像是一个只读模板，其中包含创建 Docker 容器的指令。通常，一个镜像基于另一个镜像，并有一些额外的定制。例如，你可以构建一个基于 `ubuntu` 镜像的镜像，但安装 Apache Web 服务器和你的应用程序，以及使你的应用程序运行所需的配置细节。

你可能创建自己的镜像，也可能只使用其他人创建并在注册表中发布那些镜像。要构建自己的镜像，你需要创建一个 Dockerfile，它使用简单的语法来定义创建镜像和运行镜像所需的步骤。Dockerfile 中的每一条指令都会在镜像中创建一个层。当你更改 Dockerfile 并重新构建镜像时，只有那些发生变化的层会被重新构建。这是使得镜像与其他虚拟化技术相比如此轻量级、小巧和快速的部分原因。

**Containers 容器**

容器是一个可运行的镜像实例。你可以使用 Docker API 或 CLI 来创建、启动、停止、移动或删除容器。你可以将容器连接到一个或多个网络，为其附加存储，甚至根据其当前状态创建一个新的镜像。

默认情况下，容器与其他容器及其主机机器相对隔离。你可以控制容器的网络、存储或其他底层子系统与其他容器或主机机器的隔离程度。

容器由其镜像定义，同时还包括您在创建或启动它时提供的任何配置选项。当容器被移除时，任何未存储在持久化存储中的状态更改都会消失。