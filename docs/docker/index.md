---
title: Docker
date: 2025-08-22
tags: [Docker]
---
# Docker

- Docker engine
- Docker objects
- Docker build
- Docker compose
- Docker machine

```mermaid
graph TD
    subgraph Docker 核心概念
        A[镜像 (Image)] --> B(容器 (Container));
        A --> C(分层文件系统);
        B --> D(联合挂载);
        E[仓库 (Registry)] --> A;
        F[数据卷 (Volume)] --> B;
        G[网络 (Network)] --> B;
        H[Dockerfile] --> A;
    end

    subgraph Docker 组件
        I[Docker 客户端 (Client)] --> J(Docker 主机 (Host) / Docker Daemon);
        J --> K(containerd);
        J --> L(runc);
        K --> L;
    end

    subgraph Docker 网络概念
      M[Docker 网络] --> N(Bridge 网络);
      M --> O(Host 网络);
      M --> P(Overlay 网络);
      M --> Q(Macvlan 网络);
      M --> R(None 网络);
    end

    subgraph Docker Compose
      S[Docker Compose 文件 (docker-compose.yml)] --> T(定义多容器应用);
      T --> B; // 指向容器，表示 docker compose 用于管理多个容器
      U[Docker Compose 命令] --> T;
    end

    subgraph Docker Swarm
      V[Docker Swarm] --> W(集群管理);
      W --> X(Manager 节点);
      W --> Y(Worker 节点);
      V --> B;   //Docker Swarm 也是部署管理的容器
    end

    subgraph 其他概念
        Z[Docker Hub] --> E;
        AA[Dockerfile最佳实践] --> H;
        BB[Docker安全] --> J; //Docker安全影响Docker Daemon
        CC[Docker存储驱动] --> J; //Docker 存储驱动影响 Docker Daemon
        DD[容器编排工具] --> V; //容器编排工具使用Docker Swarm
        DD --> S; //容器编排工具可以使用Docker Compose
    end

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#ccf,stroke:#333,stroke-width:2px
    style E fill:#ffc,stroke:#333,stroke-width:2px
    style J fill:#cff,stroke:#333,stroke-width:2px
    style V fill:#cfc,stroke:#333,stroke-width:2px
```