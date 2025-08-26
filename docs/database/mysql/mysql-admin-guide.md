---
title: 安装与配置 MySQL
date: 2025-07-29 20:15
tags: [数据库]
description: 安装与配置 MySQL 数据库
---
# 安装与配置 MySQL

## Docker 安装 MySQL

::: code-group
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


### 创建数据库并分配一个管理员

```sql
create database `mydb` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
create user 'myuser'@'%' identified by 'mypassword';
grant all privileges  on `mydb`.* to myuser@'%';
flush privileges;
````

### 确保默认字符集为 utf8mb4 而不是 utf8

MySQL的 `utf8` 字符集是跛脚的UTF-8，它实际上只能存储3个字节的UTF-8字符。 `utf8mb4` 是MySQL提供的完整UTF-8支持，它能够正确存储和处理所有UTF-8编码的字符，包括那些需要4个字节的Emoji表情和罕见汉字。

```sql
-- 在MySQL客户端连接后执行此命令
SHOW VARIABLES LIKE 'character_set_client';
SHOW VARIABLES LIKE 'character_set_connection';
SHOW VARIABLES LIKE 'character_set_results';
```

MySQL 的 `utf8`  字符集在MySQL中实际上只能存储三字节的UTF-8字符，潜在的乱码 如果需要存储Emoji，务必使用 `utf8mb4`。

检查配置文件中的默认字符集，MySQL 配置文件通常在 `my.cnf` 或 `my.ini` 文件的 `[mysqld]` 段中配置

```
[mysqld]
character-set-server=utf8mb4
collation-server=utf8mb4_unicode_ci
```

给用户授权



5、revoke all on *.* from tester;--取消用户所有数据库（表）的所有权限

6、delete from mysql.user where user='tester';--删除用户

7、drop database [schema名称|数据库名称];--删除数据库

#收回权限(不包含赋权权限)
REVOKE ALL PRIVILEGES ON *.* FROM cacti;
REVOKE ALL PRIVILEGES ON cacti.* FROM cacti;

#收回赋权权限
REVOKE GRANT OPTION ON *.* FROM cacti;

```
#查看所有用户
SELECT user, host FROM mysql.user;
```

```sql
#查看权限
show grants for '用户'@'IP地址'

#授权
grant select ,insert,update on db1.t1 to "mjj"@'%';

# 表示有所有的权限，除了grant这个命令，这个命令是root才有的。
grant all privileges  on db1.t1 to "mjj"@'%';

#取消权限
取消来自远程服务器的mjj用户对数据库db1的所有表的所有权限
revoke all on db1.* from 'mjj'@"%";  

取消来自远程服务器的mjj用户所有数据库的所有的表的权限
revoke all privileges on '*' from 'mjj'@'%';
```





```sql
# 备份：数据表结构+数据
mysqdump -u root db1 > db1.sql -p


# 备份：数据表结构
mysqdump -u root -d db1 > db1.sql -p

#导入现有的数据到某个数据库
#1.先创建一个新的数据库
create database db10;
# 2.将已有的数据库文件导入到db10数据库中
mysqdump -u root -d db10 < db1.sql -p
```





[MySQL数据库忽略表名大小写](https://www.cnblogs.com/juihai/p/12160201.html)

\1. 查看数据库大小写配置

```
mysql> show variables like 'lower_case_table_names';
+------------------------+-------+
| Variable_name          | Value |
+------------------------+-------+
| lower_case_table_names | 1     |
+------------------------+-------+
```





 \2. 使用root权限登录，修改配置文件 /etc/my.cnf

\3. 在[mysqld]节点下，加入一行： 

```
lower_case_table_names=1
```

\4. 重启MySQL : 

```
systemctl restart mysqld.service
```

\5. 查看数据库大小写配置

```
show variables like '%lower%';
```



## root密码丢失恢复

1.停止 MySQL 服务 

```bash
systemctl stop mysql
# 确保服务已停止
systemctl status mysql
```

2.以跳过授权表的方式启动 MySQL（临时）

```bash
mysqld --skip-grant-tables --skip-networking
# 勿关闭命令窗口
```

3.开启一个新的命令窗口，输入`mysql -u root` 回车，如果成功，将出现MySQL提示符。

```bash
mysql -u root
# 您会直接进入MySQL命令行提示符，无需密码。
```

4.重置 `root` 用户密码

```sql
use mysql;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'YourNewSecurePasswordHere!';
FLUSH PRIVILEGES;
exit;
```

5.关闭第2步临时命令窗口

6.正常启动 MySQL 服务

``` 
systemctl start mysql
```

7. 测试新密码

```
mysql -u root -p
```

