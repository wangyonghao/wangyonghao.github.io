# SSH免密码登录

如果你管理一台Linux服务器，那么你就会知道每次SSH登录时或者使用scp复制文件时都要输入密码是一个多么繁琐的过程．这篇教程介绍使用SSH Key来实现SSH无密码登录，而且使用scp复制文件时也不需要再输入密码．除了方便SSH登录，scp复制文件外，SSH免密码登录也为Linux服务器增加了又一道安全防线．

## SSH免密码登录的设置步骤

###### 1. 打开终端，使用下面的ssh-keygen来生成RSA密钥和公钥．

```java
ssh-keygen -b 4096 -t rsa -c 'user@email.com'
```

生成SSH Key的过程中会要求你指定一个文件来保存密钥，按Enter键使用默认的文件就行了．然后需要输入一个密码来加密你的SSH Key．SSH密钥会保存在home目录下的 `~/.ssh/id_rsa`文件中．SSH公钥保存在 `~/.ssh/id_rsa.pub`文件中

###### 2. 使用ssh-agent管理密钥，免去重复输入密钥密码

```shell
ssh-add ~/.ssh/id_rsa
```

###### 3. 将SSH公钥上传到Linux服务器

可以使用 ssh-copy-id 命令来完成

```shell
ssh-copy-id username@remote-server
```

输入远程用户的密码后，SSH公钥就会自动上传了．SSH公钥保存在远程Linux服务器的`~/.ssh/authorized_keys`文件中．

上传完成后，SSH登录就不需要再次输入密码了．

###### 相关扩展

`ssh-add -L` 查看 ssh-agent 中的公钥

`ssh-add -l` 查看 ssh-agent 中的密钥

`ssh-add -d ~/.ssh/id_rsa.pub` 从 ssh-agent 中删除密钥