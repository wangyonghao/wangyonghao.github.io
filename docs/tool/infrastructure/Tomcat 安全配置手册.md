# Tomcat 安全配置手册

### 1. 版本安全

从Tomcat官方下载[最新稳定版本](https://tomcat.apache.org/whichversion.html)，不选择 beta 版本。另外，Tomcat所支持Java版本要与项目一致。出于稳定性考虑，不建议进行跨版本升级。

### 2. 删除默认页面

删除 webapps目录下的所有**文件**及目录。目前已知 webapps 有以下目录：

```shell
rm -rf webapps/*
rm -rf work/Catalina/localhost/*
```

### 3. 禁止目录遍历

禁止目录遍历，以防止泄漏系统信息及服务器信息。修改配置文件`conf/web.xml`， 将listings 值改为 false.

Tomcat 已默认禁止目录遍历

```xml
<servlet>
  <servlet-name>default</servlet-name>
  <servlet-class>org.apache.catalina.servlets.DefaultServlet</servlet-class>
  <init-param>
    <param-name>listings</param-name>
    <param-value>false</param-value>
  </init-param>
</servlet>
```

### 4. 删除jspx文件解析

Tomcat默认是可以解析jspx文件格式的后缀，解析jspx给服务器带来了极大的安全风险，若不需要使用jspx文件，建议删除对jspx的解析。修改 `conf/web.xml` 文件，将如下代码注释掉：

```xml
<!-- <url-pattern>*.jspx</url-pattern> -->
```

或者直接删除以下配置：

```xml
  <servlet-mapping>
    <servlet-name>jsp</servlet-name>
    <url-pattern>*.jspx</url-pattern>
  </servlet-mapping>
```

### 5. 自定义错误页面

Tomcat在程序执行失败时会有错误信息提示，可能泄漏服务器的敏感信息，需要关闭错误提示信息。可以通过指定错误页面的方式不将错误信息显示给用户。修改`conf/web.xml`，在`<web-app>`标签上添加以下内容：

```xml
<web-app>
  <error-page>
    <error-code>500</error-code>
    <location>/500.html</location>
  </error-page>
  <error-page> 
    <exception-type>java.lang.NullPointerException</exception-type>
    <location>/error.jsp</location> 
  </error-page>
</web-app>
```

### 6. 开启HTTPS

### 7. 验证HTTP请求来源

为避免攻击者通过伪装成受信任的用户发送恶意请求（CSRF），我们要限制请求来源IP。  修改文件 `conf/server.xml`

```xml
<Host name="localhost"  appBase="/data/www/tomcat_webapps" unpackWARs="true" autoDeploy="false">
  <Valve className="org.apache.catalina.valves.RemoteAddrValve"  allow="192.168.1.10,192.168.1.30,192.168.2.*" deny=""/> 
  <Valve className="org.apache.catalina.valves.RemoteHostValve"  allow="www.test.com,*.test.com" deny=""/>
</Host>
```

### 8. 访问日志记录 Referer 和 User-Agent

修改文件`conf/server.xml`，标准配置如下：

```xml
<Valve className="org.apache.catalina.valves.AccessLogValve"
   directory="logs" prefix="localhost_access_log"
     suffix=".txt" pattern="%h %l %u %t "%r" %s %b %{Referer}i %{User-Agent}i %D"
     resolveHosts="false" />
```

### 9. 关闭war自动部署

为了防止被植入木马等恶意程序，因此我们要关闭自动部署。修改文件 `conf/server.xml`

```xml
<Host name="localhost" appBase="" unpackWARs="false" autoDeploy="false">
```

### 10. 服务降权

Tomcat 禁止以系统root账户启动，需新建普通用户用于启动Tomcat。

直接使用非root用户启动tomcat，适用tomcat5/6/7/8/9，只能监听1024以上的端口，如8080。操作方案步骤如下：

**第一步：新建用户**

```shell
groupadd tomcat
useradd tomcat
```

**第二步：修改tomcat目录属主并赋予权限**

```shell
chown -R tomcat:tomcat /usr/local/apache-tomcat-*
chmod -R 770 /usr/local/apache-tomcat-*
```

**第三步：以普通用户启动tomcat**

切换到 tomcat 用户去启动 Tomcat 。

```shell
su - tomcat
/usr/local/apache-tomcat-*/bin/startup.sh
```

检查tomcat启动进程账户可以通过 `ps aux | grep tomcat` 命令查看。

**第四步：设置防火墙端口转发规则**

该方案的弊端是非root权限只能监听大于1024的端口，所以若想tomcat监听80/443端口并对外，则需要使用防火墙或apache/nginx作转发。如防火墙iptables规则为：

```shell
iptables -A FORWARD -p tcp --destination-port 443 -jACCEPT
iptables -t nat -A PREROUTING -j REDIRECT -p tcp--destination-port 443 --to-ports 8443
iptables -A FORWARD -p tcp --destination-port 80 -jACCEPT
iptables -t nat -A PREROUTING -j REDIRECT -p tcp--destination-port 80 --to-ports 8080
```

### 11. 分离 Tomcat 和项目的用户

Web目录和文件属主不能与tomcat启动用户属主相同。如tomcat是以tomcat账号权限启动，则web文件和目录的属组必须是非tomcat账号。

Web目录权限统一设置为755，web文件权限统一设置为644。只有上传目录这类可读可写目录权限统一设置为777 。

### 12. 安全模式启动

为了限制脚本的访问权限，防范webshell木马，建议启动时增加安全参数`-security`启动: 

```shell
tomcat/bin/startup.sh -security
```

该选项可以极大的提高web服务器的安全性，但在读取系统资源时可能会因权限不足而出错。比如：

- `java.security.AccessControlException: access denied ("java.lang.RuntimePermission" "accessClassInPackage.org.apache.tomcat.util.buf")`
- `java.lang.NoClassDefFoundError: Could not initialize class org.apache.logging.log4j.util.PropertiesUtil`

解决方法是在`conf/catalina.policy`中添加权限配置：

```xml
grant codeBase "file:${catalina.base}/webapps/-" {
    permission java.security.AllPermission;
};
```

### 参考文章

- [Tomcat安全配置小技巧](https://cloud.tencent.com/developer/article/1146827)
- [tomcat 安全规范(tomcat安全加固和规范1)--转发](https://www.cnblogs.com/xiaoyaojinzhazhadehangcheng/p/13957128.html)