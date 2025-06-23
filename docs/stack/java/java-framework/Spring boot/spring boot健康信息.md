

Spring Boot的健康信息都是从`ApplicationContext`中的各种`HealthIndicator`
Beans中收集到的，Spring Boot框架中包含了大量的`HealthIndicator`的实现类。

最终的Spring Boot应用的状态是由`HealthAggregator`汇总而成的，汇总的算法是：

1. 设置状态码顺序（默认）：`setStatusOrder(Status.DOWN, Status.OUT_OF_SERVICE, Status.UP, Status.UNKNOWN);`。
2. 收集所有`HealthIndicator`的状态码，过滤掉不能识别的状态码
3. 如果无任何状态码，整个spring boot应用的状态是 `UNKNOWN`。
4. 将所有收集到的状态码按照状态码顺序排序。
5. 返回状态码序列中的第一个状态码，作为整个spring boot应用的状态。









## Spring Boot 自动配置原理

Spring Boot 的自动配置功能是由 `@EnableAutoConfiguration` 注解提供的。`@EnableAutoConfiguration` 是一个组合注解，它使用了 `@Import`元注解来导入配置，同时指明由 `AutoConfigurationImportSelector` 类进行事先条件判断	。在 `AutoConfigurationImportSelector` 类中使用 `SpringFactoriesLoader.loadFactoryNames` 方法来扫描具有 `META-INF/spring.factories` 文件的包，`spring.factories` 文件声明了有哪些自动配置 `AutoConfiguration`。这些`AutoConfiguration`使用条件注解（包含了`@Conditional`的组合注解）来配置 Bean。