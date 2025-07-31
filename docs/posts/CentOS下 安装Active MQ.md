---
title: CentOS 下安装 ActiveMQ
tags: [ActiveMQ]
date: 2024-01-31 22:43
---
### 1. 概述
本文介绍了在 Linux 服务器安装配置 ActiveMQ 的过程。
ActiveMQ 用来提供消息服务，主要用于异步处理，应用解耦，流量削锋和消息通讯等场景。

### 2. 环境准备：

- 服务器：192.168.120.82
- 操作系统：CentOS 7.9
- Java8

### 3. 下载 ActiveMQ

这里使用的是兼容 Java 8 的最高发行版 [ActiveMQ 5.16.6](https://activemq.apache.org/activemq-5016006-release)

 wget https://archive.apache.org/dist/activemq/5.16.6/apache-activemq-5.16.6-bin.tar.gz

解压到目录`/user/local/activemq`

 tar -zvxf ./apache-activemq-5.16.6-bin.tar.gz  
 mv ./apache-activemq-5.16.6-bin /user/local/activemq

### 4. 配置 ActiveMQ

默认管理台只能本机访问，若要远程访问须修改开放地址`127.0.0.1`-> `0.0.0.0`

 sed -i 's/127.0.0.1/0.0.0.0/' /usr/local/activemq/conf/jetty.xml

重启之后就可以通过`http://192.168.80.60:8161`访问管理台，默认用户 admin/admin

### 6. 创建 ActiveMQ 用户

为避免因程序漏洞而被注入的命令拥有root权限，应以最小权限运行 ActiveMQ 进程。

创建用户

 groupadd activemq  
 useradd activemq -g activemq -s /sbin/nologin

更改目录权限

 chown activemq:activemq -R /usr/local/activemq

### 7. 设置开机自启

新建开机自启脚本 `vim /etc/init.d/activemq`, 内容如下：

 #!/bin/sh  
 #  
 # /etc/init.d/activemq  
 # chkconfig: 345 63 37  
 # description: activemq servlet container.  
 # processname: activemq 5.16.6  
    
 # Source function library.  
 #. /etc/init.d/functions  
 # source networking configuration.  
 #. /etc/sysconfig/network  
    
 ACTIVEMQ_HOME=/usr/local/activemq  
    
 case $1 in  
     start)  
         echo "Starting ActiveMQ server..."  
         su - activemq -s /bin/sh -c "$ACTIVEMQ_HOME/bin/activemq start"  
     ;;  
     stop)  
         echo "Stoping ActiveMQ server..."  
         su - activemq -s /bin/sh -c "$ACTIVEMQ_HOME/bin/activemq stop"  
     ;;  
     restart)  
         $0 stop  
         sleep 1  
         $0 start  
     ;;  
     status)  
         su - activemq -s /bin/sh -c "$ACTIVEMQ_HOME/bin/activemq status"  
     ;;  
     *)  
         echo "Please use start, stop, restart or status as first argument"  
     ;;  
 esac  
 exit 0

设置开机自启

 chmod a+x /etc/init.d/activemq  
 chkconfig --add activemq

### 8. 防火墙开放端口

 firewall-cmd --zone=public --add-port=8161/tcp --permanent  
 firewall-cmd --zone=public --add-port=61616/tcp --permanent  
 firewall-cmd --reload

### 9. 常用管理命令

 chkconfig activemq on    # 开机自启  
 chkconfig activemq off   # 关闭开机自启  
 service activemq start   # 启动  
 service activemq stop    # 停止  
 service activemq restart # 重启  
 service activemq status  # 查看状态