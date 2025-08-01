# 架构师视角

什么是软件架构？
描述如何构建应用程序，包括其组件、它们如何相互交互、它们运行的环境等等。

架构的演进


软件架构学习路线
https://roadmap.sh/software-architect


```plantuml
@startmindmap
* 系统设计
** 软件设计与架构
*** 整洁代码原则
*** 设计原则
*** 开发设计模式
*** 架构原则
*** 架构风格
*** 架构设计模式
*** 企业设计模式
** 性能指标
*** Performance vs Scalability 性能 vs 可扩展性
*** Latency vs Throughput 延迟 vs 吞吐量
*** Availability vs Consisitency 可用性和一致性
** 域名
** CDN
** 负载均衡
** 应用层
** 数据层
** 缓存
** 异步机制
** 后台任务 Background Jobs
** Communication
*** HTTP
*** TCP
*** UDP
*** REST
*** gRPC
*** RPC
** 反性能模式
** 可靠性设计模式
** 监控
** 云 
*** 设计与实现
*** 数据管理
*** 消息
@endmindmap
```

系统设计学习路线：https://roadmap.sh/system-design


### 1. 域名系统 (DNS)

域名系统（DNS）是互联网基础设施的一个基本组成部分，将用户友好的域名转换为其相应的IP地址。它充当了互联网的电话簿，允许用户通过输入易于记忆的域名而不是计算机用于识别彼此的数值IP地址（如“192.0.2.1”）来访问网站和服务。

当您在Web浏览器中输入域名时，DNS负责查找相关的IP地址并将您的请求发送到适当的服务器。这个过程从您的计算机向递归解析器发送查询开始，然后递归解析器搜索一系列DNS服务器，从根服务器开始，然后是顶级域（TLD）服务器，最终是权威域名服务器。一旦找到IP地址，递归解析器将其返回给您的计算机，允许您的浏览器与目标服务器建立连接并访问所需的内容。

![Image](/assets/how-dns-work.png "null")

**DNS**

### 2. 负载均衡器

负载均衡器是一种用于分发入站网络流量到多个服务器的网络设备或软件，以确保最佳资源利用、降低延迟并保持高可用性。在出现突发流量或服务器请求不均匀分布的情况下，负载均衡器在扩展应用程序和有效管理服务器工作负载方面发挥着至关重要的作用。

负载均衡器使用各种算法来确定入站流量的分发。一些常见的算法包括：

•**轮询算法:** 请求按顺序和均匀地分配到所有可用服务器。•**最少连接算法:** 负载均衡器将请求分配给具有最少活动连接的服务器，为较不繁忙的服务器提供优先。•**IP哈希算法:** 客户端的IP地址被哈希，生成的值用于确定请求应该被定向到哪个服务器。这种方法确保特定客户端的请求一直路由到相同的服务器，有助于维护会话一致性。

![Image](/assets/loadbalancer-design.png "null")

**负载均衡器**

### 3. API 网关

API网关是一种充当外部客户端与应用程序的内部微服务或基于API的后端服务之间中间件的服务器或服务。它是当今体

系结构的重要组件，特别是在基于微服务的系统中，它简化了通信过程，为客户端提供访问各种服务的单一入口点。

API网关的主要功能包括：

1.请求路由：API网关根据预定义的规则和配置，将来自客户端的传入API请求路由到适当的后端服务或微服务。2.身份验证和授权：API网关管理用户身份验证和授权，确保只有经授权的客户端才能访问服务。它在将请求路由到后端服务之前验证API密钥、令牌或其他凭证。3.速率限制和节流：为了保护后端服务免受过大的负荷或滥用，API网关根据预定义的策略对客户端的请求进行速率限制或节流。4.缓存：为了降低延迟和后端负载，API网关缓存经常使用的响应，直接提供给客户端，无需查询后端服务。5.请求和响应转换：API网关可以修改请求和响应，例如转换数据格式、添加或删除标头，或更改查询参数，以确保客户端和服务之间的兼容性。

![Image](/assets/auth-design.png "null")

**API 网关**

### 4. 内容交付网络 (CDN)

