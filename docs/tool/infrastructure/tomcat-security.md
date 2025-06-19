# Tomcat 生产环境安全配置
Tomcat 作为承载 Java Web 应用的核心服务器，其安全性不容忽视。本实践指南旨在为开发人员、系统管理员和运维人员提供一套全面而深入的 Tomcat 安全加固策略，涵盖从基础防护到高级配置的最佳实践，以确保您的应用和数据在生产环境中达到更高的安全标准。

## 1. 定期更新 Tomcat 版本
软件漏洞是攻击者常用的入侵途径。及时应用最新的安全更新和补丁，是防范已知漏洞攻击的关键措施。

1.  **版本选择**：强烈建议进行小版本或修订版本的更新（例如从 9.0.x 到 9.0.y），因为这些更新通常包含关键的安全修复和错误修正，且升级风险相对较低。
2.  **升级步骤**：
    *   备份当前 Tomcat 的配置文件（主要是 `conf` 目录下的 `server.xml`, `web.xml`, `context.xml` 等）和部署的应用程序（`webapps` 目录）。
    *   部署新版本的 Tomcat 到一个新的目录。
    *   将备份的配置文件和应用程序迁移到新版本 Tomcat 中。
    *   修改新 Tomcat 的监听端口（例如，从 8080 改为 8081），启动并进行全面测试，确保所有功能正常。
    *   测试无误后，在计划的维护窗口停止旧 Tomcat 服务。
    *   将新 Tomcat 的监听端口改回原端口（例如，从 8081 改回 8080）。
    *   启动新 Tomcat 服务，完成升级。

