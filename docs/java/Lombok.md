---
title: Lombok
date: 2025-06-21 21:15
---
# Lombok
Lombok 作为 Java 生态中一个极为流行的工具，它通过注解（Annotations）在**编译期**自动生成常见的样板代码（Boilerplate Code），如getter、setter、构造函数、equals()、hashCode()、toString()等，没有任何额外的**运行时**开销或依赖。这极大地减少了代码的冗余，大幅提升了开发效率和代码的可读性。

## 1. 安装 Lombok

1. 安装 IDE 插件：为了正确识别和高亮Lombok生成的代码，IDE 需要安装对应的插件，主流 IDE (IntelliJ IDEA, Eclipse, VS Code) 都有Lombok 插件。
2. 添加 Lombok 依赖：在项目的 pom.xml 文件中添加 Lombok 依赖。
```xml
<!-- maven pom.xml -->
<dependencies>
    <!-- https://mvnrepository.com/artifact/org.projectlombok/lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.38</version>
        <scope>provided</scope>
    </dependency>
</dependencies>

<build>
	<plugins>
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-compiler-plugin</artifactId>
			<configuration>
				<annotationProcessorPaths>
					<path>
						<groupId>org.projectlombok</groupId>
						<artifactId>lombok</artifactId>
						<version>1.18.38</version>
					</path>
				</annotationProcessorPaths>
			</configuration>
		</plugin>
	</plugins>
</build>
```

## 2. Lombok 用法

### 2.1 Lombok注解说明
Lombok 注解简化了 Java 类的编写，尤其是简单 Java 对象（POJO），以下是一些常用的 Lombok 注解及其功能：

#### 2.1.1 `@Getter` / `@Setter`

- **应用于类：** 为该类中所有**非静态（non-static）**成员变量自动生成对应的 `getter` 或 `setter` 方法。
- **应用于字段：** 仅为该特定字段生成 `getter` 或 `setter` 方法。
- **可配置：** 可以通过 `@AccessLevel` (例如 `AccessLevel.PRIVATE`) 设定生成方法的访问权限，也可以配置是否支持懒加载 (`lazy = true` 仅对 `@Getter` 有效)。

#### 2.1.2 `@ToString`

- **应用于类：** 自动生成一个标准的 `toString()` 方法。
- **功能：** 默认包含所有**非静态**字段的值。
- **可配置：** 可以通过 `of` 属性限定只显示某些字段，或通过 `exclude` 属性排除某些字段，还可以通过 `callSuper = true` 来调用父类的 `toString()` 方法。

#### 2.1.3 `@EqualsAndHashCode`

- **应用于类：** 自动生成高质量的 `equals()` 和 `hashCode()` 方法。
- **重要性：** 这些方法对于在 Java 集合类（如 `HashSet`、`HashMap`）中正确使用对象作为键或元素至关重要，确保对象能被正确比较和存储。
- **可配置：** 同样支持 `of` 和 `exclude` 属性来控制哪些字段参与计算。

#### 2.1.4 `@NoArgsConstructor`

- **应用于类：** 自动生成一个无参数的公共构造函数。
- **注意：** 如果类中存在 `final` 字段，这些字段将不会被初始化，这可能导致编译错误，除非它们在声明时就被初始化。

#### 2.1.5 `@RequiredArgsConstructor`

- **应用于类：** 自动生成一个构造函数，该构造函数包含所有 `final` 字段以及所有使用 `@NonNull` 注解标记的字段作为参数。
- **用途：** 适用于那些必须在对象创建时被初始化的关键字段。

#### 2.1.6 `@AllArgsConstructor`

- **应用于类：** 自动生成一个包含所有**非静态（non-static）**字段作为参数的构造函数。
- **用途：** 当你需要一个能够同时初始化所有对象属性的构造函数时非常方便。

#### 2.1.7 `@Data`

- **应用于类：**这是一个复合注解，相当于一次性应用了以下多个注解：
  - `@Getter` (应用于所有非静态字段)
  - `@Setter` (应用于所有非静态字段)
  - `@ToString`
  - `@EqualsAndHashCode`
  - `@RequiredArgsConstructor`
- **用途：** 常用于简单的 POJO（Plain Old Java Object）或数据传输对象（DTO）。

#### 2.1.8 `@Value`

- **应用于类：** 用于创建**不可变（Immutable）**的数据类。
- **功能：** 它类似于 `@Data`，但所有字段默认变为 `final`（因此它们将不能通过 `setter` 方法被修改），且不生成 `setter` 方法。同时，它还会生成一个包含所有字段的公共构造函数。
- **用途：** 适用于需要严格保证数据完整性和线程安全性的场景。

#### 2.1.9 `@Builder`

