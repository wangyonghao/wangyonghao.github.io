# MySQL创建数据库与创建用户以及授权

创建数据库

```sql
create database `database-name` default character set utf8mb4 default collate utf8mb4_general_ci;
```

创建用户

```sql
create user 'username'@'%' identified by 'password';
-- %：匹配所有主机，该地方还可以设置成‘localhost’，代表只能本地访问，例如root账户默认为‘localhost‘
```

给用户授权

```sql 
grant select,insert,update,delete,create on `database-name`.* to username;

grant all privileges  on `database-name`.* to username@'%';



flush  privileges; --使变更立即生效

```

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
show variables like '%lower%';
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