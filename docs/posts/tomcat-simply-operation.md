# 简化 Tomcat 运维

## 1. 安装

## 2. 安全加固



## 3. 使用 Systemd 管理 Tomcat 服务

在现代 Linux 发行版中，使用 `systemd` 来管理 Tomcat 服务是一种推荐的做法，它可以提供更好的服务控制、日志记录和开机自启动功能。

1. **创建 `systemd` 服务单元文件**：
   在 `/etc/systemd/system/` 目录下创建一个名为 `tomcat.service` 的文件（需要 `root` 权限）。

   ```bash
   sudo vi /etc/systemd/system/tomcat.service
   ```

2. **编辑服务单元文件内容**：
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

3. **重新加载 `systemd` 配置**：
   修改或创建 `systemd` 服务文件后，需要重新加载配置使其生效。

   ```bash
   sudo systemctl daemon-reload
   ```

4. **管理 Tomcat 服务**：
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



1. 平滑升级 Tomcat 版本
2. 卸载
3. 日常巡检清单

