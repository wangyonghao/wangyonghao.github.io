---
title: SSH 配置文件
date: 2025-06-14 14:20
tags: [ssh]
---
# 使用 SSH 配置文件简化连接
SSH 配置文件（通常位于是`~/ssh/config`）， 它允许为服务器设置一个易于记忆的别名（Alias），并集中管理 IP 地址、端口、用户名、私钥路径等连接参数。
有了配置文件以后，你可以使用简短的命令轻松访问服务器：
```bash
ssh app-prod 
```
而无需记住冗长的命令，例如：
```bash
ssh -i ~/.ssh/my_project_key -p 2222 deploy_user@appserver-prod.example.com
```
## 适用场景
SSH配置文件在以下场景中非常有用：
1. 当你有几十甚至上百台服务器时，很难记住每台服务器的 IP、端口、用户名和对应的私钥。
2. 在企业环境中，很多内部服务器不直接暴露在互联网上，需要通过一个“跳板机”（Jump Host 或 Bastion Host）才能访问。没有配置文件时，你需要先 SSH 到跳板机，再从跳板机 SSH 到目标服务器。

## 配置示例
以下是一些常见的配置示例。
<details>
  <summary>示例 1: 基本配置</summary>
此示例为一台服务器设置了别名`vps`，使用`root`用户，通过`2022`端口连接到`example.com` 服务器。

```bash
Host vps
    HostName example.com        # 实际服务器的域名或 IP 地址
    User root                   # 登录服务器的用户名
    Port 2022                   # SSH 端口 2022，默认为 22
    IdentityFile ~/.ssh/id_rsa  # 指定私钥文件的路径
```
</details>

<details>
  <summary>示例 2: 通过跳板机连接内网服务器</summary>
首先，定义跳板机的配置：

```bash
Host jump_host
    HostName jump.mycompany.com
    User jump_user
    Port 22
```
然后，定义内网服务器，并指定通过`jump-server`进行连接：

```bash
Host internal_server
    HostName 10.0.0.5             # 内网 IP 地址
    User app_user
    Port 22
    ProxyJump jump_host           # 指定通过 jump_host 连接
```
使用 ProxyJump 后，SSH 客户端会自动处理通过跳板机的连接，对用户透明。
</details>


<details>
  <summary>示例 3: 多台服务器共享部分配置</summary>
你可以为一组使用相同用户和私钥，但主机名不同的服务器共享部分配置。

```bash
Host dev_server prod_server
    User deploy_user
    IdentityFile ~/.ssh/deployment_key

Host dev_server
    HostName 192.168.1.101

Host prod_server
    HostName 192.168.1.102
```
</details>

<details>
  <summary>示例 4: 全局配置与连接优化</summary>
使用通配符 * 可以为所有未明确匹配其他 Host 定义的连接设置默认参数。

```bash
Host *
    # 指定 SSH 尝试多个私钥进行认证
    # IdentityFile ~/.ssh/id_rsa_personal
    # IdentityFile ~/.ssh/id_rsa_work

    # 连接超时设置 (秒)
    ConnectTimeout 10
    # 保持连接活跃，防止因长时间不活动而断开
    # 每隔 60 秒向服务器发送一个空包
    ServerAliveInterval 60
    # 如果服务器连续 3 次未响应空包，则断开连接
    ServerAliveCountMax 3
```
</details> 

<details>
  <summary>示例 5: 禁用严格主机密钥检查（不推荐，仅用于测试或已知受信任的场景)</summary>
警告： 以下配置会降低安全性，容易受到中间人攻击 (Man-in-the-Middle Attack)，仅在完全了解风险的受控测试环境中使用。

```bash
Host temporary-test-server
    HostName test.example.org
    User test_user
    StrictHostKeyChecking no     # 禁用严格的主机密钥检查
    UserKnownHostsFile /dev/null # 不将新主机的密钥添加到 known_hosts 
```
</details>

## 重要配置项说明
以下是一些关键的 SSH 配置指令及其解释：
- `Host <别名>`: 定义一个连接配置块的开始，并为其指定一个易于记忆的别名。你可以使用 `ssh <别名>` 来发起连接。
- `User <用户名>`: 指定登录目标服务器时使用的用户名。
- `Port <端口号>`: 指定目标服务器上 SSH 服务监听的端口号。默认值为 22 。
- `IdentityFile <私钥文件路径>`:指定用于身份验证的 SSH 私钥文件的绝对路径。例如`~/.ssh/my_key`。
- `ProxyJump <跳板机别名或用户@跳板机IP[:端口]>`: 指示 SSH 通过一个或多个中间“跳板机”连接到最终的目标服务器。可以直接使用之前定义的跳板机别名。
- `StrictHostKeyChecking <yes|no|ask>`: 控制 SSH 客户端如何处理未知或已更改的主机密钥。
    - `yes`(默认): 如果主机密钥未知或已更改，拒绝连接。
    - `no`: 自动将新的主机密钥添加到 `known_hosts` 文件中，并且不提示用户。 存在安全风险。
    - `ask`: 首次连接新主机时，会提示用户确认是否信任该主机密钥。
- **AddKeysToAgent yes**：将密钥加载到内存中的 ssh-agent，避免每次连接都输入密码。
- **UseKeychain yes**：(macOS 独有)负责让 SSH 客户端从 macOS 钥匙串中自动获取密钥的密码，避免了首次加载密钥到 ssh-agent 时手动输入密码的麻烦。 
  - **ssh-agent**：是一个在后台运行的程序，它会存储你的解密后的 SSH 私钥。一旦私钥被添加到 ssh-agent，你就不需要每次使用该私钥进行 SSH 连接时都输入密码（passphrase）了。它会一直存储在内存中，直到 ssh-agent 被终止或者你手动从其中删除密钥。


