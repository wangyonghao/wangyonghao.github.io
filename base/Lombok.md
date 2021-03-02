

## 引入 Lombok

maven 坐标

IDE 插件

## Lombok 注解

- `@Getter/@Setter`：作用类上，生成所有成员变量的`getter/setter`方法；作用于成员变量上，生成该成员变量的`getter/setter`方法。可以设定访问权限及是否懒加载等。
- `@ToString`：作用于类，覆盖默认的toString()方法，可以通过of属性限定显示某些字段，通过exclude属性排除某些字段。**
- `@Data`：作用于类上，是以下注解的集合：`@ToString @EqualsAndHashCode @Getter @Setter @RequiredArgsConstructor`

## Lombok实现原理

自从Java 6起，javac就支持“JSR 269 Pluggable Annotation Processing API”规范，只要程序实现了该API，就能在javac运行的时候得到调用。

Lombok就是一个实现了"JSR 269 API"的程序。在使用javac的过程中，它产生作用的具体流程如下：

1. javac对源代码进行分析，生成一棵抽象语法树(AST)

2. javac编译过程中调用实现了JSR 269的Lombok程序

3. 此时Lombok就对第一步骤得到的AST进行处理，找到Lombok注解所在类对应的语法树    (AST)，然后修改该语法树(AST)，增加Lombok注解定义的相应树节点

4. javac使用修改后的抽象语法树(AST)生成字节码文件

