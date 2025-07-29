# Java技术体系







### 1. JVM (Java Virtual Machine) - Java 虚拟机

JVM 是用于运行 Java 程序的虚拟计算机，屏蔽了不同硬件和操作系统的差异，使 Java 实现了“**一次编写，到处运行（Write Once, Run Anywhere）**”。

### 2. **JRE (Java Runtime Environment) - Java 运行时环境**

**JRE** 是运行Java 程序的标准环境，它主要由两部分组织 JVM 和 Java 标准类库

 是你**运行 Java 应用程序所需的一切**如果你只是想在电脑上运行一个别人编写的 Java 程序，而不需要自己开发，那么安装 JRE 就足够了。JRE 主要由两部分组成：**JVM：** 它是 JRE 的核心，负责执行字节码。Java 核心类库（Java Class Libraries）这是一系列预先编写好的类文件和支持文件（如 `rt.jar`，Runtime Library），包含了 Java 应用程序运行时所需的基础功能，比如文件 I/O、网络、图形用户界面（GUI）等。

### 3. JDK (Java Development Kit) - Java 开发工具包

**JDK** 是 Java 的**开发工具包**，它是面向 Java 开发人员的。如果你需要编写、编译、调试和运行 Java 程序，那么你必须安装 JDK。JDK 内置了一个 JRE，因为开发过程中也需要运行和测试代码。



##  JVM/JRE/JDK 三者之间的关系

JDK ⊃ JRE  ⊃  JVM

**JDK** 为Java程序员提供的一整套开发工具包，它包含 JRE + 编译器（javac）等开发工具

**JRE** 为Java程序提供运行所需环境，包含 JVM + 核心类库

**JVM** 负责运行Java 字节码