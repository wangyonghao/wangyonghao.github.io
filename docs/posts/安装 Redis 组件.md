### 1. 概述
本文介绍了在 Linux 服务器安装配置 Redis 的过程。
Redis 在 Web 集群中用来做状态服务器，主要用于存储缓存登录、SessionID、WebSocket 等，发挥并对所有的访问和操作进行验证的作用。
### 2. 环境准备：

- 服务器：192.168.120.82
- 操作系统：CentOS 7.9
- Java8
### 3. 安装 Redis
安装包可以通过[官网](http://download.redis.io/releases/)下载
```shell
# root
wget https://github.com/redis/redis/archive/7.0.10.tar.gz
tar -zvxf ./redis-7.0.10.tar.gz

mv ./redis-7.0.10 /user/local/redis
```
安装 Redis 时需对源码包编译，此步骤依赖 gcc 编译器
```shell
yum -y install gcc-c++ python3
```
执行编译
```shell
cd /usr/local/redis
make MALLOC=libc
make PREFIX=/usr/local/redis install
```

- `MALLOC=libc` 解决找不到 `jemalloc/jemalloc.h`的问题
- `PREFIX=/usr/local/redis` 将可执行命令bin目录移动到指定目录
- `chown redis:redis -R ./redis`修改目录归属 redis 用户
### 4 配置 Redis
编辑文件`/usr/local/redis/redis.conf`, 修改以下内容

- `bind 0.0.0.0 -::1` 默认绑定, 支持远程登录 
- `port 6379` 端口号
- `daemonize yes` 开启守护进程（以后台模式启动）
- `logfile /usr/local/redis/data/redis_6379.log` 日志文件
- `pidfile /usr/local/redis/run/redis_6379.pid` 
- `dir /usr/local/redis/data` 指定存放路径， 在启动之前需要创建data目录
- `requirepass pW7rUw&y4SaieD3Q`设置认证密码
### 5. 创建 Redis 用户
为避免因程序漏洞而被注入的命令拥有root权限，应以最小权限运行 ActiveMQ 进程。
创建用户
```shell
groupadd redis
useradd redis -g redis -s /sbin/nologin
```
更改目录权限
```powershell
chown redis:redis -R /usr/local/redis
```
### 6. 设置开机自启
新建开机自启脚本 `/etc/init.d/redis`, 内容如下：
```shell
#!/bin/sh
#
# /etc/init.d/redis
# chkconfig: 345 63 37
# description: redis servlet container.
# processname: redis 5.16.6
 
# Source function library.
#. /etc/init.d/functions
# source networking configuration.
#. /etc/sysconfig/network

EXEC=/usr/local/redis/bin/redis-server
CLIEXEC=/usr/local/redis/bin/redis-cli
PIDFILE=/usr/local/redis/data/redis_6379.pid
CONF="/usr/local/redis/redis.conf"
REDISPORT="6379"

case "$1" in
    start)
        if [ -f $PIDFILE ]
        then
            echo "$PIDFILE exists, process is already running or crashed"
        else
            echo "Starting Redis server..."
            su - redis -s /bin/sh -c "$EXEC $CONF"
        fi
    ;;
    stop)
        if [ ! -f $PIDFILE ]
        then
            echo "$PIDFILE does not exist, process is not running"
        else
            PID=$(cat $PIDFILE)
            echo "Stopping ..."
            kill -15 `cat $PIDFILE`
            while [ -x /proc/${PID} ]
            do
                echo "Waiting for Redis to shutdown ..."
                sleep 1
            done
            echo "Redis stopped"
        fi
    ;;
    status)
  	    if [ ! -f $PIDFILE ]
        then
            echo "$PIDFILE does not exist, Redis is not running"
        else
            PID=$(cat $PIDFILE)
            if [ ! -x /proc/${PID} ]
            then
                echo 'Redis is not running'
            else
                echo "Redis is running ($PID)"
            fi
				fi
    ;;
    restart)
        $0 stop
        $0 start
    ;;
    *)
        echo "Please use start, stop, restart or status as first argument"
    ;;
esac
exit 0
```
设置开机自启
```shell
chmod +x /etc/init.d/redis
chkconfig --add redis
```
### 7. 防火墙开放端口
```shell
firewall-cmd --zone=public --add-port=6379/tcp --permanent
firewall-cmd --reload
```
### 8. 常用管理命令
```shell
chkconfig redis on    # 开机自启
chkconfig redis off   # 关闭开机自启
service redis start   # 启动
service redis stop    # 停止
service redis restart # 重启
service redis status  # 查看状态
```
