---
title: Docker 运行容器
date: 2025-08-22
tags: [Docker]
---

# Docker 运行容器
最初，项目构建和各环境部署都依赖于团队中经验丰富的成员手动操作。然而，即使是熟练的工程师也难以避免因不完全了解代码变更范围、遗漏修改配置文件等失误，导致需要重复执行打包和部署流程，这使得版本发布成为一项繁重且容易出错的工作。

CI/CD 是持续集成（Continuous Integration） 和 持续交付（Continuous Delivery）的英文缩写 ，它是一种软件开发方法，旨在持续的构建、测试、部署和监控代码变更。 简单来说，当提交代码时 CI/CD 系统会自动化构建项目、运行测试，并在测试通过后部署到测试环境甚至生产环境。 以确保每次代码提交都能快速验证，并及时发现和修复问题。

## 运行容器 MySQL

::: code-group

```bash [bash]
apt install mysql
```

```bash [docker-run]
mkdir -p /opt/mysql8/conf

docker run -d --name=mysql8 \
  --hostname mysql8 \
  --restart=unless-stopped \
	-e TZ=Asia/Shanghai \
	-e MYSQL_ROOT_PASSWORD=mysql123 \
	-p 3306:3306 \
	-v /opt/mysql8/conf:/etc/mysql/conf.d \
	-v /opt/mysql8/data:/var/lib/mysql \
	mysql:8 \
	--lower_case_table_names=1
	
# --lower_case_table_names=1 设置mysql存储表名时使用小写，且比较表名时不区分大小写
```

```bash [docker-compose.yml]
version: '3'
services:
  mysql:
    container_name: mysql
    image: mysql:8
    environment:
      TZ: Asia/Shanghai
      MYSQL_ROOT_PASSWORD: mysql123
      MYSQL_DATABASE: test
      MYSQL_USER: test
      MYSQL_PASSWORD: 123456
    ports:
      - 3306:3306
    volumes:
      - /opt/mysql8/conf:/etc/mysql/conf.d
      - /opt/mysql8/data:/var/lib/mysql
      - /opt/mysql8/logs:/logs
```

:::

```bash
docker run --name myadmin -d --link mysql8:db -p 3307:80 phpmyadmin
```







### 创建一个用户

``` bash
docker exec -it mysql8 mysql -uroot -p
# 创建数据库
create database db_test default character set utf8mb4 collate utf8mb4_general_ci;
# 创建用户并授权
create user 'dbuser'@'%' identified by 'dbuser';
grant all on db_test.* to dbuser;
flush privileges;
```







## Redis

### 安装

```
docker volume create redis-data
docker run -itd -v redis-data --name=redis -p 6379:6379 redis 
```

### 设置密码

```bash
docker exec -it redis redis-cli
# 设置密码
config set requirepass 123456
# 验证密码
auth 123456 
```

## Docker

### 安装Docker

```bash
# yum-util提供yum-config-manager功能，另外两个是devicemapper驱动依赖的
yum install -y yum-utils device-mapper-persistent-data lvm2
# 设置阿里云源，
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# 设置docker源
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
# 安装docker-ce
yum install -y docker-ce
# 启动docker
systemctl start docker
# 将docker添加为服务
systemctl enable docker
# 验证安装是否成功(有client和service两部分表示docker安装启动都成功了)
docker version
```

#### [安装docker-compose](<https://github.com/docker/compose/releases>)

```bash
curl -L https://github.com/docker/compose/releases/download/1.24.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# 验证版本
docker-compose -version
```

#### 配置国内源

```bash
# 使用Docker国内镜像源加速
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://okry75km.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
# 验证
docker info
```

[Docker常用命令](<http://www.docker.org.cn/dockerppt/106.html>)

### 在Docker中安装Nexus3

```bash
#使用 Docker volume 持久化 Nexus 数据
docker volume create nexus-data
# 后台启动 Nexus，
# 参数说明：
#   --restart=always 宕机自动重启
#   -v nexus-data:/nexus-data 挂载卷
docker run -d --name nexus -p 8081:8081 --restart=always -v nexus-data:/nexus-data sonatype/nexus3
```

这里解释一下`docker run`参数的意义：

- `-d` 后台运行镜像
- `--name nexus` 给容器起一个别名
- `-p 8081:8081`  将镜像的8080端口映射到Docker宿主机的80端口
- `--restart=always` Docker启动或容器宕机时，自动重启容器
- `-v nexus-data:/nexus-data `  挂载Docker卷

### 在Docker中安装Jenkins

```bash
docker volume create jenkins-data
docker run -d --name jenkins -p 8080:8080 -p 50000:50000 --restart=always -v jenkins-data:/var/jenkins_home jenkins/jenkins
# 验证
curl localhost:8080
# 初始访问时需要输入密码，下面的命令可以查看Jenkins初始密码
docker exec -it jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

#### 配置加速器

【系统管理】-> 【插件管理】-> 【高级】-> 【升级站点】

 更换升级站点：`http://mirror.xmission.com/jenkins/updates/current/update-center.json`

参考:  [Docker版本Jenkins的使用](<https://www.jianshu.com/p/0391e225e4a6>)

### 在Docker中安装MySQL

```bash
docker volume create mysql-data
docker run -d --name mysql -p 3306:3306 -p 33060:33060 --restart=always -v mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 mysql

# 登录到MySQL
docker exec -it mysql mysql -uroot -p123456
# 创建数据库
create database sys_rbac default character set utf8mb4 collate utf8mb4_general_ci;
# 创建用户并授权
create user 'dbuser'@'%' identified by 'dbuser';
grant all privileges on sys_rbac.* to dbuser;
flush privileges;
```

#### 在 Docker中安装Redis

```
docker volume create redis-data
docker run --name redis -p 6379:6379 --restart=always -v redis-data:/data -d redis redis-server --appendonly yes 
# 登录到 redis
docker exec -it redis redis-cli
# 设置密码
config set requirepass 123456
# 验证密码
auth 123456 
```



### 在 Docker中安装ActiveMQ

```
docker volume create activemq-data
docker run -d --name activemq \
					 -p 61616:61616 -p 8161:8161 \
					 --restart=always \
					 -v activemq-data:/opt/activemq/conf \
					 -v activemq-data:/opt/activemq/data \
					 webcenter/activemq
# 登录到 activemq
docker run -it --rm redis redis-cli -h redis



iptables -A INPUT -m state --state NEW -m tcp -p tcp --dport 8161 -j ACCEPT
iptables -A INPUT -m state --state NEW -m tcp -p tcp --dport 61616 -j ACCEPT
```

### 安装Oracle

```bash
docker pull deepdiver/docker-oracle-xe-11g
docker run -d -p 1520:22 -p 1521:1521 deepdiver/oracle-xe-11g oracle11g

docker run -d -p 1520:22 -p 1521:1521 396b3e06a5dc --name oracle11g


# connect info
hostname: localhost
port: 49161
sid: xe
username: system
password: oracle

# Password for SYS & SYSTEM 
oracle
# Login by SSH
ssh root@localhost -p 49160
password: admin
# Connect to ownCloud CI database
username: autotest
password: owncloud
```

### Docker Registry

```
docker run -d -p 5000:5000 -v /root/docker/registry:/var/lib/registry -v /root/certs/:/root/certs  -e REGISTRY_HTTP_TLS_CERTIFICATE=/root/cer
ts/domain.crt -e REGISTRY_HTTP_TLS_KEY=/root/certs/domain.key registry
```

[那么如何登录到docker虚拟机中呢？](<https://www.jianshu.com/p/8c22cdfc0ffd>)



## 故障排查

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



