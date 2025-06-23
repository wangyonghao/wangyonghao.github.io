# Tomcat 安全加固
Tomcat 作为承载 Java Web 应用的容器，其安全性不容忽视。本实践指南旨在为开发人员、系统管理员和运维人员提供一套全面而深入的 Tomcat 安全加固策略，涵盖从基础防护到高级配置的最佳实践，以确保您的应用和数据在生产环境中达到更高的安全标准。

## 1. 定期更新 Tomcat 版本
软件漏洞是攻击者常用的入侵途径。及时应用最新的安全更新和补丁，是防范已知漏洞攻击的关键措施。

1.  **版本选择**：强烈建议进行小版本或修订版本的更新（例如从 9.0.x 到 9.0.y），因为这些更新通常包含关键的安全修复和错误修正，且升级风险相对较低。从 https://tomcat.apache.org/download-90.cgi 获取最新版下载链接。
2.  **平滑升级**：使用软链接管理Tomcat版本

```bash
wget https://dlcdn.apache.org/tomcat/tomcat-9/v9.0.106/bin/apache-tomcat-9.0.106.tar.gz
tar -xzvf apache-tomcat-9.0.106.tar.gz -C /opt/ # 解压到指定目录

# 迁移配置文件（主要是 `conf` 目录下的 `server.xml`, `web.xml`, `context.xml` 等）和部署的应用程序（`webapps` 目录）
cp /opt/apache-tomcat-9.0.98/conf/server.xml /opt/apache-tomcat-9.0.98/conf/web.xml /opt/apache-tomcat-9.0.98/conf/context.xml /opt/apache-tomcat-9.0.106/conf/
cp /opt/apache-tomcat-9.0.98/webapps/ /opt/apache-tomcat-9.0.106/webapps/

ln -sfn /opt/apache-tomcat-9.0.106 /opt/tomcat@9 # 创建软链接来管理当前版本，便于平滑切换


# 清理无用文件（可选）
rm ap

```



## 2. 禁用或限制管理控制台访问

Tomcat 自带的管理控制台（如 Manager App 和 Host Manager App）提供了便捷的应用部署和管理功能，但也可能成为安全隐患。若被攻破，攻击者可能通过上传恶意 Web Shell 等方式获取服务器控制权。因此，强烈建议在生产环境中禁用或严格限制对这些管理应用的访问。

1.  **移除默认应用**：删除 `webapps` 目录下所有默认的示例应用和管理应用。这些应用包括 `docs`, `examples`, `manager`, `host-manager`。

    ```bash
    # 进入 Tomcat 安装目录的 webapps 文件夹
    cd /opt/tomcat/webapps
    rm -rf docs examples manager host-manager
    ```

2.  **删除 `tomcat-users.xml`**：
    ```bash
    # rm -f /opt/tomcat/conf/tomcat-users.xml
    ```

## 3. 保护启停脚本

确保 Tomcat 的启动和停止脚本（如 `startup.sh`, `shutdown.sh`）具有适当的文件权限，防止未授权用户执行。

1.  **限制执行权限**：仅允许 Tomcat 运行用户或授权的管理员账户执行这些脚本。
2.  **移除无关脚本**：在 Linux/Unix 环境下，`bin` 目录中的 `.bat` 文件是为 Windows 系统准备的，应予以删除。

```bash
chmod 740 /opt/tomcat/bin/*.sh
rm -f /opt/tomcat/bin/*.bat
```

## 4. 使用非特权用户运行 Tomcat

以 `root` 用户权限运行 Tomcat 服务会带来极大的安全风险。一旦 Tomcat 服务或其部署的应用程序遭到入侵，攻击者将可能获得整个系统的 `root` 权限。因此，必须使用专用的非特权用户运行 Tomcat。

1.  **创建专用用户和组**：创建一个专门用于运行 Tomcat 的系统用户和用户组（例如 `tomcat`），并禁止其登录 Shell。

    ```bash
    groupadd tomcat
    useradd -s /sbin/nologin -g tomcat -d /opt/tomcat -M tomcat
    ```
    *   `-s /sbin/nologin`：禁止该用户登录系统。
    *   `-g tomcat`：指定用户所属的主组为 `tomcat`。
    *   `-d /opt/tomcat`：指定用户的主目录（可选，但推荐与 Tomcat 安装目录相关联）。
    *   `-M`：不创建用户主目录（如果 `-d` 指定的目录已存在或将手动创建）。

2.  **更改文件所有权**：将 Tomcat 安装目录及其所有文件的所有权赋予新创建的 `tomcat` 用户和组。

    ```bash
    chown -R tomcat:tomcat /opt/tomcat
    ```

3.  **监听特权端口（如 80/443）**：如果 Tomcat 需要监听低于 1024 的特权端口（如 HTTP 的 80 端口或 HTTPS 的 443 端口），不应直接以 `root` 用户启动 Tomcat。推荐的解决方案包括：
    *   **端口转发**：使用普通用户启动 Tomcat 监听一个非特权端口（如 8080, 8443），然后通过防火墙规则（如 `iptables`, `firewalld`）或反向代理（如 Nginx, HAProxy, Apache httpd）将来自 80/443 端口的请求转发到 Tomcat 监听的端口。
    *   **`authbind` 工具**：允许非特权用户绑定到特权端口。
    *   **Java Native Access (JNI)**：某些情况下，可以通过 JNI 实现，但这较为复杂。

    例如，使用 `iptables` 进行端口转发 (将 80 端口的请求转发到 8080)：
    ```bash
    sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080
    sudo iptables -t nat -A OUTPUT -p tcp --dport 80 -o lo -j REDIRECT --to-port 8080 # 本机访问也转发
    # 保存规则 (不同发行版命令可能不同)
    # sudo apt-get install iptables-persistent (Debian/Ubuntu)
    # sudo netfilter-persistent save (Debian/Ubuntu)
    # sudo systemctl enable iptables && sudo systemctl start iptables (CentOS/RHEL with iptables-services)
    # sudo firewall-cmd --permanent --add-forward-port=port=80:proto=tcp:toport=8080 (CentOS/RHEL with firewalld)
    # sudo firewall-cmd --reload
    ```
	尽管端口转发是一种方案，但在生产环境中，更推荐使用 Nginx/Apache 等反向代理，它们能提供更强大的功能和更好的性能。

