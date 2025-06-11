# Arthas 调试线上代码技巧

Arthas（阿尔萨斯）是一款Alibaba**开源的 Java 诊断工具**。它能够在**不重启应用**、**不修改代码**的情况下，实时查看 JVM 内部运行状态，帮助开发者解决生产环境问题。

**核心功能概括：**

- **实时监控：** 查看 JVM 内存、CPU、线程、GC 等状态。
- **代码追踪：** 追溯方法调用、定位代码耗时，支持条件过滤。
- **热更新：** 在线修改方法、替换类文件（仅限测试/调试），无需重启。
- **反编译：** 将 JVM 中加载的字节码反编译为 Java 源码，查看实际运行代码。
- **排查死锁/内存泄漏：** 辅助分析线程死锁、排查内存溢出区域。



## 启动

```bash
curl -O https://arthas.aliyun.com/arthas-boot.jar
java -jar arthas-boot.jar
```

## 反编译代码

```bash
jad –-source-only com.ams.testarthas.IndexController test --lineNumber false
jad --source-only com.amg. starthas. TestConstants hello --lineNumber false
```



## 监视方法执行



```bash
watch com.ams.testarthas.IndexController test 「params, returnObi, throwExpl -n 5 -x 3
```



### 获取静态字段



```plain
getstatic com.ams.testarthas.TestConstants a -x 3
```



## 执行静态方法



```plain
ognl '@com.ams.testarthas.TestConstants@hello("ams")'
```



## 编译class文件



```plain
mc -d /Users/neil/Desktop//Users/neil/Desktop/TestConstants.java
```



### jad和mc和retransform 結合使用



- 不允许新增加field/method

- 正在跑的函数，没有退出不能生效。比如下面新增加的Svstom.out.orintin。只有run0函数里的会生效



```bash
jad -source-only com.ams.testarthas. TestConstants > /Users/neil/Desktop/TestConstants.java

mc/Users/neil/Desktop/TestConstants.java-d/Users/neil/Desktop/

retransform/Users/neil/Desktop/com/ams/testarthas/TestConstants.class
```



## 列出retransform



```bash
retransform -l
```



### 删除指定retransform



```bash
retransform -d 1
retransform --deleteAll
```



# 命令列表



## jvm 相关



- [dashboard](https://arthas.aliyun.com/doc/dashboard.html) - 当前系统的实时数据面板

- [getstatic](https://arthas.aliyun.com/doc/getstatic.html) - 查看类的静态属性

- [heapdump](https://arthas.aliyun.com/doc/heapdump.html) - dump java heap, 类似 jmap 命令的 heap dump 功能

- [jvm](https://arthas.aliyun.com/doc/jvm.html) - 查看当前 JVM 的信息

- [logger](https://arthas.aliyun.com/doc/logger.html) - 查看和修改 logger

- [mbean](https://arthas.aliyun.com/doc/mbean.html) - 查看 Mbean 的信息

- [memory](https://arthas.aliyun.com/doc/memory.html) - 查看 JVM 的内存信息

- [ognl](https://arthas.aliyun.com/doc/ognl.html) - 执行 ognl 表达式

- [perfcounter](https://arthas.aliyun.com/doc/perfcounter.html) - 查看当前 JVM 的 Perf Counter 信息

- [sysenv](https://arthas.aliyun.com/doc/sysenv.html) - 查看 JVM 的环境变量

- [sysprop](https://arthas.aliyun.com/doc/sysprop.html) - 查看和修改 JVM 的系统属性

- [thread](https://arthas.aliyun.com/doc/thread.html) - 查看当前 JVM 的线程堆栈信息

- [vmoption](https://arthas.aliyun.com/doc/vmoption.html) - 查看和修改 JVM 里诊断相关的 option

- [vmtool](https://arthas.aliyun.com/doc/vmtool.html) - 从 jvm 里查询对象，执行 forceGc



## class/classloader 相关



- [classloader](https://arthas.aliyun.com/doc/classloader.html) - 查看 classloader 的继承树，urls，类加载信息，使用 classloader 去 getResource

- [dump](https://arthas.aliyun.com/doc/dump.html) - dump 已加载类的 byte code 到特定目录

- [jad](https://arthas.aliyun.com/doc/jad.html) - 反编译指定已加载类的源码

- [mc](https://arthas.aliyun.com/doc/mc.html) - 内存编译器，内存编译`.java`文件为`.class`文件

- [redefine](https://arthas.aliyun.com/doc/redefine.html) - 加载外部的`.class`文件，redefine 到 JVM 里

- [retransform](https://arthas.aliyun.com/doc/retransform.html) - 加载外部的`.class`文件，retransform 到 JVM 里

- [sc](https://arthas.aliyun.com/doc/sc.html) - 查看 JVM 已加载的类信息

- [sm](https://arthas.aliyun.com/doc/sm.html) - 查看已加载类的方法信息



## monitor/watch/trace 相关



请注意，这些命令，都通过字节码增强技术来实现的，会在指定类的方法中插入一些切面来实现数据统计和观测，因此在线上、预发使用时，请尽量明确需要观测的类、方法以及条件，诊断结束要执行 `stop` 或将增强过的类执行 `reset` 命令。



- [monitor](https://arthas.aliyun.com/doc/monitor.html) - 方法执行监控

- [stack](https://arthas.aliyun.com/doc/stack.html) - 输出当前方法被调用的调用路径

- [trace](https://arthas.aliyun.com/doc/trace.html) - 方法内部调用路径，并输出方法路径上的每个节点上耗时

- [tt](https://arthas.aliyun.com/doc/tt.html) - 方法执行数据的时空隧道，记录下指定方法每次调用的入参和返回信息，并能对这些不同的时间下调用进行观测

- [watch](https://arthas.aliyun.com/doc/watch.html) - 方法执行数据观测



## 焰图



- [profiler](https://arthas.aliyun.com/doc/profiler.html) - 使用[async-profiler在新窗口打开](https://github.com/jvm-profiling-tools/async-profiler)对应用采样，生成火焰图

- [jfr](https://arthas.aliyun.com/doc/jfr.html) - 动态开启关闭 JFR 记录