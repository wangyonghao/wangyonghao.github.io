# MSSQL运维



## 备份的重要性

在开始分享之前，我们首先来看看数据库备份的重要性。进入DT时代，数据的价值越发体现，数据已经成为每个公司赖以生存的生命线，数据的重要性不言而喻，而公司绝大多数核心数据都存放在数据库里。数据库本身的灾难恢复（DR）能力是数据安全的最后一道防线，也是数据库从业者对数据安全底线的坚守。数据库中数据潜在的安全风险包括：硬件故障、恶意入侵、用户误操作、数据库损坏和自然灾害导致的数据损失等。在关系型数据库SQL Server中，数据库备份是灾难恢复的能力有力保证。

### 数据库完整备份 Full Backup

Full Backup（完全备份）是SQL Server所有备份类型中，最为简单、最基础的数据库备份方法，它提供了某个数据库在备份时间点的完整拷贝。但是，它仅支持还原到数据库备份成功结束的时间点，即不支持任意时间点还原操作。

#### T-SQL创建完整备份

使用T-SQL语句来完成数据库的完全备份，使用BACKUP DATABASE语句即可

```sql
USE master
GO
BACKUP DATABASE DB1
TO DISK = '/tmp/DB1_20240514_FULL.bak'
   WITH COMPRESSION, INIT, STATS = 5
GO
```

#### T-SQL 备份还原

```
USE [master]
GO
ALTER DATABASE [AdventureWorks2008R2] SET RECOVERY FULL WITH NO_WAIT
GO
```



### 事务日志备份 Transaction Log Backup

SQL Server数据库完全备份是数据库的完整拷贝，所以备份文件空间占用相对较大，加之可能会在备份过程中导致事务日志一直不断增长。为了解决这个问题，事务日志备份可以很好的解决这个问题，因为：事务日志备份记录了数据库从上一次日志备份到当前时间内的所有事务提交的数据变更，它可以配合数据库完全备份和差异备份（可选）来实现时间点的还原。当日志备份操作成功以后，事务日志文件会被截断，事务日志空间将会被重复循环利用，以此来解决完全备份过程中事务日志文件一致不停增长的问题，因此我们最好能够周期性对数据库进行事务日志备份，以此来控制事务日志文件的大小。但是这里需要有一个前提是数据库必须是FULL恢复模式，SIMPLE恢复模式的数据库不支持事务日志的备份，当然就无法实现时间点的还原。请使用下面的语句将数据库修改为FULL恢复模式，比如针对AdventureWorks2008R2数据库：

```
USE [master]
GO
ALTER DATABASE [AdventureWorks2008R2] SET RECOVERY FULL WITH NO_WAIT
GO
```

#### T-SQL创建事务日志备份

使用T-SQL语句来创建事务日志的备份方法如下：

```
USE Master
GO

BACKUP LOG [AdventureWorks2008R2]
TO DISK = N'C:\temp\AdventureWorks2008R2_log_201711122201.trn' with compression,stats=1;
GO
```

### 数据库差异备份 Differential Backup

它是备份继上一次完全备份以来的所有数据变更，所以它大大减少了备份日之链条的长度和缩小备份集的大小。

使用T-SQL语句创建差异备份的方法如下：

```
USE master
GO
BACKUP DATABASE [OLD_DB] 
TO DISK = '/path/to/OLD_DB_20171112_diff.bak' WITH DIFFERENTIAL
GO
```

sqlserver12#

### 还原数据库备份到新库

1. 使用 sqlcmd 登录 

```
sqlcmd -S localhost -U SA
```

2. 从备份文件读取逻辑文件列表

```sql
USE master
RESTORE FILELISTONLY FROM DISK='/path/to/20230514.bak'  
GO
```

输出示例：

```
LogicalName
-----------------------
OLD_DB
OLD_DB_log
```

3. 从备份文件恢复数据

```sql
USE master
RESTORE DATABASE [NEW_DB] FROM DISK = N'/path/to/20230514.bak'
   WITH REPLACE,  STATS = 10,
   MOVE N'OLD_DB' TO N'/var/opt/mssql/data/NEW_DB.mdf',
   MOVE N'OLD_DB_log' TO N'/var/opt/mssql/data/NEW_DB_log.ldf'  
GO
```

- `NEW_DB` 是新数据库名
- `OLD_DB` 和 `OLD_DB_log` 是上一步得到的旧数据库的逻辑名称
- `REPLACE`  强制还原，即使新数据库已存在
- `STATS` 每完成特定百分比时，显示一条消息
- 查看更多参数](https://learn.microsoft.com/zh-cn/sql/t-sql/statements/restore-statements-arguments-transact-sql?view=sql-server-ver16)



### 参考：

- http://mysql.taobao.org/monthly/2017/11/03/