```mermaid
mindmap
  root((容器化概览))
    背景
      痛点: 传统虚拟化
      容器优势: 轻量, 隔离, 可移植
      推动: Docker, 云原生
    核心概念
      容器
        进程隔离
        资源限制
        沙盒
      镜像
        分层存储
        可写层/只读层
        镜像仓库
      Dockerfile
        FROM / RUN / CMD
      运行时
        OCI
        containerd / runc
      网络与存储
        网络模式
        持久化 Volume
    生态系统
      Docker
        Engine
        Compose
      Kubernetes
        Pod / Deployment
        Service / Ingress
        ConfigMap / PV
        Helm
      其他工具
        Podman / LXC
      云原生工具链
        CI/CD
        监控日志
        服务网格
    安全
      镜像安全
        扫描
        最小化
      运行时安全
        Capabilities
        SELinux
      网络安全
        网络策略
    最佳实践
      镜像管理
      日志监控
    趋势
      WebAssembly
      eBPF
      边缘计算
      Serverless

```

最初，项目构建和各环境部署都依赖于团队中经验丰富的成员手动操作。然而，即使是熟练的工程师也难以避免因不完全了解代码变更范围、遗漏修改配置文件等失误，导致需要重复执行打包和部署流程，这使得版本发布成为一项繁重且容易出错的工作。

CI/CD 是持续集成（Continuous Integration） 和 持续交付（Continuous Delivery）的英文缩写 ，它是一种软件开发方法，旨在持续的构建、测试、部署和监控代码变更。 简单来说，当提交代码时 CI/CD 系统会自动化构建项目、运行测试，并在测试通过后部署到测试环境甚至生产环境。 以确保每次代码提交都能快速验证，并及时发现和修复问题。
