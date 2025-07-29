---
title: 申请免费 SSL 证书，自动续期 
tags: [ssl]
date: 2025-07-01 10:10
metadata: true
description: 使用 acme.sh 免费申请 SSL 证书，并设置自动续期
---
# 申请免费 SSL 证书，自动续期
### Install in China

如果你的安装服务器位于中国大陆境内, 访问 github 可能会不成功. 所以安装可能会失败.

```
git clone https://gitee.com/neilpang/acme.sh.git
cd acme.sh
./acme.sh --install -m my@example.com

# 设置快捷命令
alias acme.sh=/usr/local/acme.sh/acme.sh
```

### 指定证书源（ZeroSSL）并注册帐号

```
acme.sh --set-default-ca --server zerossl
acme.sh --register-account -m myemail@gmail.com
```

### 申请指定 IP 的 SSL 证书

假设需要申请 SSL 证书的 IP 是：192.168.120.81。请自行替换。

```
acme.sh --issue -d 192.168.120.81 --webroot /var/www/html --server https://acme.hi.cn/directory
```





Let's Encrypt f

