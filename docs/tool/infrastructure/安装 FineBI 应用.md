

### 配置外接数据库
报表内置的数据库为 HSQL 数据库。HSQL 数据库不能多线程访问，集群环境、数据量较大可能会导致 HSQL 数据库不稳定的情况，仅适用于本地试用产品功能。
外接数据库可保证报表系统的稳定性。
#### 创建外接数据库
在ITAS数据库，创建finedb表空间，并创建finedb用户。
```plsql
create temporary tablespace finedb_temp tempfile'/home/oracle/oradata/ITASC/finedb_temp01.dbf' size 30000m autoextend off;
create tablespace finedb datafile'/home/oracle/oradata/ITASC/finedb01.dbf' size 2000M autoextend on maxsize 30000M;

create user finedb identified by "finedb" default tablespace finedb  temporary tablespace finedb_temp;
grant dba to finedb;
```
#### 配置外接数据库
在`Manage > System > General` 页面配置 External Database，如下图
![image.png](https://cdn.nlark.com/yuque/0/2023/png/131748/1685090330502-48026eff-3d15-4c2f-9095-07cfa5140471.png#averageHue=%23fefefe&clientId=u317b5646-d2f4-4&from=paste&height=281&id=u50ec46d7&originHeight=562&originWidth=2058&originalType=binary&ratio=2&rotation=0&showTitle=false&size=86447&status=done&style=none&taskId=ud7b36a98-265d-4b84-835d-6a0a69081f1&title=&width=1029)
配置成功，等待数据导入...


