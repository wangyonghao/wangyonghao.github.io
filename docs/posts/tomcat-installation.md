---
title: CentOS 下安装 Tomcat
tags: [Tomcat]
date: 2024-07-21 09:37
---
## 1. 概述

本文介绍 Linux 系统安装 Tomcat 后，设置开机自启动的方法。

## 2. CentOS6.x&RedHat6.x 配置 Tomcat 开机自启动

### 2.1 创建 Tomcat 的管理脚本

首先，使用`vim /etc/init.d/tomcat`新建Tomcat管理脚本，点击 i 键，在脚本中添加如下内容：

```shell
#!/bin/sh
#
# /etc/init.d/itas
# chkconfig: 345 63 37
# description: tomcat startup script for the ITAS server .
 
# Source function library.
#. /etc/init.d/functions
# source networking configuration.
#. /etc/sysconfig/network
 
CATALINA_HOME=/usr/local/tomcat
 
case $1 in
    start)
      	echo "Starting ITAS server..."
        su - tomcat -s /bin/sh -c "$CATALANA_HOME/bin/startup.sh"
    ;;
    stop)
				echo "Stoping ITAS server..."
        su - tomcat -s /bin/sh -c "$CATALINA_HOME/bin/shutdown.sh"
    ;;
  	restart)
        $0 stop
      	sleep 3
        $0 start
    ;;
    status)
  	    su - tomcat -s /bin/sh -c "$CATALINA_HOME/bin/activemq status"
    ;;
    *)
        echo "Please use start, stop, restart or status as first argument"
    ;;
esac
exit 0
```

保存脚本文件后设置文件的执行权限：

```shell
chmod a+x /etc/init.d/tomcat
```

然后，就可以通过该脚本对 tomcat 服务进行管理了：

```shell
/etc/init.d/tomcat start # 启动 Tomcat
/etc/init.d/tomcat stop  # 停止 Tomcat
```

### 2.2 使用 chkconfig 设置开机自启动

上面的步骤完成了用脚本管理 Tomcat 服务的功能，接下来我们就可以使用 chkconfig 来设置 Tomcat 开机启动了。

先将 Tomcat 服务加入 chkconfig 管理列表：

```plain
chkconfig --add /etc/init.d/tomcat
```

2）配置完以后，就可以使用以下命令设置开机自启动等操作了：

```plain
chkconfig tomcat on     # 设置开机自启动
chkconfig tomcat off    # 停止开机自启动
service tomcat start    # 启动 tomcat 服务
service tomcat stop     # 停止 tomcat 服务
service tomcat restart  # 重启 tomcat 服务
```

## 2. CentOS7.x&RedHat7.x 配置 Tomcat 开机自启动

### 3.1 创建 Tomcat 的管理脚本

1) 在系统`/lib/systemd/system/`目录下创建`tomcat.service`文件:

```shell
vi /lib/systemd/system/tomcat.service
```

点击 i 键，在脚本中添加如下内容：

```shell
[Unit]
Description=tomcat service
After=network.target
[Service]
Type=forking
ExecStart=/usr/tomcat/bin/startup.sh -security
ExecReload=/usr/tomcat/bin/startup.sh -security -s reload
ExecStop=/usr/tomcat/bin/shutdown.sh stop 5 -force
PrivateTmp=true
[Install]
WantedBy=multi-user.target
```

注：需要根据实际路径修改脚本中的 Tomcat 安装路径「/usr/tomcat」。





2) 保存文件后设置其执行权限：

```shell
chmod a+x /lib/systemd/system/tomcat.service
```

### 3.2 使用 systemctl 设置开机自启动

配置完脚本以后，就可以使用以下命令设置开机自启动等操作了：

```shell
systemctl enable tomcat.service          # 设置开机自启动
systemctl disable tomcat.service         # 停止开机自启动
systemctl start tomcat.service           # 启动 tomcat 服务
systemctl stop tomcat.service            # 停止服务
systemctl status tomcat.service          # 查看服务当前状态
systemctl list-units --type=service      # 查看所有已启动的服务
systemctl daemon-reload    # 重载系统服务
```