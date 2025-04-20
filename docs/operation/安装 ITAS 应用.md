### 1. 概述
本文介绍了在 Linux 服务器安装 ITAS、Portal、ECM 的过程。
ITAS、Portal、ECM 都是运行在服务器端的 Java 应用程序，必须部署在如 Tomcat、WebLogic、WebSphere 等 Web 容器下，启动 Web 容器时就会加载应用程序.
### 2. 环境准备：

- 服务器：192.168.120.82
- 操作系统：CentOS 7.9
- Java8 
- 已配置环境变量JRE_HOME
### 3. 下载 Tomcat
这里下载的是[支持Java8](https://tomcat.apache.org/whichversion.html)的最新发行版[9.0.74](https://tomcat.apache.org/download-90.cgi#9.0.74).
```shell
wget https://dlcdn.apache.org/tomcat/tomcat-9/v9.0.74/bin/apache-tomcat-9.0.74.tar.gz
```
为使ITAS、Portal、ECM系统相互独立运行，这里复制三份tomcat。
```shell
tar -zvxf ./apache-tomcat-9.0.74.tar.gz

rm -rf ./apache-tomcat-9.0.74/webapps/*
rm -rf ./apache-tomcat-9.0.74/logs/*.*

cp ./apache-tomcat-9.0.74 /user/local/tomcat-itas
cp ./apache-tomcat-9.0.74 /user/local/tomcat-portal
mv ./apache-tomcat-9.0.74 /user/local/tomcat-ecm
```
### 4. 配置Tomcat
#### 4.1 配置环境变量
新建 `vim setenv.sh`, 输入以下内容：
```shell
JAVA_OPTS="-Xms128m -Xmx1024m"
CATALINA_PID="${CATALINA_BASE}/logs/catalina.pid"
```
> 如果Web应用在Tomcat容器停止时没有正常释放所占用的系统资源，比如：线程池未关闭，输入输出流未关闭等等，即使执行了`shutdown.sh` Tomcat 进程依然存在。此时可以使用`shutdown.sh n -force`命令，先尝试正常关闭(kill -15)应用，如果在 n 秒后进程依然存在，强制杀死进程(kill -9)。
> 执行`shutdown.sh -force`必须设置变量`CATALINA_PID`

分别拷贝到ITAS、Portal、ECM
```shell
cp ./setenv.sh /usr/local/tomcat-itas/bin
cp ./setenv.sh /usr/local/tomcat-portal/bin
mv ./setenv.sh /usr/local/tomcat-ecm/bin
```
#### 4.2 配置端口号
一个服务器启动多个 Tomcat 工程，需修改端口号，以避免端口冲突。
端口划分如下：

| 端口类型 | 默认 | ITAS | Portal | ECM | 端口描述 |
| --- | --- | --- | --- | --- | --- |
| HTTPS端口 | 8443 | 8001 | 8002 | 8003 | https 请求处理端口 |
| SHUTDOWN 端口 | 8005 | 8021 | 8022 | 8023 | 接受服务器关闭指令端口 |
| AJP端口 | 8009 | 8031 | 8032 | 8033 | AJP 协议的处理端口，用于监听其他服务器转发过来的请求 |

下面的命令可以快速替换端口号：
```shell
sed -i 's/8443/8001/;s/8005/8021/;s/8009/8031/' /usr/local/tomcat-itas/conf/server.xml
sed -i 's/8443/8002/;s/8005/8022/;s/8009/8032/' /usr/local/tomcat-itas/conf/server.xml
sed -i 's/8443/8003/;s/8005/8023/;s/8009/8033/' /usr/local/tomcat-itas/conf/server.xml
```
#### 4.3 配置 HTTPS
为 Tomcat 配置HTTPS 证书
1）使用 keytool 生成证书
keytool 是java 用于管理密钥和证书的工具，[官方文档](https://docs.oracle.com/javase/8/docs/technotes/tools/windows/keytool.html)
证书生成命令：
```shell
mkdir /usr/local/itas-cert
cd /usr/local/itas-cert

keytool -genkeypair \
  -keyalg RSA \
  -alias itas \
  -keystore itas.jks \
  -keypass com.cssca \
  -storetype pkcs12 \
  -storepass com.cssca \
  -validity 36500 \
  -dname "CN=eportal.cssca.com,CN=itas.cssca.com,CN=ecm.cssca.com" \
  -ext SAN=dns:eportal.cssca.com,dns:itas.cssca.com,dns:ecm.cssca.com,ip:219.239.83.20,ip:192.168.120.81,ip:192.168.120.82
```
以上命令生成一个别名为 itas 的 jks 证书，文件名为 `itas.jks`. 保护密码为`com.cssca`
`-ext`配置了证书绑定的域名或IP地址，可以配置多个
2）在Java中添加信任
导出cert证书
```shell
keytool -alias itas -exportcert -keystore itas.jks -file itas.cer
```
> 导入完成

通过keytool -importcert 命令导入信任证书
```shell
keytool -importcert -trustcacerts -v -alias itas -keystore ${JRE_HOME}/lib/security/cacerts -file itas.cer -storepass changeit
```
在导入Java后可以删除`rm -f itas.cer`
证书相关命令:
```shell
# 查看证书
keytool -list -v -alias itas -keystore "${JRE_HOME}/lib/security/cacerts" -storepass changeit
# 删除证书
keytool -delete -alias itas -keystore "${JRE_HOME}/lib/security/cacerts" -storepass changeit
```
3）配置 Tomcat 开启 HTTPS
修改三个Tomcat下的`conf/server.xml`文件, 配置https连接器
```xml
<!-- 注释掉 http 连接器
<Connector port="8080" protocol="HTTP/1.1"
connectionTimeout="20000"
redirectPort="8443" />
-->
	
<Connector port="8443" protocol="org.apache.coyote.http11.Http11NioProtocol"
  maxThreads="150" SSLEnabled="true">
  <SSLHostConfig>
    <Certificate certificateKeystoreFile="/usr/local/itas-cert/itas.jks"
                 certificateKeystorePassword="com.cssca"
                 type="RSA" />
  </SSLHostConfig>
</Connector>
```
#### 4.4 配置安全策略
当以安全模式`-security`运行Tocmat时，需在`conf/catalina.policy`文件，添加以下内容
```shell
grant codeBase "file:${catalina.base}/webapps/-" {
    permission java.security.AllPermission;
};
```
### 5. 创建 itas 用户
为避免因程序漏洞而被注入的命令拥有root权限，应以最小权限运行 tomcat 进程。
创建用户
```shell
groupadd itas
useradd itas -g itas -s /sbin/nologin
```
更改目录权限
```shell
chown itas:itas -R /usr/local/itas-cert
chown itas:itas -R /usr/local/tomcat-itas
chown itas:itas -R /usr/local/tomcat-portal
chown itas:itas -R /usr/local/tomcat-ecm
```
### 6. 配置开机自启
#### 6.1 创建 ITAS 管理脚本
1）新建 ITAS 管理脚本`/etc/init.d/itas` ，输入以下内容：
```shell
#!/bin/sh
#
# chkconfig: 345 63 37

# Source function library.
#. /etc/init.d/functions
# source networking configuration.
#. /etc/sysconfig/network

APP_NAME=ITAS
CATALINA_HOME=/usr/local/tomcat-itas
PIDFILE=${CATALINA_HOME}/logs/catalina.pid

case $1 in
    start)
        echo "Starting ${APP_NAME} server..."
        su - itas -s /bin/sh -c "${CATALINA_HOME}/bin/startup.sh -security"
    ;;
    stop)
        echo "Stoping ${APP_NAME} server..."
        su - itas -s /bin/sh -c "${CATALINA_HOME}/bin/shutdown.sh 5 -force"
    ;;
    restart)
        $0 stop
        sleep 3
        $0 start
    ;;
    status)
        if [ -f ${PIDFILE} ]
        then
            PID=$(cat ${PIDFILE})
            if [ -x /proc/${PID} ]
            then
                echo "${APP_NAME} server is running [pid=${PID}]"
            else
                echo "${APP_NAME} server is not running"
                echo "Remove redundant file ${PIDFILE}"
                rm -f ${PIDFILE}
            fi
        else
            echo "${APP_NAME} server is not running"
        fi
    ;;
    *)
        echo "Please use start, stop, restart or status as first argument"
    ;;
esac
exit 0
```
#### 6.2 创建 Portal 管理脚本
新建 Portal 管理脚本`/etc/init.d/portal` ，输入以下内容：
```shell
#!/bin/sh
#
# chkconfig: 345 63 37

# Source function library.
#. /etc/init.d/functions
# source networking configuration.
#. /etc/sysconfig/network

APP_NAME=Portal
CATALINA_HOME=/usr/local/tomcat-portal
PIDFILE=${CATALINA_HOME}/logs/catalina.pid

case $1 in
    start)
        echo "Starting ${APP_NAME} server..."
        su - itas -s /bin/sh -c "${CATALINA_HOME}/bin/startup.sh -security"
    ;;
    stop)
        echo "Stoping ${APP_NAME} server..."
        su - itas -s /bin/sh -c "${CATALINA_HOME}/bin/shutdown.sh 5 -force"
    ;;
    restart)
        $0 stop
        sleep 3
        $0 start
    ;;
    status)
        if [ -f ${PIDFILE} ]
        then
            PID=$(cat ${PIDFILE})
            if [ -x /proc/${PID} ]
            then
                echo "${APP_NAME} server is running [pid=${PID}]"
            else
                echo "${APP_NAME} server is not running"
                echo "Remove redundant file ${PIDFILE}"
                rm -f ${PIDFILE}
            fi
        else
            echo "${APP_NAME} server is not running"
        fi
    ;;
    *)
        echo "Please use start, stop, restart or status as first argument"
    ;;
esac
exit 0
```
保存脚本文件后设置文件的执行权限：
```shell
chmod a+x /etc/init.d/portal
```
#### 6.3 创建 ECM 管理脚本
新建 ECM 管理脚本`/etc/init.d/ecm` ，输入以下内容：
```shell
#!/bin/sh
#
# chkconfig: 345 63 37

# Source function library.
#. /etc/init.d/functions
# source networking configuration.
#. /etc/sysconfig/network

APP_NAME=ECM
CATALINA_HOME=/usr/local/tomcat-ecm
PIDFILE=${CATALINA_HOME}/logs/catalina.pid

case $1 in
    start)
        echo "Starting ${APP_NAME} server..."
        su - itas -s /bin/sh -c "${CATALINA_HOME}/bin/startup.sh -security"
    ;;
    stop)
        echo "Stoping ${APP_NAME} server..."
        su - itas -s /bin/sh -c "${CATALINA_HOME}/bin/shutdown.sh 5 -force"
    ;;
    restart)
        $0 stop
        sleep 3
        $0 start
    ;;
    status)
        if [ -f ${PIDFILE} ]
        then
            PID=$(cat ${PIDFILE})
            if [ -x /proc/${PID} ]
            then
                echo "${APP_NAME} server is running [pid=${PID}]"
            else
                echo "${APP_NAME} server is not running"
                echo "Remove redundant file ${PIDFILE}"
                rm -f ${PIDFILE}
            fi
        else
            echo "${APP_NAME} server is not running"
        fi
    ;;
    *)
        echo "Please use start, stop, restart or status as first argument"
    ;;
esac
exit 0
```
#### 6.4 使用 chkconfig 配置开机自启
保存脚本文件后设置文件的执行权限：
```shell
chmod a+x /etc/init.d/itas
chmod a+x /etc/init.d/portal
chmod a+x /etc/init.d/ecm
```
将 ITAS 服务加入 chkconfig 管理列表：
```shell
chkconfig --add /etc/init.d/itas
chkconfig --add /etc/init.d/portal
chkconfig --add /etc/init.d/ecm
```
配置完以后，就可以使用以下命令设置开机自启动等操作了：
```shell
chkconfig * on     # 设置开机自启动
chkconfig * off    # 停止开机自启动
service * start    # 启动服务
service * stop     # 停止服务
service * restart  # 重启服务
service * restart  # 重启服务
```
### 7. 部署应用
1) 停止应用
```shell
service itas stop
service portal stop
service ecm stop
```
2) 备份
将webapps目录下的war包转移到备份目录。再删除ROOT目录
3) 分别将ITAS、Portal、ECM打包好的war文件，上传到以下目录，
```shell
/usr/local/tomcat-itas/webapps/
/usr/local/tomcat-portal/webapps/
/usr/local/tomcat-ecm/webapps/
```
然后，将war文件重命名为ROOT.war
> 如果包名为ROOT.war, 访问地址为：`http(s)://ip:port`，就不需要带war文件名了。

3) 更改权限
```shell
chown itas:itas ./ROOT.war
```
4）重启应用
```shell
service itas restart
service portal restart
service ecm restart
```
### 8. 防火墙开放端口
```shell
firewall-cmd --zone=public --add-port=8001/tcp --permanent
firewall-cmd --zone=public --add-port=8002/tcp --permanent
firewall-cmd --zone=public --add-port=8003/tcp --permanent
firewall-cmd --reload
```
### 

