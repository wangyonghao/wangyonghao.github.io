

### Oracle数据库



### 常用SQL

Oracle 查询占用空间最大的10张表

```sql
SELECT
    OWNER,
    SEGMENT_NAME,
    SEGMENT_TYPE,
    TABLESPACE_NAME,
    BYTES / 1024 / 1024 AS SIZE_MB
  FROM
    DBA_SEGMENTS
WHERE SEGMENT_TYPE LIKE '%TABLE%'  -- 过滤出表相关的段
  AND OWNER = 'YOUR_SCHEMA_NAME'   -- 如果需要查询特定schema下的占用空间表
ORDER BY
    BYTES DESC
FETCH FIRST 10 ROWS ONLY;
```

Oracle查看锁表及解锁

```
-- 1.查看是否有被锁的表：
select b.owner, b.object_name, a.session_id, a.locked_mode
  from v$locked_object a,dba_objects b
 where b.object_id = a.object_id

-- 2.查看是哪个进程锁的
select b.username, b.sid, b.serial#, b.logon_time
  from v$locked_object a,v$session b
 where a.session_id = b.sid order by b.logon_time
 
-- 3.杀掉进程
alter system kill session 'sid,serial#';  -- 注意替换 sid,serial#


```

