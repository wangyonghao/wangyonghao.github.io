## 总体结构（按“入门 → 实战 → 运维 → 高阶”四层组织）

```
bash


CopyEdit
/docker/
├── intro/         # 入门与核心概念
├── usage/         # 镜像构建与容器使用
├── ops/           # 运维部署相关
├── advanced/      # 高阶技巧与底层理解
├── insights/      # 踩坑记录与经验总结
```

------

## 🟢 1. `intro/` 入门与基本原理

> 目标：让你理解 Docker 是什么，怎么玩，能干嘛

| 文件名            | 建议标题                                   |
| ----------------- | ------------------------------------------ |
| what-is-docker.md | Docker 是什么？为什么用它？                |
| docker-vs-vm.md   | 容器 vs 虚拟机：差异与适用场景             |
| install.md        | 在 macOS/Linux 上安装 Docker 全流程        |
| concept.md        | 镜像、容器、仓库、网络、数据卷概念快速理解 |



------

## 🛠️ 2. `usage/` 镜像构建与容器使用

> 目标：沉淀你日常最常用的 Docker 使用方式与命令

| 文件名              | 建议标题                                 |
| ------------------- | ---------------------------------------- |
| dockerfile-guide.md | Dockerfile 最小可用实践（含踩坑）        |
| docker-compose.md   | Docker Compose 入门与实战示例            |
| docker-commands.md  | 最常用 Docker 命令速查（附解释）         |
| dev-container.md    | 本地开发容器最佳实践（Node / Python）    |
| frontend-docker.md  | 前端项目如何构建 Docker 镜像             |
| backend-docker.md   | 后端服务容器构建模板（Java / Go / Node） |



------

## ⚙️ 3. `ops/` 运维部署场景

> 目标：记录你如何在不同平台部署、运行和维护 Docker 服务

| 文件名               | 建议标题                                          |
| -------------------- | ------------------------------------------------- |
| docker-in-k8s.md     | Docker 在 K8s 中的角色变化与替代（如 containerd） |
| image-optimize.md    | 如何优化镜像大小与构建速度                        |
| docker-logging.md    | 容器日志处理策略（含 log-driver）                 |
| container-restart.md | 容器重启策略与健康检查配置                        |
| harbor-deploy.md     | 搭建私有仓库 Harbor 全流程                        |
| docker-on-cloud.md   | 在华为云部署 Docker 服务实践                      |



------

## 🧠 4. `advanced/` 高阶与底层理解

> 目标：让你更深入地理解 Docker 背后的技术机制

| 文件名                    | 建议标题                            |
| ------------------------- | ----------------------------------- |
| docker-layer.md           | 镜像分层机制详解与调优实践          |
| cgroups-namespaces.md     | Cgroups 与 Namespace 实际作用与示例 |
| docker-network.md         | Docker 网络模式详解与通信图解       |
| overlay-vs-hostnetwork.md | Overlay / Host 网络对比及使用场景   |
| docker-security.md        | 容器安全策略与最佳实践              |



------

## 📝 5. `insights/` 踩坑记录与经验总结

> 目标：记录你遇到的问题、错误提示与解决方法

| 文件名                 | 建议标题                        |
| ---------------------- | ------------------------------- |
| volume-not-mounted.md  | 挂载数据卷不生效？几个常见原因  |
| permission-denied.md   | 容器内文件权限问题排查实录      |
| build-cache-issue.md   | Dockerfile 缓存命中不生效的原因 |
| container-crashloop.md | 容器无限重启问题排查            |
| docker-in-docker.md    | DinD 是个啥？为什么我不推荐用   |