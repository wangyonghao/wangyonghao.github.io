# Nextcloud 网盘搭建与运维实录

## 1. 为什么选择 Nextcloud



## 2. Nextcloud 部署

1. 编织 docker-compose 文件

```
---
version: "2.1"
services:
  nextcloud:
    image: lscr.io/linuxserver/nextcloud:latest
    container_name: nextcloud
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Shanghai
      - MYSQL_HOST=192.168.80.60:3306
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
      - MYSQL_PASSWORD=AH3mzd4sSn3epkZ5
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 4095M
    volumes:
      - ./config:/config
      - ./data:/data
    ports:
      - 4096:80
    restart: unless-stopped
```

2. 运行

```
docker compose up -d
```

## 3. 配置



#### 3.1 Nextcloud 安装 Only Office 插件





## 4 数据备份与恢复