内容交付网络（CDN）是一个分布式服务器网络，用于存储和传递内容，如图像、视频、样式表和脚本，以使用户可以从地理位置更接近他们的位置访问这些内容。CDN旨在提高内容传递的性能、速度和可靠性，无论用户相对于原始服务器的位置如何。以下是CDN的运作方式：

1.当用户从网站或应用程序请求内容时，请求被定向到最近的CDN服务器，也称为边缘服务器。2.如果边缘服务器已经缓存了请求的内容，它将直接向用户提供内容。这个过程减少了延迟并提高了用户体验，因为内容传输的距离更短。3.如果边缘服务器没有缓存请求的内容，CDN将从原始服务器或附近的另一个CDN服务器检索内容。一旦内容被获取，它将被缓存在边缘服务器上并提供给用户。4.为了确保内容保持最新，CDN定期检查原始服务器以获取更改，并相应地更新其缓存。

![Image](/assets/how-cdn-work.png)

Image.png

**CDN**

### 5. 正向代理与反向代理

正向代理，也称为“代理服务器”或简称“代理”，是位于一个或多个客户机之前的服务器，充当客户机和互联网之间的中介。当客户机请求互联网上的资源时，请求首先发送到正向代理。正向代理然后代表客户机将请求发送到互联网，然后将

响应返回给客户机。

另一方面，反向代理是位于一个或多个Web服务器之前的服务器，充当Web服务器和互联网之间的中介。当客户端请求互联网上的资源时，请求首先发送到反向代理。反向代理然后将请求转发到其中一个Web服务器，然后将响应返回给客户端。

![正向代理与反向代理](/assets/forward-proxy-and-reverse-proxy.png)

### 6. 缓存

缓存是位于应用程序和原始数据源（如数据库、文件系统或远程Web服务）之间的高速存储层。当应用程序请求数据时，首先检查缓存。如果数据存在于缓存中，将返回给应用程序。如果在缓存中找不到数据，则从其原始来源检索数据，将其存储在缓存中以备将来使用，然后返回给应用程序。在分布式系统中，缓存可以出现在多个位置，包括客户端、DNS、CDN、负载均衡器、API网关、服务器、数据库等等。

![640-1681472](/assets/cache-design.png)

### 7. 数据分区

在数据库中，**水平分区**，通常称为**分片**，涉及将表的行分成较小的表，并存储在不同的服务器或数据库实例上。这种方法用于在多个服务器之间分发数据库负载，从而提高性能。

相反，**垂直分区**涉及将表的列分成单独的表。这个技术旨在减少表中的列数，提高只访问有限数量列的查询性能。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/b8r1Kxg2cLK3UHumGVUIDVMllFzH7tUqD2Fib9U6N9VNyOYHrmqNJ4k7xfaWRtFSPVxjXu3GOg3ZWUsrLCd08Fw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

**数据分区**

### 8. 数据库复制

数据库复制是一种用于在不同服务器或位置之间维护相同数据库的方法。数据库复制的主要目标是增加数据的可用性、冗余和容错性，以确保系统即使在硬件故障或其他问题出现时仍然可以正常运行。

在复制数据库配置中，一个服务器充当主数据库，而其他服务器则充当副本。这涉及在主数据库和副本之间同步数据，以确保它们都具有相同的最新信息。数据库复制提供了多个优点，包括：

1.改进性能：通过在多个副本之间分发读查询，可以减轻主数据库的负载，从而提高查询响应时间。2.高可用性：如果主数据库发生故障或停机，副本可以继续提供数据，确保对应用程序的不间断访问。3.增强的数据保护：在不同位置维护数据库的多个副本有助于防止由于硬件故障或其他灾难而导致的数据丢失。4.负载平衡：副本可以处理读查询，从而实现更好的负载分配并减轻主数据库的整体压力。

### 9. 分布式消息系统

分布式消息系统为多个可能分布在不同地理位置的应用程序、服务或组件之间交换消息提供了可靠、可扩展和容错的方式。这些系统通过解耦发送方和接收方组件，使它们能够独立开发和运行。分布式消息系统在大型或复杂系统中尤其有价值，比如微服务架构或分布式计算环境中。这些系统的示例包括Apache Kafka和RabbitMQ。

