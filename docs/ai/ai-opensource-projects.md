# AI 开源项目



`gemini-2.5-pro` 是所有顶级的 AI 模型中，唯一可以免费使用的API

![image-20250705211525571](gemini-api-rate-limits-2025.png)

免费用户每分钟可以请求5次，每天10次。

我们可以使用多个API key 组成号池轮换使用，把免费的次数拓展到无限次，还能把API免费中转到国内无限爽用。

[Gemini Balance ](https://github.com/snailyp/gemini-balance)- 轮询代理服务，可以使用这个项目搭建一个Gemini API Key号池，轮询使用API Key，推荐使用服务器部署，或者也可以使用免费容器（如：ClawCloud Run）部署。服务器需要位于海外，才能访问Gemini的API





1. 创建.env文件

```
# 数据库配置
DATABASE_TYPE=mysql
#SQLITE_DATABASE=default_db
MYSQL_HOST=mysql
#MYSQL_SOCKET=/run/mysqld/mysqld.sock
MYSQL_PORT=3306
MYSQL_USER=gemini
MYSQL_PASSWORD=gemini
MYSQL_DATABASE=gemini-balance-db
API_KEYS=["AIzaSyCqK5HzG3XQxZrOHEKI-5S6FEqjBMT7bMc","AIzaSyAJUbtsndSNdmpBDiDYUH4NmJWnVDfuRSM"]
ALLOWED_TOKENS=["wyh-oci-gemini-balance"]
```



1. 创建数据库

   