```bash
# 访问 Tomcat 官方下载页面获取最新稳定版本链接：https://tomcat.apache.org/download-90.cgi (以Tomcat 9为例)
# 假设下载最新稳定版 9.0.x (例如 9.0.89)
VERSION="9.0.89"
wget https://dlcdn.apache.org/tomcat/tomcat-9/v${VERSION}/bin/apache-tomcat-${VERSION}.tar.gz
tar -xzvf apache-tomcat-${VERSION}.tar.gz -C /opt/ # 解压到指定目录，如 /opt/
# 例如：mv /opt/apache-tomcat-${VERSION} /opt/tomcat-9.0.89
# 然后可以通过软链接 /opt/tomcat -> /opt/tomcat-9.0.89 来管理当前版本，便于平滑切换
# ln -sfn /opt/tomcat-9.0.89 /opt/tomcat
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

## 7. 使用 Systemd 管理 Tomcat 服务（推荐）

在现代 Linux 发行版中，使用 `systemd` 来管理 Tomcat 服务是一种推荐的做法，它可以提供更好的服务控制、日志记录和开机自启动功能。

1.  **创建 `systemd` 服务单元文件**：
    在 `/etc/systemd/system/` 目录下创建一个名为 `tomcat.service` 的文件（需要 `root` 权限）。

    ```bash
    sudo vi /etc/systemd/system/tomcat.service
    ```

2.  **编辑服务单元文件内容**：
    将以下内容粘贴到 `tomcat.service` 文件中，并根据您的实际环境修改相关路径和用户设置。

    ```ini
    [Unit]
    Description=Apache Tomcat Web Application Container
    # 确保在网络服务启动后再启动 Tomcat
    After=syslog.target network.target
    
    [Service]
    Type=forking
    
    # 运行 Tomcat 的用户和组
    User=tomcat
    Group=tomcat
    
    # Tomcat 安装目录 (CATALINA_HOME)
    Environment="CATALINA_HOME=/opt/tomcat"
    # Tomcat 基础目录 (CATALINA_BASE), 通常与 CATALINA_HOME 相同
    Environment="CATALINA_BASE=/opt/tomcat"
    # Tomcat 进程ID文件 (可选, 但推荐)
    Environment="CATALINA_PID=/opt/tomcat/temp/tomcat.pid"
    # Tomcat 启动和关闭时使用的 Java 选项 (可选)
    Environment="CATALINA_OPTS=-Xms512M -Xmx1024M -server -XX:+UseParallelGC"
    # Java 安装路径 (JAVA_HOME), 如果未在全局环境中设置, 请取消注释并指定具体路径
    # Environment="JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64"
    
    # Tomcat 启动脚本路径
    ExecStart=/opt/tomcat/bin/startup.sh
    # Tomcat 关闭脚本路径
    ExecStop=/opt/tomcat/bin/shutdown.sh
    
    # 成功启动的检查 (可选, 如果 Tomcat 启动较慢, 可能需要调整)
    # SuccessExitStatus=143
    
    # 重启策略
    RestartSec=10
    Restart=always
    
    [Install]
    WantedBy=multi-user.target
    ```
    **注意**：
    *   确保 `User` 和 `Group` 设置为之前创建的非特权用户（例如 `tomcat`）。
    *   `CATALINA_HOME` 和 `CATALINA_BASE` 应指向正确的 Tomcat 安装路径。
    *   如果您的 `JAVA_HOME` 没有在系统全局或 `tomcat` 用户的环境中设置，请在 `Environment` 中明确指定。
    *   `CATALINA_OPTS` 用于配置 JVM 参数，根据应用需求调整。

3.  **重新加载 `systemd` 配置**：
    修改或创建 `systemd` 服务文件后，需要重新加载配置使其生效。

    ```bash
    sudo systemctl daemon-reload
    ```

4.  **管理 Tomcat 服务**：
    现在可以使用 `systemctl` 命令来管理 Tomcat 服务了。

    ```bash
    sudo systemctl start tomcat       # 启动 Tomcat 服务
    sudo systemctl stop tomcat        # 停止 Tomcat 服务
    sudo systemctl restart tomcat     # 重启 Tomcat 服务
    sudo systemctl status tomcat      # 查看 Tomcat 服务状态
    sudo systemctl enable tomcat      # 设置 Tomcat 服务开机自启
    sudo systemctl disable tomcat     # 取消 Tomcat 服务开机自启
    
    # 查看 Tomcat 日志 (如果 systemd 配置了日志收集)
    # sudo journalctl -u tomcat -f
    ```

通过以上步骤，您可以更安全、更规范地管理您的 Tomcat 实例。


## 8. 配置 SSL/TLS

在生产环境中，通过 SSL/TLS 加密 Tomcat 与客户端之间的通信至关重要，可以有效防止数据在传输过程中被窃听或篡改。 <mcreference link="https://tomcat.apache.org/tomcat-9.0-doc/ssl-howto.html" index="3">3</mcreference> <mcreference link="https://tomcat.apache.org/tomcat-10.1-doc/ssl-howto.html" index="2">2</mcreference> <mcreference link="https://tomcat.apache.org/tomcat-8.5-doc/ssl-howto.html" index="1">1</mcreference> <mcreference link="https://tomcat.apache.org/tomcat-10.0-doc/ssl-howto.html" index="5">5</mcreference>

1.  **获取 SSL/TLS 证书**：
    *   **向证书颁发机构 (CA) 申请**：对于面向公众的服务，建议从受信任的 CA (如 Let's Encrypt, DigiCert, Comodo 等) 获取证书。 <mcreference link="https://techdocs.broadcom.com/us/en/ca-mainframe-software/traditional-management/web-viewer/12-1/configuring/configure-tomcat-for-tls.html" index="4">4</mcreference>
    *   **使用 `keytool` 生成自签名证书** (仅适用于测试或内部环境)： <mcreference link="https://tomcat.apache.org/tomcat-9.0-doc/ssl-howto.html" index="3">3</mcreference> <mcreference link="https://tomcat.apache.org/tomcat-10.1-doc/ssl-howto.html" index="2">2</mcreference> <mcreference link="https://tomcat.apache.org/tomcat-8.5-doc/ssl-howto.html" index="1">1</mcreference> <mcreference link="https://tomcat.apache.org/tomcat-10.0-doc/ssl-howto.html" index="5">5</mcreference>
        ```bash
        # $JAVA_HOME/bin/keytool -genkey -alias tomcat -keyalg RSA -keystore /opt/tomcat/conf/keystore.jks -storepass <your_keystore_password> -keypass <your_key_password> -dname "CN=yourdomain.com, OU=YourOrgUnit, O=YourOrg, L=YourCity, ST=YourState, C=YourCountry"
        # 示例：
        $JAVA_HOME/bin/keytool -genkey -alias tomcat -keyalg RSA -keystore /opt/tomcat/conf/keystore.jks -storepass changeit -keypass changeit -dname "CN=localhost, OU=Development, O=MyCompany, L=MyCity, ST=MyState, C=US" -validity 365
        ```
        *   `keystore.jks`：生成的密钥库文件名。
        *   `yourdomain.com`：应替换为您的域名。
        *   `changeit`：应替换为强密码。

2.  **配置 Tomcat Connector**：
    编辑 `conf/server.xml` 文件，配置 SSL/TLS Connector。通常，您需要取消注释或添加一个新的 `<Connector>` 元素，并配置 HTTPS 相关的属性。 <mcreference link="https://tomcat.apache.org/tomcat-9.0-doc/ssl-howto.html" index="3">3</mcreference> <mcreference link="https://tomcat.apache.org/tomcat-10.1-doc/ssl-howto.html" index="2">2</mcreference> <mcreference link="https://tomcat.apache.org/tomcat-8.5-doc/ssl-howto.html" index="1">1</mcreference> <mcreference link="https://tomcat.apache.org/tomcat-10.0-doc/ssl-howto.html" index="5">5</mcreference>

    ```xml
    <Connector port="8443" protocol="org.apache.coyote.http11.Http11NioProtocol"
               maxThreads="150" SSLEnabled="true">
        <SSLHostConfig>
            <Certificate certificateKeystoreFile="conf/keystore.jks"
                         certificateKeystorePassword="changeit"
                         type="RSA" />
        </SSLHostConfig>
    </Connector>
    ```
    *   `keystoreFile`：密钥库文件的路径，相对于 `$CATALINA_BASE`。
    *   `keystorePass`：密钥库的密码。
    *   `sslProtocol`：指定支持的 SSL/TLS 协议，推荐使用 `TLSv1.2` 和 `TLSv1.3`。例如：`sslEnabledProtocols="TLSv1.2,TLSv1.3"`。
    *   `ciphers`：配置允许的加密套件，选择安全性高的套件。例如：`ciphers="TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384, ..."`。

3.  **强制 HTTPS (可选但推荐)**：
    将所有 HTTP 请求重定向到 HTTPS。可以在应用程序的 `WEB-INF/web.xml` 中添加安全约束：
    ```xml
    <security-constraint>
        <web-resource-collection>
            <web-resource-name>Entire Application</web-resource-name>
            <url-pattern>/*</url-pattern>
        </web-resource-collection>
        <user-data-constraint>
            <transport-guarantee>CONFIDENTIAL</transport-guarantee>
        </user-data-constraint>
    </security-constraint>
    ```
    或者，在 `conf/server.xml` 中配置 HTTP Connector，使其重定向到 HTTPS Connector 的端口：
    ```xml
    <Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
    ```

4.  **启用 HTTP Strict Transport Security (HSTS)** (可选但推荐)：
    HSTS 是一种安全策略机制，它告诉浏览器只能通过 HTTPS 访问该站点。可以在您的应用程序中添加一个 Filter 来设置 `Strict-Transport-Security` 响应头。

    ```java
    // 示例 Filter 实现
    public class HSTSFilter implements Filter {
        public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
            if (response instanceof HttpServletResponse) {
                ((HttpServletResponse) response).setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
            }
            chain.doFilter(request, response);
        }
        // init() 和 destroy() 方法
    }
    ```
    然后在 `WEB-INF/web.xml` 中配置此 Filter。

**注意**：在生产环境中，通常建议将 SSL/TLS 在专门的负载均衡器或反向代理服务器（如 Nginx, HAProxy, Apache httpd）上处理，这样可以减轻 Tomcat 服务器的负担，并提供更灵活的配置选项。 <mcreference link="https://tomcat.apache.org/tomcat-9.0-doc/ssl-howto.html" index="3">3</mcreference> <mcreference link="https://tomcat.apache.org/tomcat-10.1-doc/ssl-howto.html" index="2">2</mcreference> <mcreference link="https://tomcat.apache.org/tomcat-8.5-doc/ssl-howto.html" index="1">1</mcreference> <mcreference link="https://tomcat.apache.org/tomcat-10.0-doc/ssl-howto.html" index="5">5</mcreference>

## 9. 启用访问日志

访问日志记录了所有对 Tomcat 服务器的请求，对于监控、审计、故障排查和安全分析非常重要。

1.  **启用 `AccessLogValve`**：
    Tomcat 通过 `AccessLogValve` 组件来记录访问日志。编辑 `conf/server.xml` 文件，在 `<Host>` 或 `<Engine>` 元素内添加或取消注释 `<Valve>` 配置。

    ```xml
    <Host name="localhost"  appBase="webapps"
          unpackWARs="true" autoDeploy="true">

        <!-- 启用 AccessLogValve -->
        <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
               prefix="localhost_access_log" suffix=".txt"
               pattern="%h %l %u %t &quot;%r&quot; %s %b" />

    </Host>
    ```

2.  **配置参数说明**：
    *   `className`：必须是 `org.apache.catalina.valves.AccessLogValve`。
    *   `directory`：日志文件存放的目录，相对于 `$CATALINA_BASE`。默认为 `logs`。
    *   `prefix`：日志文件名的前缀。例如 `access_log`。
    *   `suffix`：日志文件名的后缀。例如 `.log` 或 `.txt`。
    *   `pattern`：定义日志记录的格式。常用的预定义格式有：
        *   `common`：`%h %l %u %t "%r" %s %b` (远程主机, 远程逻辑用户名, 远程用户, 时间, 请求的第一行, HTTP状态码, 发送的字节数)
        *   `combined`：`%h %l %u %t "%r" %s %b "%{Referer}i" "%{User-Agent}i"` (common 格式加上 Referer 和 User-Agent 头)
        您也可以自定义 `pattern`，使用各种占位符，例如：
        *   `%a` - 远程 IP 地址
        *   `%A` - 本地 IP 地址
        *   `%b` - 发送的字节数，不包括 HTTP 头，如果为0则显示 '-' (CLF format)
        *   `%B` - 发送的字节数，不包括 HTTP 头
        *   `%h` - 远程主机名 (如果 `enableLookups` 为 `false`，则为远程 IP 地址)
        *   `%H` - 请求协议
        *   `%l` - 从 identd 返回的远程逻辑用户名 (通常是 '-')
        *   `%m` - 请求方法 (GET, POST, etc.)
        *   `%p` - 服务器接收请求的本地端口
        *   `%q` - 查询字符串 (带 '?' 前缀，如果存在)
        *   `%r` - 请求的第一行 (方法、URI 和协议)
        *   `%s` - HTTP 状态码
        *   `%S` - 用户会话 ID
        *   `%t` - 日期和时间，采用通用日志格式 (CLF)
        *   `%u` - 经身份验证的远程用户 (如果存在，否则为 '-')
        *   `%U` - 请求的 URL 路径，不包括查询字符串
        *   `%v` - 本地服务器名
        *   `%D` - 处理请求的时间，单位毫秒
        *   `%T` - 处理请求的时间，单位秒
        *   `%{xxx}i` - 传入的名为 `xxx` 的 HTTP 头的值
        *   `%{xxx}o` - 传出的名为 `xxx` 的 HTTP 头的值
        *   `%{xxx}c` - 名为 `xxx` 的 Cookie 的值
        *   `%{xxx}r` - ServletRequest 中的属性 `xxx` 的值
        *   `%{xxx}s` - HttpSession 中的属性 `xxx` 的值
    *   `rotatable`：(默认为 `true`) 如果为 `true`，日志文件名将包含日期戳，例如 `localhost_access_log.YYYY-MM-DD.txt`。如果为 `false`，则不包含日期戳。
    *   `renameOnRotate`：(默认为 `false`) 如果为 `true`，在日志轮转时，旧的日志文件会被重命名（例如添加时间戳），新的日志会写入原始文件名。如果为 `false`，则新的日志会写入带时间戳的新文件。
    *   `fileDateFormat`：(默认为 `.yyyy-MM-dd`) 当 `rotatable` 为 `true` 时，用于格式化日志文件名中日期戳的格式。
    *   `buffered`：(默认为 `true`) 是否缓冲日志输出。设置为 `false` 可以更快地看到日志条目，但可能会影响性能。
    *   `conditionIf` 和 `conditionUnless`：可以根据请求的属性条件来决定是否记录该请求。

3.  **日志轮转 (Log Rotation)**：
    `AccessLogValve` 默认按天轮转日志文件 (当 `rotatable` 为 `true` 且使用默认的 `fileDateFormat`)。确保您有足够的磁盘空间，并定期归档或删除旧的日志文件，以防止磁盘空间耗尽。
    对于更高级的日志管理需求（例如按大小轮转、压缩、保留策略等），可以考虑使用外部日志管理工具，如 `logrotate` (Linux) 或将日志输出到集中的日志系统 (如 ELK Stack, Splunk)。

**示例：记录更详细的信息并按天轮转**
```xml
<Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
       prefix="access_log" suffix=".log"
       pattern="%h %l %u %t &quot;%r&quot; %s %b &quot;%{Referer}i&quot; &quot;%{User-Agent}i&quot; %Dms"
       resolveHosts="false"
       rotatable="true"
       fileDateFormat=".yyyy-MM-dd" />
```
*   `resolveHosts="false"`：避免进行 DNS 反向查询，可以提升性能。
*   `%Dms`：记录请求处理时间（毫秒）。

启用并正确配置访问日志，是维护 Tomcat 服务器安全和稳定运行的重要环节。