- **应用于类或构造函数：** 自动生成 Builder 模式的代码，提供一种更易读、更灵活的方式来创建对象，特别是当对象有多个可选参数时。
- **提供方法：** 生成一个静态的 `builder()` 方法和一个内部 `Builder` 类。

#### 2.1.10 `@Slf4j` / `@Log4j2` / `@Log` 等

- **应用于类：** 这些注解（以及其他类似的日志注解，如`@Log`, `@Log4j`, `@CommonsLog`等）用于生成一个标准的 `static final Logger log;` 字段。
- **用途：** 方便你在类中直接使用日志框架（如 SLF4J、Log4j2、JUL 等）进行日志记录，而无需手动声明 Logger 实例。

### 2.2 Lombok 注解使用示例

下面是几个常用Lombok注解的使用示例，以及它们大致会生成什么效果：

#### 2.2.1 `@Data` 示例

这个注解最常见，可以一口气简化大量样板代码。

```java
// Java源代码
import lombok.Data;

@Data
public class User {
    private String name;
    private int age;
}

// 经过Lombok处理（在编译期注入代码后），大致相当于：
/*
public class User {
    private String name;
    private int age;

    public User(String name, int age) { // @RequiredArgsConstructor, 如果字段都为final或有@NonNull才会生成
        this.name = name;
        this.age = age;
    }
    public String getName() { return this.name; }
    public void setName(String name) { this.name = name; }

    public int getAge() { return this.age; }
    public void setAge(int age) { this.age = age; }

    @Override
    public boolean equals(Object o) { ...复杂的equals实现... }

    @Override
    public int hashCode() { ...复杂的hashCode实现... }

    @Override
    public String toString() {
        return "User(name=" + this.name + ", age=" + this.age)";
    }
}
*/

// 使用示例：
public class Main {
    public static void main(String[] args) {
        User user = new User("Alice", 30, "alice@example.com"); // 可以通过 @RequiredArgsConstructor 生成的构造函数
        System.out.println(user.getName()); // 调用自动生成的getter
        user.setAge(31); // 调用自动生成的setter
        System.out.println(user); // 调用自动生成的toString
    }
}

```

#### 2.2.2 `@Builder` 示例

当对象有较多字段，或希望提供更清晰的构造方式时，Builder模式非常有用。

```java
// Java源代码
import lombok.Builder;
import lombok.ToString; // 额外添加ToString方便打印

@Builder
@ToString
public class Product {
    private String id;
    private String name;
    private double price;
    private String description;
    private int stock;
}

// 编译后，Product类中会有一个静态内部类 ProductBuilder，以及静态方法 Product.builder()。

// 使用示例：
public class Main {
    public static void main(String[] args) {
        // 使用Builder模式创建Product对象
        Product laptop = Product.builder()
                                .id("P001")
                                .name("Laptop Pro")
                                .price(1299.99)
                                .description("Powerful laptop for professionals")
                                .stock(50)
                                .build();

        Product mouse = Product.builder()
                               .id("A002")
                               .name("Wireless Mouse")
                               .price(25.00)
                               .build(); // 可以只设置部分字段

        System.out.println(laptop);
        System.out.println(mouse);
    }
}
```

#### 2.2.3 `@Value` 示例

创建不可变对象，确保数据一旦创建就不能被修改。

```
// Java源代码
import lombok.Value;

@Value
public class Point {
    int x;
    int y;
    String label; // 默认就是final的
}

// 编译后，Point类中所有字段都是final的，没有setter，有all-args构造函数，以及getter/toString/equals/hashCode。

// 使用示例：
public class Main {
    public static void main(String[] args) {
        Point p1 = new Point(10, 20, "Start"); // 自动生成的全参构造函数
        System.out.println("Point (p1): " + p1.getX() + ", " + p1.getY() + ", " + p1.getLabel());
        System.out.println(p1);

        // p1.setX(15); // 编译错误！因为没有setter方法，Point对象是不可变的
    }
}

```

#### 2.2.4 `@Slf4j` 示例

简化日志记录的初始化。

```java
// Java源代码
import lombok.extern.slf4j.Slf4j;

@Slf4j // 适用于SLF4J框架
public class OrderService {

    public void processOrder(String orderId) {
        log.info("开始处理订单: {}", orderId); // 直接使用log对象
        try {
            // 模拟业务处理逻辑
            Thread.sleep(100);
            log.debug("订单 {} 处理中...", orderId);
            if (orderId.equals("FAIL")) {
                throw new RuntimeException("订单处理失败");
            }
            log.info("订单 {} 处理完成。", orderId);
        } catch (Exception e) {
            log.error("处理订单 {} 发生错误: {}", orderId, e.getMessage(), e);
        }
    }
}

// 编译后，OrderService类中会有一个：
// private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(OrderService.class);

// 使用示例：
public class Main {
    public static void main(String[] args) {
        OrderService service = new OrderService();
        service.processOrder("ORD123");
        service.processOrder("FAIL");
    }
}
```

