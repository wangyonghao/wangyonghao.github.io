# Java版本新特性

> 版本特性比较多，这里只列举重要的几个。想要深入了解，请查阅参考链接。

## Java5 新特性

- 泛型
- 枚举
- 装箱拆箱
- 变长参数
- 注解
- foreach 循环
- 静态导入
- 格式化
- 线程框架/数据结构
- Arrays工具类/StringBuilder/instrument

参考：

- [New Features and Enhancements J2SE 5.0](http://docs.oracle.com/javase/1.5.0/docs/relnotes/features.html)

## Java6 新特性

- 脚本引擎
- Java  Compile API
- 注解处理API
- 支持JDBC4.0规范
- JAX-WS2.0规范
- 轻量级的HttpServer

参考：

- [Java 6 Features and Enhancements](http://www.oracle.com/technetwork/java/javase/features-141434.html)

## Java7 新特性

- 整数类型(byte, short, int, long)可以使用二进制（前缀0b或0B）表示。
- 数值中使用“_”分隔数字，提高代码可读性。
- switch语句中的字符串。
- 泛型实例创建的类型推断。
- try-with-resources语句。
- 使用改进的类型检查捕获多个异常类型和重新抛出异常。

- NIO

参考:

- [Java SE 7 Features and Enhancements](https://www.oracle.com/technetwork/java/javase/jdk7-relnotes-418459.html)

## Java8 新特性

- **Lambda 表达式** Lambda允许把函数作为一个方法的参数（函数作为参数传递进方法中。
- **方法引用** 方法引用提供了非常有用的语法，可以直接引用已有Java类或对象（实例）的方法或构造器。与lambda联合使用，方法引用可以使语言的构造更紧凑简洁，减少冗余代码。
- **默认方法** ** 允许将新功能添加到库的接口。
- **Stream API** 新添加的Stream API（java.util.stream） 把真正的函数式编程风格引入到Java中。
- **Date Time API** 新的日期时间API，提供全面的日期时间模型。
- **Optional 类** 用来解决空指针异常。
- **Base64** 提供了内置的Base64编码。
- **Nashorn JavaScript** 新的Javascript引擎。

参考:

- [JDK 8中的新功能](https://www.oracle.com/technetwork/java/javase/8-whats-new-2157071.html)

## Java9 新特性

> 为了更快地迭代，以及跟进社区反馈，Java 的版本发布周期变更为每六个月一次，并且承诺不会跳票。新的发布周期也会严格遵循时间点，将在每年的 3 月份和 9 月份发布。

- **模块系统**：模块是一个包的容器，Java 9 最大的变化之一是引入了模块系统（Jigsaw 项目）。
- **REPL (JShell)**：交互式编程环境。
- **HTTP 2 客户端**：HTTP/2标准是HTTP协议的最新版本，新的 HTTPClient API 支持 WebSocket 和 HTTP2 流以及服务器推送特性。
- **改进的 Javadoc**：Javadoc 现在支持在 API 文档中的进行搜索。另外，Javadoc 的输出现在符合兼容 HTML5 标准。
- **集合工厂方法**：List，Set 和 Map 接口中，新的静态工厂方法可以创建这些集合的不可变实例。
- **私有接口方法**：在接口中使用private私有方法。我们可以使用 private 访问修饰符在接口中编写私有方法。
- **进程 API**: 改进的 API 来控制和管理操作系统进程。引进 java.lang.ProcessHandle 及其嵌套接口 Info 来让开发者逃离时常因为要获取一个本地进程的 PID 而不得不使用本地代码的窘境。
- **改进的 Stream API**：改进的 Stream API 添加了一些便利的方法，使流处理更容易，并使用收集器编写复杂的查询。
- **改进 try-with-resources**：如果你已经有一个资源是 final 或等效于 final 变量,您可以在 try-with-resources 语句中使用该变量，而无需在 try-with-resources 语句中声明一个新变量。
- **改进的弃用注解 @Deprecated**：注解 @Deprecated 可以标记 Java API 状态，可以表示被标记的 API 将会被移除，或者已经破坏。
- **改进钻石操作符(Diamond Operator)** ：匿名类可以使用钻石操作符(Diamond Operator)。
- **改进 Optional 类**：java.util.Optional 添加了很多新的有用方法，Optional 可以直接转为 stream。
- **多分辨率图像 API**：定义多分辨率图像API，开发者可以很容易的操作和展示不同分辨率的图像了。
- **改进的 CompletableFuture API** ： CompletableFuture 类的异步机制可以在 ProcessHandle.onExit 方法退出时执行操作。
- **轻量级的 JSON API**：内置了一个轻量级的JSON API
- **响应式流（Reactive Streams) API**: Java 9中引入了新的响应式流 API 来支持 Java 9 中的响应式编程。

参考：

- [What's New in JDK 9](https://docs.oracle.com/javase/9/whatsnew/toc.htm)

## Java 10 的 12 项关键新特性

- [JEP 286](http://openjdk.java.net/jeps/286): 局部变量的类型推断。该特性在社区讨论了很久并做了调查，可查看 [JEP 286 调查结果](http://mail.openjdk.java.net/pipermail/platform-jep-discuss/2016-December/000066.html)
- [JEP 296](http://openjdk.java.net/jeps/296): 将 JDK 的多个代码仓库合并到一个储存库中
- [JEP 304](http://openjdk.java.net/jeps/304): 垃圾收集器接口。通过引入一个干净的垃圾收集器（GC）接口，改善不同垃圾收集器的源码隔离性。
- [JEP 307](http://openjdk.java.net/jeps/307): 向 G1 引入并行 Full GC
- [JEP 310](http://openjdk.java.net/jeps/310): 应用类数据共享。为改善启动和占用空间，在现有的类数据共享（“CDS”）功能上再次拓展，以允许应用类放置在共享存档中
- [JEP 312](http://openjdk.java.net/jeps/312): 线程局部管控。允许停止单个线程，而不是只能启用或停止所有线程
- [JEP 313](http://openjdk.java.net/jeps/313): 移除 Native-Header Generation Tool (javah)
- [JEP 314](http://openjdk.java.net/jeps/314): 额外的 Unicode 语言标签扩展。包括：cu (货币类型)、fw (每周第一天为星期几)、rg (区域覆盖)、tz (时区) 等
- [JEP 316](http://openjdk.java.net/jeps/316): 在备用内存设备上分配堆内存。允许 HotSpot 虚拟机在备用内存设备上分配 Java 对象堆
- [JEP 317](http://openjdk.java.net/jeps/317): 基于 Java 的 JIT 编译器（试验版本）
- [JEP 319](http://openjdk.java.net/jeps/319): 根证书。开源 Java SE Root CA 程序中的根证书
- [JEP 322](http://openjdk.java.net/jeps/322): 基于时间的版本发布模式。“Feature releases” 版本将包含新特性，“Update releases” 版本仅修复 Bug

**Java 11 的 关键新特性**

- 181：[基于嵌套的访问控制](http://openjdk.java.net/jeps/181)
- 309：[动态类 - 文件常量](http://openjdk.java.net/jeps/309)
- 315：[改进Aarch64内在函数](http://openjdk.java.net/jeps/315)
- 318：[Epsilon：无操作垃圾收集器](http://openjdk.java.net/jeps/318)
- 320：[移除Java EE和CORBA模块](http://openjdk.java.net/jeps/320)
- 321：[HTTP客户端（标准）](http://openjdk.java.net/jeps/321)
- 323：[本地变量Lambda参数](http://openjdk.java.net/jeps/323)
- 324的[语法](http://openjdk.java.net/jeps/323)：[与Curve25519和Curve448的密钥协议](http://openjdk.java.net/jeps/324)
- 327：[Unicode 10](http://openjdk.java.net/jeps/327)
- 328：[飞行记录器](http://openjdk.java.net/jeps/328)
- 329：[ChaCha20和Poly1305加密算法](http://openjdk.java.net/jeps/329)
- 330：[启动单文件源代码程序](http://openjdk.java.net/jeps/330)
- 331：[低开销堆分析](http://openjdk.java.net/jeps/331)
- 332：[传输层安全性（TLS）1.3](http://openjdk.java.net/jeps/332)
- 333：[ZGC：可扩展的低延迟垃圾收集器（实验性）](http://openjdk.java.net/jeps/333)
- 335：[弃用Nashorn JavaScript引擎](http://openjdk.java.net/jeps/335)
- 336：[弃用Pack200工具和API](http://openjdk.java.net/jeps/336)