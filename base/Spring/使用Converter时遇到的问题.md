

实现 org.springframework.core.convert.converter.Converter，自定义参数转换器，如下：

```java
@Configuration
public class DateConverterConfig {
    @Bean
    public Converter<String, LocalDate> localDateConverter() {
      	return new Converter<String, LocalDate>() {
            @Override
            public LocalDate convert(String source) {
                return LocalDate.parse(source, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            }
        };
    }
}
```

以上两个bean会注入到spring mvc的参数解析器（好像叫做`ParameterConversionService`），当传入的字符串要转为LocalDateTime类时，spring会调用该Converter对这个入参进行转换。

本来我的想法是为了代码精简，将上面匿名内部类的写法精简成lambda表达式的方式：

```java 
@Bean
@ConditionalOnBean(name = "requestMappingHandlerAdapter")
public Converter<String, LocalDate> localDateConverter() {
  return source -> LocalDate.parse(source, DateTimeFormatter.ofPattern(DEFAULT_DATE_FORMAT));
}
```

当我再次启动项目时却出现了异常：

```
Caused by: java.lang.IllegalArgumentException: Unable to determine source type <S> and target type <T> for your Converter [com.example.demo126.config.MappingConverterAdapter$$Lambda$522/817994751]; does the class parameterize those types?
```

web项目启动注册`requestMappingHandlerAdapter`的时候会初始化`WebBindingInitializer`

```
adapter.setWebBindingInitializer(getConfigurableWebBindingInitializer());
```

而`ConfigurableWebBindingInitializer`需要`FormattingConversionService`, 而`FormattingConversionService`会将所有的`Converter`添加进来，添加的时候需要获取泛型信息：

```
@Override
public void addFormatters(FormatterRegistry registry) {
    for (Converter<?, ?> converter : getBeansOfType(Converter.class)) {
      	registry.addConverter(converter);
    }
    for (GenericConverter converter : getBeansOfType(GenericConverter.class)) {
      	registry.addConverter(converter);
    }
    for (Formatter<?> formatter : getBeansOfType(Formatter.class)) {
      	registry.addFormatter(formatter);
    }
}
```

添加Converter.class 一般是通过接口获取两个泛型的具体类型

```
public ResolvableType as(Class<?> type) {
    if (this == NONE) {
      return NONE;
    }
    Class<?> resolved = resolve();
    if (resolved == null || resolved == type) {
      return this;
    }
    for (ResolvableType interfaceType : getInterfaces()) {
      ResolvableType interfaceAsType = interfaceType.as(type);
      if (interfaceAsType != NONE) {
        return interfaceAsType;
      }
    }
    return getSuperType().as(type);
}
```

Lambda表达式的接口是`Converter`，并不能得到具体的类型