# Tomcat 架构详解（基于官方文档）

Apache Tomcat 是一个开源的 Servlet 容器，它为 Java Web 应用提供了运行环境。理解 Tomcat 的内部架构有助于开发人员和运维工程师更高效地部署、调试与调优 Java 应用。



Tomcat 遵循规范版本映射 https://tomcat.apache.org/whichversion.html

## 1. 整体架构概览

Tomcat 的核心架构可分为以下几个关键组件：

- **Server**：Tomcat 的顶层容器，表示整个服务器实例。
- **Service**：Server 中的子元素，连接请求接收组件（Connector）和应用处理组件（Engine）。
- **Connector**：用于接收来自客户端的请求（如 HTTP、AJP 协议）。
- **Engine**：处理请求的核心组件，内部包含多个 Host。
- **Host**：表示一个虚拟主机。
- **Context**：表示一个 Web 应用。



<pre>
                      ┌──►Connector                 
 Server ────► Service─┤                             
                      └──►Engine───►Host───►Context 
</pre>


## 3. Tomcat 请求处理流程

1. 用户通过浏览器访问 `http://example.com:8080/app`；
2. `Connector` 接收到请求，解析协议、端口；
3. 将请求转发给 `Engine`；
4. `Engine` 根据 `Host` 名称（`example.com`）定位到对应 `Host`；
5. `Host` 再根据 URL 路径（`/app`）找到对应的 `Context`；
6. `Context` 调用对应的 Servlet 处理请求并返回响应。



参考资料：

[Tomcat 架构文档](https://tomcat.apache.org/tomcat-9.0-doc/architecture/overview.html)
