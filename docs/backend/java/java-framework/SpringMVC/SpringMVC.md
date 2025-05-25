## 如何优雅的把接口参数中的空白值替换为null值？

在spring 的文档中查阅到StringTrimmerEditor（https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-beans） 可以实现**「Get」**方法时参数去除空格：

```java
@ControllerAdvice
public class GlobalControllerAdiviceController {
    //WebDataBinder是用来绑定请求参数到指定的属性编辑器，可以继承WebBindingInitializer
    //来实现一个全部controller共享的dataBiner Java代码
    @InitBinder
    public void dataBind(WebDataBinder binder) {
        ///注册
        binder.registerCustomEditor(String.class, new StringTrimmerEditor(true));
    }
}
```

注意，StringTrimmerEditor构造方法中有一个参数，如果传入true,则会将空白转换为null. 这样前面写的StringEditor就不用了，spring 已经帮我们写好了。

```java

public Jackson2ObjectMapperBuilderCustomizer jackson2ObjectMapperBuilderCustomizer() {
    return new Jackson2ObjectMapperBuilderCustomizer() {
        @Override
        public void customize(Jackson2ObjectMapperBuilder jacksonObjectMapperBuilder) {
            jacksonObjectMapperBuilder
                    .deserializerByType(String.class, new StdScalarDeserializer<String>(String.class) {
                        @Override
                        public String deserialize(JsonParser jsonParser, DeserializationContext ctx)
                                throws IOException {
                            // 重点在这儿:如果为空白则返回null
                            String value = jsonParser.getValueAsString();
                            if (value == null || "".equals(value.trim())) {
                                return null;
                            }
                            return value;
                        }
                    });
        }
    };
}
```

把上面的自定义StringDescrializer和MappingJackson2HttpMessageConverter去掉, 只保留上面的就行。