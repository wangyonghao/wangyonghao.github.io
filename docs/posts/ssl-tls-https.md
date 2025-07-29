# SSL、TLS 和 HTTPS 概念对比

SSL、TLS 和 HTTPS 都与 **网络传输安全**有关，但它们的作用、层级和关系不同。



### 一、概念对比

| 名称  | 全称                     | 作用                   | 关系                            |
| ----- | ------------------------ | ---------------------- | ------------------------------- |
| SSL   | Secure Sockets Layer     | 安全协议，已废弃       | TLS 的前身                      |
| TLS   | Transport Layer Security | 安全协议，用于加密传输 | 替代 SSL，现主流                |
| HTTPS | HTTP over SSL/TLS        | 加密的 HTTP 协议       | 使用 TLS（或旧的 SSL）加密 HTTP |

### 二、 历史演进

SSL 1.0 → SSL 2.0 → SSL 3.0（已废弃）

TLS 1.0 → 1.1 → 1.2（主流）→ 1.3（更安全）

所谓“SSL证书”，其实现在用的都是 **TLS协议**，只是名字延续了“SSL”说法。



### 三、一句话总结

**HTTPS = HTTP + TLS（或旧的 SSL）**，TLS/SSL 是实现安全的加密协议，HTTPS 是实际使用它的安全通信方式。