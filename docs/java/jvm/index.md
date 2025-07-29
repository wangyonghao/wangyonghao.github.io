# JVM 知识体系

Java 虚拟机（JVM）是 Java 语言能够“一次编写，到处运行”的核心。它是一个抽象的计算机，负责将 Java 字节码翻译成特定平台的机器码并执行。理解 JVM 对于 Java 开发者来说至关重要，因为它能帮助你编写出更高效、更稳定的代码，并更好地进行性能调优和故障排查。

### JVM 的主要组成部分

JVM 的架构通常可以分为以下几个关键部分：

### 1. 类加载系统 (Class Loading Subsystem)
类加载器负责在运行时将 `.class` 文件（包含字节码）加载到 JVM 内存中。它经历三个主要阶段：

- **加载 (Loading):** 查找并加载类的二进制数据到内存中。
- **链接 (Linking):**
  - **验证 (Verification):** 确保加载的 `.class` 文件符合 JVM 规范，没有安全问题。
  - **准备 (Preparation):** 为类的静态变量分配内存，并初始化为默认值。
  - **解析 (Resolution):** 将字节码中的符号引用（如类名、方法名）转换为直接引用（内存地址）。
- **初始化 (Initialization):** 执行类的 `<clinit>()` 方法，初始化静态变量为程序员指定的值，并执行静态代码块。

JVM 中有三种主要的内置类加载器：

- **启动类加载器 (Bootstrap ClassLoader):** 负责加载 `JRE/lib` 目录下的核心类库。
- **扩展类加载器 (Extension ClassLoader):** 负责加载 `JRE/lib/ext` 目录下的扩展库。
- **应用程序类加载器 (Application ClassLoader):** 负责加载应用程序 classpath 下的类。

------

### 2. 运行时数据区 (Runtime Data Areas)

这是 JVM 在程序执行期间分配内存的区域，主要包括：

- **程序计数器 (Program Counter Register):** 一块很小的内存空间，用于存储当前线程正在执行的字节码指令地址。它是**线程私有**的，每个线程都有一个独立的程序计数器。
- **Java 虚拟机栈 (Java Virtual Machine Stacks):** 描述 Java 方法执行的内存模型。每个方法在执行时都会创建一个**栈帧 (Stack Frame)**，用于存储局部变量表、操作数栈、动态链接和方法出口信息。它也是**线程私有**的。
- **本地方法栈 (Native Method Stacks):** 与虚拟机栈类似，但它为 JVM 执行的 Native 方法服务（即由 C/C++ 等语言编写的方法）。也是**线程私有**的。
- **Java 堆 (Java Heap):** JVM 中**最大**的一块内存区域，用于存储对象实例和数组。它是**所有线程共享**的区域，也是垃圾回收器主要管理的地方。堆通常分为新生代（Young Generation）和老年代（Old Generation）。
- **方法区 (Method Area):** 用于存储已被 JVM 加载的类信息、常量、静态变量、即时编译器编译后的代码等数据。它是**所有线程共享**的区域。在 JDK 8 之后，元空间 (Metaspace) 取代了永久代（PermGen），位于本地内存而非 JVM 内存。

------

### 3. 执行引擎 (Execution Engine)

执行引擎负责执行加载到内存中的字节码。它包括：

- **解释器 (Interpreter):** 逐行解释字节码并执行，启动速度快，但执行效率相对较低。
- **即时编译器 (Just-In-Time Compiler, JIT):**
  - **热点代码 (HotSpot Code):** 识别出程序中频繁执行的代码，将其编译成**机器码**并缓存起来。
  - **优化:** 对编译后的机器码进行各种优化，提高执行效率。
  - **客户端编译器 (C1) 和 服务端编译器 (C2):** 两种不同的 JIT 编译器，C1 编译速度快，优化程度低；C2 编译速度慢，但优化程度高，适用于长时间运行的服务端应用。
- **垃圾回收器 (Garbage Collector, GC):** 自动管理堆内存。它会找出不再被引用的对象并清除它们，以释放内存空间。常见的垃圾回收器包括：
  - **Serial GC:** 单线程、停顿一切 (Stop The World)。
  - **Parallel GC:** 多线程、停顿一切。
  - **CMS GC:** 并发标记清除，停顿时间短，但有碎片问题。
  - **G1 GC:** 面向服务端应用，兼顾吞吐量和停顿时间。
  - **ZGC / Shenandoah:** 新一代的低延迟垃圾回收器。

------

### 4. 本地方法接口 (Native Method Interface) & 本地方法库 (Native Method Libraries)

- **本地方法接口 (JNI - Java Native Interface):** 允许 Java 代码与其他语言（如 C/C++）进行交互。Java 代码可以通过 JNI 调用本地方法库中的函数，反之亦然。
- **本地方法库:** 包含用其他语言编写的、供 Java 代码调用的库。