## 3. Lombok 工作原理

Lombok 的真正强大之处在于它能够**在编译期直接操作编译器内部的抽象语法树（Abstract Syntax Tree, AST）**，从而在字节码生成之前，向你的类中“注入”代码。自 Java 6 起，Java编译器（`javac`） 开始支持  [JSR 269](https://jcp.org/aboutJava/communityprocess/maintenance/jsr269/index19.html)  规范，即**注解处理器（Annotation Processor）机制**，这一机制允许开发者编写自己的处理器，在编译时扫描代码中的注解，并根据这些注解执行一些操作。

Lombok 正是巧妙地利用并扩展了这一机制，其工作原理可以概括为以下步骤：

1. **依赖引入与处理器加载：** 当我们将 Lombok 的 JAR 包作为编译期依赖（通常通过构建工具如 Maven/Gradle 的 `provided` 或 `annotationProcessor` 范围）添加到项目的 `classpath` 中时，`javac` 在被调用进行编译时，会识别并加载 Lombok 的注解处理器。
2. **源代码解析与 AST 构建：** `javac` 在编译 Java 源代码（`.java` 文件）时，第一步会将其解析成本身的内部表示——一个内存中的数据结构，即**抽象语法树（AST）**。这个 AST 完整地描述了你的源代码结构，包括类、字段、方法、语句等所有元素。
3. **Lombok 的 AST 操作（Manipulation）：** 在步骤中，Lombok 的注解处理器会遍历并找到源代码中带有 Lombok 注解（如 `@Getter`、`@Setter`、`@Data` 等）的类，然后**直接修改**该类在内存中的抽象语法树（AST），向 AST 中添加新的节点（例如，代表 getter 或 setter 方法的节点），从而“注入”了相应的代码结构。对于编译器而言，这些新添加的代码就如同开发者手动编写的一样。
4. **字节码生成（Bytecode Generation）：** 在 Lombok 完成对抽象语法树（AST）的修改之后，`javac` 会继续其正常的编译流程。它将根据这个经过 Lombok 修改和完善后的 AST，生成最终的 Java 字节码文件（`.class` 文件）。
5. **运行时：** 当程序运行时，Java 虚拟机（JVM）加载的是包含了所有完整方法（包括 Lombok 自动生成的方法）的 `.class` 文件。对于 JVM 来说，这些方法是编译期生成的标准 Java 代码，它不区分这些方法是手动编写的，还是 Lombok 在编译时注入的。因此，我们可以在运行时正常地调用这些方法，且不会引入任何额外的运行时开销或依赖。

## 4. 思考与总结

Lombok 无疑是一个**高效且实用的提效工具**，它告别了大量冗余、重复的样板代码，使我们的 Java Bean 或 POJO 能以极小的篇幅呈现，只保留核心的字段定义。这使得代码看起来更加“纯粹”，开发者能更聚焦于业务逻辑的实现，提高代码的可读性。

同时，Lombok 也隐藏着一些值得我们深思的问题：

1. **隐式代码 (Implicit Code) 与“黑盒”效应：**这是 Lombok 最大的争议点。你所编写的 `.java` 源代码中并没有显式的 `getter`/`setter`、构造函数或其他方法，但在编译后生成的 `.class` 文件中，这些方法确实存在。对于不熟悉 Lombok 的团队成员或新加入的开发者来说，这种“魔法”可能会让他们感到困惑，代码行为变得不那么直观，就像面对一个“黑盒”，增加了理解和调试的难度。
2. **潜在的设计滥用 (Potential for Misuse)：**Lombok 的便捷性可能导致开发者过度依赖它，甚至不假思索地在所有类上使用 `@Data` 等复合注解。然而，`@Data` 包含了 `@Getter`、`@Setter`、`@ToString`、`@EqualsAndHashCode` 和 `@RequiredArgsConstructor` 等一系列功能，这些默认生成的方法可能并不总是符合你的设计意图：
   - 例如，`equals()` 和 `hashCode()` 的默认实现可能包含所有字段，这对于某些领域模型（如实体 ID）来说可能不是你想要的比较逻辑。
   - `ToString()` 可能会输出过多敏感信息，不适合直接用于日志或对外展示。
   - 无节制地生成 `setter` 方法可能破坏对象的封装性和不可变性。 这种“一刀切”的使用方式，可能导致开发者对类设计的思考不足，从而引入不恰当的行为或埋下潜在的运行时问题。

因此，我们需要清楚每个注解背后究竟生成了哪些代码，保持克制使用注解。





