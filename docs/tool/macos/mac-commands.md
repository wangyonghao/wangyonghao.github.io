# MacOS 常用命令


### 开发调试
- `lsof -i -nP | grep 3000`：查询端口占用

### 网络调试
- `nc -vz -w 2 192.168.80.60 3306`: 查看远程端口是否可访问

日历

* `date "+%Y-%m-%d %H:%M:%S"` 查看年月日时分秒
* `date -s "2025-06-06 15:00:00"` 设置日期（需要root权限）
* `TZ=Asia/Shanghai date` 查看世界其他时区时间， (/usr/share/zoneinfo目录下有各个时区的信息文件）
* `cal 2025` 显示2025年日历
* `cal -j` 查看今天是今年的第多少天
* 



比较两个文件是否有差异

```
cmp -s app-v1.bin app-v2.bin 
```

比较两个文本文件的差异点

```
diff -Bw -u ./main/applicationContext-shiro.xml ./test/applicationContext-shiro.xml
```



## 系统设置

```shell
# Touch Bar 不响应，重启 Touch Bar 进程
pkill "Touch Bar agent"
```



### Homebrew

- `brew update`：更新Homebrew
- `brew upgrade`：升级Homebrew



语法参考：[Linux nc命令](https://www.runoob.com/linux/linux-comm-nc.html)