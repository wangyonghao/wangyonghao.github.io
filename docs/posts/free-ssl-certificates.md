---
title: 免费申请泛域名 SSL 证书，并实现自动续期 
tags: [ssl]
date: 2025-07-01 10:10
metadata: true
description: 使用 Let's Encrypt 提供的免费 SSL/TLS 证书为您的网站增强安全性
---
# 免费申请泛域名 SSL 证书，并实现自动续期 
## 什么是 Let‘s Encrypt?

[Let’s Encrypt](https://letsencrypt.org/zh-cn/docs/) 是一个免费、自动化、开放的证书颁发机构 (Certificate Authority, CA), 提供免费的 TLS 证书。有了证书，就可以为网站启用 HTTPS 功能，加密网站和用户之间的通信，防止黑客攻击和数据泄露。

## Let’s Encrypt 证书颁发原理

Let's Encrypt 自动化流程，通过名为 ACME (Automated Certificate Management Environment) 的开放协议来实现。

1. **域名验证 (Domain Validation, DV)：**
    当你向 Let's Encrypt 申请证书时，你需要证明你对所请求的域名拥有控制权。这是为了防止任何人都可以为别人的网站申请证书。
    最常见的验证方式有两种：
    
      - HTTP-01 验证： 你在你的网站服务器上放置一个特定的文件，Let's Encrypt 会通过 HTTP 访问该文件来验证。
    
    
      - DNS-01 验证： 你在你的域名的 DNS 设置中添加一个特定的 TXT 记录，Let's Encrypt 会查询 DNS 来验证。
    


2. **证书颁发和安装：**

   - Let's Encrypt 不提供一个用户友好的网页界面来操作。相反，它依赖于第三方的**ACME 客户端**软件（最流行的是 **Certbot**）。

   - ACME 客户端运行在你的服务器上，与 Let's Encrypt 服务器通信，自动完成域名验证、证书请求、证书获取以及**最重要的证书安装和 Web 服务器配置**（例如 Apache 或 Nginx）。

3. **自动续期：**

   - Let's Encrypt 颁发的证书有效期较短，通常为 **90 天**。这个设计是为了鼓励自动化，减少证书吊销的需求（因为证书生命周期短，即便泄露影响也小）。

   - ACME 客户端也会自动处理证书的续期。你通常会设置一个计划任务（如 `cron` job），让 Certbot 每隔一段时间（例如每天或每周）运行一次，检查证书是否需要续期，并在到期前（例如30天内）自动续期。

## 使用 Certbot 申请证书

**Certbot** 是由 **Electronic Frontier Foundation (EFF)** 提供的一个开源工具，用于自动处理证书的申请、安装和续期等过程。

Debian/Ubuntu 下安装 Certbot

```bash
sudo apt install certbot
```

其他平台，请参考 [Certbot](https://certbot.eff.org/) 官网

### 申请单域名证书

如果你只需要为单个域名（如 `wyhao.top` 和 `www.wyhao.top`）申请证书，可以使用以下命令：

```bash
sudo certbot --nginx -d wyhao.top -d www.wyhao.top 
```

`--nginx` 需要服务器预先安装nginx，certbot 获取到证书后会自动通过修改nginx的配置将证书安装到nginx上。

根据提示输入邮箱地址，并同意服务条款，Certbot 将自动完成证书申请和安装。

#### 自动续期

Let’s Encrypt 证书的有效期为 **90 天**，为了避免证书过期，我们可以使用 **Cron Job** 设置自动续期。

首先，你可以手动测试续期是否正常：

```
sudo certbot renew --dry-run
```

如果没有报错，可以继续配置自动续期任务：

```
sudo crontab -e
```

在打开的编辑器中添加以下行，表示每20天凌晨两点执行续期任务：

```
0 2 */20 * * /usr/bin/certbot renew --quiet
```

`--quiet` 参数表示静默模式，不会输出非错误信息。



### 泛域名 SSL 证书

泛域名证书（Wildcard Certificate）可以为同一主域名下的所有子域名提供 HTTPS 支持。例如，`*.wyhao.top` 可以覆盖 `blog.wyhao.top`、`api.wyhao.top` 等子域名。

Let’s Encrypt 要求通过 **DNS-01** 验证来申请泛域名证书。运行以下命令：

```bash
sudo certbot certonly --manual --preferred-challenges dns -d *.wyhao.top -d wyhao.top
```

Certbot 会要求你在 DNS 中创建一个特定的 **TXT 记录** 记录以验证域名的所有权。

```
_acme-challenge.example.com  IN  TXT  "gfj9Xq...Rg85nM"
```

前往你的域名 DNS 管理页面，添加该记录后，返回命令行按下 `Enter`。

大概等几十秒钟，确保 DNS 记录在全网传播开来，Certbot 可以查询到。Certbot 在执行验证时会发起 DNS 查询，如果能找到所需的 TXT 记录并验证其值，认证就会成功，然后就会颁发证书。证书颁发后，这条 TXT 记录 就可以删除了。

这个是手动添加删除 DNS 对应的 TXT 记录，这里只是演示Certbot颁发证书的过程，实际情况下最好采用自动化脚本添加和删除 DNS 的 TXT 解析记录。

#### 自动化脚本

```bash
sudo certbot certonly --manual \
	--preferred-challenges=dns \
	--manual-auth-hook /path/to/http/authenticator.sh \
	--manual-cleanup-hook /path/to/http/cleanup.sh \
	-d *.wyhao.top -d wyhao.top
```

/path/to/dns/authenticator.sh

```bash
#!/bin/bash

# Get your API key from https://www.cloudflare.com/a/account/my-account
API_KEY="your-api-key"
EMAIL="your.email@example.com"

if [ -f /tmp/CERTBOT_$CERTBOT_DOMAIN/ZONE_ID ]; then
        ZONE_ID=$(cat /tmp/CERTBOT_$CERTBOT_DOMAIN/ZONE_ID)
        rm -f /tmp/CERTBOT_$CERTBOT_DOMAIN/ZONE_ID
fi

if [ -f /tmp/CERTBOT_$CERTBOT_DOMAIN/RECORD_ID ]; then
        RECORD_ID=$(cat /tmp/CERTBOT_$CERTBOT_DOMAIN/RECORD_ID)
        rm -f /tmp/CERTBOT_$CERTBOT_DOMAIN/RECORD_ID
fi

# Remove the challenge TXT record from the zone
if [ -n "${ZONE_ID}" ]; then
    if [ -n "${RECORD_ID}" ]; then
        curl -s -X DELETE "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$RECORD_ID" \
                -H "X-Auth-Email: $EMAIL" \
                -H "X-Auth-Key: $API_KEY" \
                -H "Content-Type: application/json"
    fi
fi
```

/path/to/dns/cleanup.sh
```bash
#!/bin/bash

# Get your API key from https://www.cloudflare.com/a/account/my-account
API_KEY="your-api-key"
EMAIL="your.email@example.com"

if [ -f /tmp/CERTBOT_$CERTBOT_DOMAIN/ZONE_ID ]; then
        ZONE_ID=$(cat /tmp/CERTBOT_$CERTBOT_DOMAIN/ZONE_ID)
        rm -f /tmp/CERTBOT_$CERTBOT_DOMAIN/ZONE_ID
fi

if [ -f /tmp/CERTBOT_$CERTBOT_DOMAIN/RECORD_ID ]; then
        RECORD_ID=$(cat /tmp/CERTBOT_$CERTBOT_DOMAIN/RECORD_ID)
        rm -f /tmp/CERTBOT_$CERTBOT_DOMAIN/RECORD_ID
fi

# Remove the challenge TXT record from the zone
if [ -n "${ZONE_ID}" ]; then
    if [ -n "${RECORD_ID}" ]; then
        curl -s -X DELETE "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$RECORD_ID" \
                -H "X-Auth-Email: $EMAIL" \
                -H "X-Auth-Key: $API_KEY" \
                -H "Content-Type: application/json"
    fi
fi
```



### 申请的 SSL 证书文件所在目录

当使用 **Certbot** 成功申请到 SSL 证书后，证书文件将默认保存在以下目录中：

```
/etc/letsencrypt/live/wyhao.top/
```

具体包含以下几个文件：

- `cert.pem`：这是你的 **SSL 证书** 文件。
- `privkey.pem`：这是你的 **私钥** 文件，务必妥善保管，切勿泄露。
- `chain.pem`：这是 **中间证书链** 文件，用于验证证书的完整性。
- `fullchain.pem`：这是 **完整证书链** 文件，通常用于 Nginx 或 Apache 的 SSL 配置中。

你可以使用以下命令查看证书详细信息：

```
sudo certbot certificates
```

输出示例：

```
Certificate Name: wyhao.top
    Domains: wyhao.top www.wyhao.top
    Expiry Date: 2025-03-20 14:30:00+00:00 (VALID: 75 days)
    Certificate Path: /etc/letsencrypt/live/wyhao.top/fullchain.pem
    Private Key Path: /etc/letsencrypt/live/wyhao.top/privkey.pem
```

nginx配置文件：

```
server {
    listen 443 ssl;
    server_name wyhao.top;
 
    ssl_certificate /etc/letsencrypt/live/wyhao.top/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/wyhao.top/private.pem;
 
    return 301 https://www.wyhao.top$request_uri;
}
```

## 使用 acme.sh 申请证书

[acme.sh](https://github.com/acmesh-official/acme.sh/wiki) 只需一个脚本即可自动颁发，续订和安装证书，不需要root/sudoer访问权限。

### 安装 acme.sh

安装很简单, 一个命令:

```
curl https://get.acme.sh | sh
```

普通用户和 root 用户都可以安装使用.
安装过程进行了以下几步:

1. 把 acme.sh 安装到你的 **home** 目录下:

```
~/.acme.sh/
```

并创建 一个 bash 的 alias, 方便你的使用: `alias acme.sh=~/.acme.sh/acme.sh`

2). 自动为你创建 cronjob, 每天 0:00 点自动检测所有的证书, 如果快过期了, 需要更新, 则会自动更新证书.

更高级的安装选项请参考: https://github.com/Neilpang/acme.sh/wiki/How-to-install

**安装过程不会污染已有的系统任何功能和文件**, 所有的修改都限制在安装目录中: `~/.acme.sh/`

### 指定证书源（ZeroSSL）并注册帐号

```
acme.sh --set-default-ca --server zerossl
acme.sh --register-account -m your-email@gmail.com
```

### 申请证书

**acme.sh** 实现了 **acme** 协议支持的所有验证协议.
一般有两种方式验证: http 和 dns 验证.

> 1. http 方式需要在你的网站根目录下放置一个文件, 来验证你的域名所有权,完成验证. 然后就可以生成证书了.

```
acme.sh  --issue  -d mydomain.com -d www.mydomain.com  --webroot  /home/wwwroot/mydomain.com/
```

只需要指定域名, 并指定域名所在的网站根目录. **acme.sh** 会全自动的生成验证文件, 并放到网站的根目录, 然后自动完成验证. 最后会聪明的删除验证文件. 整个过程没有任何副作用.

如果你用的 **apache**服务器, **acme.sh** 还可以智能的从 **apache**的配置中自动完成验证, 你不需要指定网站根目录:

```
acme.sh --issue  -d mydomain.com   --apache
```

如果你用的 **nginx**服务器, 或者反代, **acme.sh** 还可以智能的从 **nginx**的配置中自动完成验证, 你不需要指定网站根目录:

```
acme.sh --issue  -d mydomain.com   --nginx
```

**注意, 无论是 apache 还是 nginx 模式, acme.sh在完成验证之后, 会恢复到之前的状态, 都不会私自更改你本身的配置. 好处是你不用担心配置被搞坏, 也有一个缺点, 你需要自己配置 ssl 的配置, 否则只能成功生成证书, 你的网站还是无法访问https. 但是为了安全, 你还是自己手动改配置吧.**

如果你还没有运行任何 web 服务, **80** 端口是空闲的, 那么 **acme.sh** 还能假装自己是一个webserver, 临时听在**80** 端口, 完成验证:

```
acme.sh  --issue -d mydomain.com   --standalone
```

## 常见问题及解决方法

### **1. DNS 验证失败**

检查 DNS 记录是否添加正确，并确保记录已完全传播，可以使用以下命令查看 DNS 解析状态：

```bash
nslookup -q=txt _acme-challenge.wyhao.top
```

### 2. Nginx 配置

如果 Certbot 无法自动修改 Nginx 配置文件，你可以手动更新 Nginx 配置文件（`/etc/nginx/sites-available/default`）：

```
server {
    listen 80;
    server_name wyhao.top www.wyhao.top;
 
    location / {
        return 301 https://$host$request_uri;
    }
}
 
server {
    listen 443 ssl;
    server_name wyhao.top www.wyhao.top;
 
    ssl_certificate /etc/letsencrypt/live/wyhao.top/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/wyhao.top/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
 
    location / {
        proxy_pass http://127.0.0.1:8001;
    }
}
```

保存并测试 Nginx 配置：

```bash
sudo nginx -t
sudo systemctl reload nginx
```