### 10. 微服务

微服务代表一种架构风格，其中一个应用程序被组织成一组小型、松散耦合的、可以独立部署的服务。每个微服务负责应用程序内的特定功能或领域，并通过明确定义的API与其他微服务通信。这种方法不同于传统的单体架构，传统单体架构将应用程序构建为单一、紧密耦合的单元。

微服务的主要特点包括：

1.独立部署：每个微服务可以独立开发、测试和部署，无需影响其他微服务。2.技术多样性：每个微服务可以使用不同的技术栈，以满足其特定需求。3.易于维护：由于微服务的规模较小，它们通常更易于维护、扩展和修改。4.可扩展性：可以根据需要扩展单独的微服务，而无需为整个应用程序进行扩展。

### 11. 数据库

数据库是一种结构化数据的持久存储系统，用于存储、检索和管理数据。数据库在各种应用程序和系统中都有广泛的应用，从基本的数据存储到复杂的分析和报告系统。主要的数据库类型包括：

•**关系型数据库（RDBMS）：** 使用表格结构来存储数据，并支持SQL查询语言。常见的关系型数据库包括MySQL、PostgreSQL、Oracle和Microsoft SQL Server。•**NoSQL数据库：** 这些数据库不使用传统的表格结构，而使用文档、列族、键值对或图形等非关系数据结构来存储数据。NoSQL数据库包括MongoDB、Cassandra、Redis和Elasticsearch。•**NewSQL数据库：** 这是一种中间方式，结合了关系数据库和NoSQL数据库的某些特性。NewSQL数据库旨在提供可扩展性、高性能和分布式能力。

### 12. 前端缓存

前端缓存是一种用于缓存Web应用程序的用户界面（HTML、CSS、JavaScript等）以提高性能的技术。前端缓存可以通过减少从服务器请求资源的次数、降低延迟并提供更快的用户体验来改进Web应用程序的性能。前端缓存通常采用浏览器缓存、CDN和缓存服务等多种形式。

### 13. 后端缓存

后端缓存是一种用于缓存应用程序的数据和计算结果以提高性能的技术。它将数据存储在内存中，以便将来更快地检索。后端缓存通常用于存储数据库查询结果、API响应和计算密集型任务的结果。一些常见的后端缓存技术包括Redis和Memcached。

### 14. 安全性

安全性是系统设计中至关重要的概念。它包括身份验证、授权、加密、跨站脚本（XSS）和跨站请求伪造（CSRF）防护、数据保护、网络安全等。系统设计应考虑各种威胁和安全攻击，以确保系统的数据和用户得到保护。

### 15. 高可用性与容错性

高可用性和容错性是系统设计的关键目标。高可用性涉及确保系统在面临故障或中断时保持可用。容错性涉及系统在出现故障或错误时能够恢复正常运行。实现高可用性和容错性通常需要使用负载均衡、故障转移、冗余和监控等技术。

### 16. 事件驱动架构

事件驱动架构是一种应用程序架构，其中应用程序的不同组件通过事件进行通信。事件是应用程序中发生的特定动作或状态更改，可以触发其他组件的响应。事件驱动架构通常用于实现松散耦合的组件，以便能够更轻松地扩展和修改系统。

### 17. 日志和监控

在系统设计中，日志和监控是关键工具，用于识别和解决性能问题、故障和安全问题。日志记录有助于跟踪系统的操作和问题，而监控则提供了实时的性能数据和警报。在分布式系统中，有效的日志和监控可以帮助工程师快速诊断问题和优化系统。

### 18. 测试策略

测试是系统设计和开发的关键组成部分。测试策略涉及确定测试范围、创建测试计划、编写测试用例、执行测试、自动化测试、性能测试等。有效的测试策略有助于确保系统的可靠性、性能和安全性。

这18个系统设计概念涵盖了构建可伸缩、高性能、高可用性和安全的系统所需的核心知识。
