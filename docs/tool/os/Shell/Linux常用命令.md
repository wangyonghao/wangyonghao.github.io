[Linux命令大全](https://www.runoob.com/linux/linux-command-manual.html)

用户及用户组



`useradd usr1 -g grp1 -s /bin/nologin`创建一个用户，禁止登录



文件操作

- [scp](https://www.runoob.com/linux/linux-comm-scp.html) - 远程文件拷贝





### 防火墙命令

`firewall-cmd --state`查看防火墙状态

`firewall-cmd --zone=public --list-ports`查看开放的端口

`firewall-cmd --zone=public --add-port=8080/tcp --permanent` 添加一个永久开放端口

`firewall-cmd --zone=public --remove-port=8080/tcp --permanent`删除一个永久开放端口

`firewall-cmd --reload` 重新加载配置，新增/删除开放端口时需要重新加载才能生效

### systemd服务管理

`systemctl enable/disable/start/stop/restart firewalld.service`启用/禁用/启动/停止/重启防火墙服务

systemctl list-unit-files 列出所有可用单元

systemctl daemon-reload

systemctl --failed 列出所有无效的单元

systemctl reset-failed 删除无效的系统服务