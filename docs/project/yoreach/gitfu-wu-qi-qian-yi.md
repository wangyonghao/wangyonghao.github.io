# Git服务器迁移

1. 查看gitlab版本的命令:
```
gitlab-rake gitlab:env:info
```
2. 备份原a服务器上的的数据
```
gitlab-rake gitlab:backup:create RAILS_ENV=production
```
PS: 备份后的文件一般是位于/var/opt/gitlab/backups下, 自动生成文件名文件名如481529483_gitlab_backup.tar

3. 将步骤2生成的tar文件拷贝到b服务器上相应的backups目录下可以利用scp进行直接拷贝.
```
scp username@src_ip:/var/opt/gitlab/backups/1481529483_gitlab_backup.tar /var/opt/gitlab/backups
```
PS: username为原服务器的用户名，src_ip原服务器IP地址

4. 在b服务器恢复数据
```
# 停止相关数据连接服务
gitlab-ctlstop unicorn
gitlab-ctl stop sidekiq
# 从1393513186编号备份中恢复
gitlab-rake gitlab:backup:restore BACKUP=1481529483
# 启动Gitlab
                sudo gitlab-ctl start
```
PS：BACKUP的时间点必须与原服务器备份后的文件名一致

参考网址：
[centos7安装部署gitlab服务器](http://www.cnblogs.com/wenwei-blog/p/5861450.html)
[Git服务器迁移](https://www.cnblogs.com/wenwei-blog/p/6362829.html)