## 5. 保护 Shutdown 端口

Tomcat 使用一个特定的端口（默认为 `8005`）和 `SHUTDOWN` 命令来接收关闭信号。如果此端口和命令被未授权访问，攻击者可能远程关闭您的 Tomcat 服务器。

1.  **修改 Shutdown 端口**：在 `conf/server.xml` 文件中，将 `<Server>` 元素的 `port` 属性值从默认的 `8005` 修改为一个不易被猜测且未被其他服务占用的高位端口（建议大于 1024）。
2.  **修改 Shutdown 命令**：同样在 `<Server>` 元素中，将其 `shutdown` 属性值从默认的 `SHUTDOWN` 修改为一个复杂且难以猜测的字符串。
例如，使用 `sed` 命令修改（请确保备份 `server.xml` 文件前执行）：
```bash
# 假设 Tomcat 安装在 /opt/tomcat
# 将端口改为 8527，关闭命令改为 MySecureShutdownCmd
sed -i.bak 's|<Server port="8005" shutdown="SHUTDOWN">|<Server port="8527" shutdown="MySecureShutdownCmd">|g' /opt/tomcat/conf/server.xml
```

## 6. 配置自定义错误页面以隐藏版本信息

默认情况下，Tomcat 在发生错误时（如 404 Not Found, 500 Internal Server Error）可能会显示包含服务器版本等敏感信息的错误页面。配置自定义错误页面有助于提升用户体验并隐藏这些信息。

1.  **创建自定义错误页面**：在您的 Web 应用程序中创建静态 HTML 页面（例如 `403.html`, `404.html`, `500.html`），用于替换默认的错误提示。
2.  **配置错误页面重定向**：在 `conf/web.xml` (全局配置) 或特定应用的 `WEB-INF/web.xml` 中，使用 `<error-page>` 元素指定错误码与自定义错误页面的映射关系。

```xml
<!-- 添加到 web.xml (全局或应用级别) -->
<error-page>
    <error-code>403</error-code>
    <location>/error/403.html</location>  <!-- 路径相对于应用上下文 -->
</error-page>
<error-page>
    <error-code>404</error-code>
    <location>/error/404.html</location>
</error-page>
<error-page>
    <error-code>500</error-code>
    <location>/error/500.html</location>
</error-page>
<!-- 也可以捕获特定异常类型 -->
<error-page>
    <exception-type>java.lang.Throwable</exception-type>
    <location>/error/genericError.html</location>
</error-page>
```

3.  **移除 `Server` HTTP 响应头**：为了进一步隐藏 Tomcat 版本信息，可以修改 `conf/server.xml` 中 `<Connector>` 元素的 `server` 属性。将其设置为空字符串或一个通用的值（如 `Apache`）。
    ```xml
    <Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443"
               server="" /> <!-- 设置为空字符串 -->
    ```
    注意：完全移除 `Server` 头可能需要更底层的修改或使用 Valve，但设置为空通常能满足需求。

4.  **修改 `ServerInfo.properties`** (可选，更彻底)：
    Tomcat 的确切版本信息存储在 `lib/catalina.jar` 内的 `org/apache/catalina/util/ServerInfo.properties` 文件中。修改此文件需要解压、编辑再重新打包 JAR 文件，操作较为复杂且可能影响升级。通常不推荐直接修改此文件，除非有非常严格的安全要求。
    ```properties
    # 示例内容，可以修改 server.info 和 server.number
    server.info=Apache Tomcat
    server.number=0.0.0.0
    server.built=... 
    ```

## 8. 启用访问日志

访问日志记录了所有对 Tomcat 服务器的请求，对于监控、审计、故障排查和安全分析非常重要。

Tomcat 通过 `AccessLogValve` 组件来记录访问日志。编辑 `conf/server.xml` 文件，在 `<Host>` 或 `<Engine>` 元素内取消注释 `<Valve>` 配置。

```xml
<Host name="localhost"  appBase="webapps" unpackWARs="true" autoDeploy="true">
    <!-- 启用 AccessLogValve -->
  <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
         prefix="access_log" suffix=".log"
         pattern="%h %l %u %t &quot;%r&quot; %s %b &quot;%{Referer}i&quot; &quot;%{User-Agent}i&quot; %Dms"
         resolveHosts="false"
         rotatable="true"
         fileDateFormat=".yyyy-MM-dd" />
</Host>
```

参见 [AccessLogValve 文档](https://tomcat.apache.org/tomcat-9.0-doc/config/valve.html#Access_Log_Valve)，了解上述所有选项的作用。



## 9. 一些思考

### 1. 是否应为 Tomcat 启用 SSL/TLS ？

通常由 Nginx、Apache 或负载均衡器（如 F5、HAProxy）处理 SSL/TLS，再转发 HTTP 到 Tomcat，这样可以减轻 Tomcat 服务器的负担，统一管理证书。

