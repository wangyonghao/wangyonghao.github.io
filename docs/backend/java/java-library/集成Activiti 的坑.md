### 集成Activiti 的坑

Oracle 数据库 开启多用户

Activiti 配置

```yaml
spring:
  activiti:
    #1.flase： 默认值。activiti在启动时，会对比数据库表中保存的版本，如果没有表或者版本不匹配，将抛出异常
    #2.true： activiti会对数据库中所有表进行更新操作。如果表不存在，则自动创建
    #3.create_drop： 在activiti启动时创建表，在关闭时删除表（必须手动关闭引擎，才能删除表）
    #4.drop-create： 在activiti启动时删除原来的旧表，然后在创建新表（不需要手动关闭引擎）
    database-schema-update: true
    # Oracle 启用多用户控制时设置此项，一般为username大写格式
    database-schema: ITAS2021
```



Druid 1.2.8



```plain
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.2.8</version>
</dependency>
```



异常栈



```plain
2021-10-21 15:19:47.472 [main] ERROR o.activiti.engine.impl.interceptor.CommandContext:149 - Error while closing command context
org.activiti.engine.ActivitiException: Could not set database schema on connection
	at org.activiti.engine.impl.db.DbSqlSessionFactory.openSession(DbSqlSessionFactory.java:80)
	at org.activiti.engine.impl.interceptor.CommandContext.getSession(CommandContext.java:299)
	at org.activiti.engine.impl.interceptor.CommandContext.getDbSqlSession(CommandContext.java:312)
	at org.activiti.engine.impl.SchemaOperationsProcessEngineBuild.execute(SchemaOperationsProcessEngineBuild.java:26)
```



报错代码`org.activiti.engine.impl.db.DbSqlSessionFactory`:



```java
package org.activiti.engine.impl.db;

public class DbSqlSessionFactory implements SessionFactory {
    public Session openSession(CommandContext commandContext) {
        DbSqlSession dbSqlSession = new DbSqlSession(this, commandContext.getEntityCache());
        if (getDatabaseSchema() != null && getDatabaseSchema().length() > 0) {
          try {
            dbSqlSession.getSqlSession().getConnection().setSchema(getDatabaseSchema());
          } catch (SQLException e) {
            throw new ActivitiException("Could not set database schema on connection", e);
          }
        }
        ...
    }
}
```



Druid 连接池：



```java
package com.alibaba.druid.pool;

public class DruidPooledConnection extends PoolableWrapper implements javax.sql.PooledConnection, Connection {
    public void setSchema(String schema) throws SQLException {
        if (JdbcUtils.isMysqlDbType(holder.dataSource.getDbType())) {
            if (holder.initSchema == null) {
                holder.initSchema = conn.getSchema();
            }
            conn.setSchema(schema);
            if (holder.statementPool != null) {
                holder.clearStatementCache();
            }
            return;
        }
        throw new SQLFeatureNotSupportedException();
    }
}
```



GitHub仓库 Issue



[还有多少 Bug 是由于 SQLFeatureNotSupportedException 异常引起的](https://github.com/alibaba/druid/issues/3718)



Druid开发者的回复： setSchema不支持不是BUG，故意这样设计的。