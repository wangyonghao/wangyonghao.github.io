#### 什么是Spring框架？

Spring是一个轻量级控制反转（IoC）和面向切面（AOP)的容器框架。它是为了解决企业应用开发的复杂性而创建的。

- **轻量级** 从大小与开销两方面而言Spring都是轻量的。Spring应用中的对象不需要依赖Spring的特定类。
- **控制反转** 一个对象依赖的其他对象会通过被动的方式传入进来，而不是对象自己创建或者查找依赖对象。
- **面向切面 **Spring提供了面向切面编程的丰富支持，允许通过分离应用的业务逻辑与系统级服务（例如审计、事务管理和日志）进行内聚性的开发。应用对象只实现它们应该做的--完成业务逻辑—公此而已。
- **容器** Spring包含并管理应用对象的配置和生命周期。
- **框架** Spring可以将简单的组件配置、组合成为复杂的应用。在Spring中，应用对象被声明式地组合，典型地是在一个XML文件里。Spring也提供了很多基础功能（事务管理、持久化框架集成等等），将应用逻辑的开发留给了你。

#### Spring核心模块

Spring框架由七个定义明确的模块组成。

![img](https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=79964d3fa9014c080d3620f76b12696d/2e2eb9389b504fc245d07093e5dde71191ef6d9d.jpg)

1. **核心** 

   核心容器提供了Spring框架的基本功能。容器的主要组件是BeanFactory，BeanFactory是工厂模式的的一个实现，它使用IoC模式将应用程序配置与依赖性规范从实际的应用程序代码中分离出来。

2. **上下文** 

   核心模块的BeanFactory使用Spring成为一个容器，而上下文模块使它成为一个框架。这个模块扩展了BeanFactory的概念，提供了许多企业服务，如电子邮件、JNDI、EJB、国际化、校验、调度功能。

3. **AOP** 

   提供了符合AOP Alliance规范的面向切面的编程实现。

4. **DAO**

   DAO模块提供了JDBC的抽象层，消除了冗长的JDBC编码(取得连接、创建语句、处理结果集、关闭连接)。并建立了一个有意义的异常层次结构，来简化异常错误处理。

5. **ORM** 

   ORM模块为几种流行的ORM框架提供了集成方案，其中包括了Hibernate、JDO和 IBatis SQL Map等，所有这些都遵从Spring的通用事务和DAO异常层次结构。

6. **Web**

   Web模块建立于上下文模块之上，提供一个适用于Web应用的上下文。它也提供了spring和其它web框架的集成方案，比如Struts、WebWork。

7. **Web MVC**

   Web MVC模块提供了一个功能全面的构建Web应用程序的MVC框架。通过策略模式，使之变成为高度可配置的。MVC框架提供了清晰的角色划分：控制器、验证器、命令对象、表单对象和模型对象、分发器、处理器映射和视图解析器。它支持多种视图技术，包括JSP、Velocity、Tiles、iTest和POI。

#### Spring原理？

Spring是一个轻量级的控制反转和面向切面的容器框架。

Spring使用容器来实现控制反转思想。容器相当于Bean工厂，所有的Bean都会在容器中登记，保存在ConcurrentHashMap中。当需要使用到某个Bean时，容器通过反射为其注入依赖对象或属性。

AOP

Spring实现AOP的方式有两种，JDK动态代理和CGLib代理。 JDK动态代理：其代理对象必须是某个接口的实现，它是通过在运行期间创建一个接口的实现类来完成对目标对象的代理；其核心的两个类是InvocationHandler和Proxy。 CGLIB代理：实现原理类似于JDK动态代理，只是它在运行期间生成的代理对象是针对目标类扩展的子类。CGLIB的底层是依靠字节码技术ASM（开源的java字节码编辑类库）实现的，



~~Spring核心是Spring容器，容器的主要组件是BeanFactory，BeanFactory是工厂模式的的一个实现。容器负责管理bean生命周期以及依赖注入。bean配置的方式有三种：~~

  ~~1.基于xml的配置文件，容器通过DOM解析bean标签得到bean定义~~

  ~~2.基于类的注解（@Component@Service@Controler@Repository）,Spring容器根据注解的过滤规则扫描读取注解Bean定义类，并将其注册到Spring IoC容器中。~~

3. ~~Spring3.0新增了基于@Configuration注解的java类作为容器配置信息，将标注了@Bean方法的返回值识别为bean。@Bean等同于<bean/>标签~~

~~SpringIOC容器将解析后的bean定义信息和依赖关系封装到BeanDefinition对象，注册到beanDefinitionMap中(ConcurrentMap),如果bean是单例的，则会被容器使用反射机制进行实例化，放到单例缓存中备用。~~

~~依赖注入方式：~~

1. ~~构造参数注入  容器在调用构造方法时，注入参数值~~

2. ~~属性注入(setter方法) 容器在bean实例化后，通过反射的方式注入属性值~~

3. ~~字段注入(注解@Autowired @Resource @Value) 容器通过Bean后置注解处理器解析Bean内部的注解。~~

~~bean的注入实际是调用了工厂的getBean("")方法来获取bean的实例，再以反射的方式赋值~~







#### 什么是IoC?

一个对象依赖的其他对象会通过被动的方式传入进来，而不是对象自己创建或者查找依赖对象。

IoC即控制反转，IoC不是一种技术，只是一种思想，一个重要的面向对象编程的法则，它能指导我们如何设计出松耦合、更优良的程序。传统应用程序都是由我们在类内部主动创建依赖对象，从而导致类与类之间高耦合，难于测试；有了IoC容器后，把创建和查找依赖对象的控制权交给了容器，由容器进行注入组合对象，所以对象与对象之间是松散耦合，这样也方便测试，利于功能复用，更重要的是使得程序的整个体系结构变得非常灵活。

#### 什么是DI?

DI即依赖注入，由容器动态的将某个依赖关系注入到组件之中。依赖注入的目的是为了提升组件重用的频率，并为系统搭建一个灵活的、可扩展的平台。

**IoC和DI其实是同一个概念的不同角度描述**







#### Spring配置Bean的方式？

xml，注解，java config



#### Spring注入Bean的方式？

构造方法、注解、setter方法





#### BeanFactory 接口和 ApplicationContext 接口有什么区别 ？

ApplicationContext继承了BeanFactory接口，Spring核心工厂是BeanFactory,BeanFactory采取延迟加载模式，第一次getBean时才会始化Bean,ApplicationContext会在加载配置文件时初始化Bean。

另外，ApplicationContext还提供了可以进行国际化处理、事件传递、bean自动装配。



#### Spring使用了哪些设计模式，请举例说明	

1. 工厂方法模式：在BeanFactory以及ApplicationContext创建中都用到了

2. 抽象工厂模式：当bean有自己的工厂类时，使用class或factory-bean属性指定工厂类，factory-method属性指定工厂的创建实例方法。（Spring容器初始化时不会直接实例化bean，而是当调用factory-method所指定的方法时，才开始真正的实例化bean）.

3. 单例模式：在Spring中bean默认是单例模式，与GOF设计模式不同，一个容器只有一个bean

4. 适配器模式：以Adapter结尾的类，比如AOP的AdvisorAdapter接口

5. 代理模式：在AOP实现有体现,比如JdkDynamicAopProxy和Cglib2AopProxy

6. 模板方法模式：ClassPathXmlApplicationContext,FileSystemXmlApplicationContext继承了AbstractXmlApplicationContext的loadBeanDefinitions

7. 观察者模式：

​     ApplicationContext接口继承了ApplicationEventPublisher接口

​     ConfigurableApplicationContext.addApplicationListener(ApplicationListener<?> listener)

8. 策略模式：beans.SimpleInstantiationStrategy类实例化策略



#### Spring bean的生命周期？

 在Spring框架中，一旦把一个Bean交由SpringIoC容器之中，这个Bean的生命周期就会由容器进行管理，一般担当管理者角色的是BeanFactory或ApplicationContext。这里以beanFactory为例:

1. Bean的建立，--new

2. 执行bean的属性依赖注入--setter

3. 如果Bean类实现了BeanNameAware接口，则执行其setBeanName(String)方法，此处传递的就是Spring配置文件中Bean的id值

4. 如果Bean类实现了BeanFactoryAware接口，则执行其setBeanFactory方法，传递的是Spring工厂自身

5. 容器中，如果有实现了BeanPostProcessors的实现，则任何Bean在初始化之前都会调用它的processBeforeInitialization(Object,String)方法

6. 如果Bean类实现了InitializingBean接口，则执行afterPropertiesSet()方法。

7. 如果Bean定义文件中配置了init-method属性，则执行其配置的initMethod方法。

8. 容器中，如果有实现了BeanPostProcessors的实现，则任何Bean在初始化时都会调用它的processAfterInitialization(Object,String)方法

9. 在容器关闭时，如果Bean类实现了DisposableBean接口，则执行其destory()方法。

10. 在容器关闭时，如果在Bean定义文件中使用“destory-method”定义的方法，则执行其DestoryMethod方法。

如果是ApplicationContext来管理Bean的生命周期，与上边流程基本上相同，只不过在执行BeanNameAware的setBeanName之后，如果Bean类实现了ApplicationContextAware接口，则执行其setApplicationContext方法，然后再执行BeanPostProcessors的processBeforeInitialization()方法



#### Spring 作用域

singleton: IOC容器仅创建一个Bean实例，IOC容器每次返回的是同一个Bean实例。

prototype: 每次返回的都是一个新的实例。

request:  该属性仅对HTTP请求产生作用，使用该属性定义Bean时，每次HTTP请求都会创建一个新的Bean，适用于WebApplicationContext环境。

session:  该属性仅用于HTTP Session，同一个Session共享一个Bean实例。不同Session使用不同的实例。

globalSession; 该属性仅用于HTTP Session，同session作用域不同的是，所有的Session共享一个Bean实例。



#### AOP的使用场景

Authentication 权限检查        

Caching 缓存        

Context passing 内容传递        

Error handling 错误处理        

Lazy loading　延迟加载        

Debugging　　调试      

logging, tracing, profiling and monitoring　日志记录，跟踪，优化，校准        

Performance optimization　性能优化，效率检查        

Persistence　　持久化        

Resource pooling　资源池        

Synchronization　同步        

Transactions 事务管理    



### 注解篇

`@Resource`和`@Autowired`

共同点

`@Resource` 和`@Autowired` 都可以作为注入属性的修饰，在接口仅有单一实现类时，两个注解的修饰效果相同，可以互相替换，不影响使用。

不同点

- `@Resource` 是 `Java` 自己的注解，`@Resource` 有两个属性是比较重要的，分是 `name` 和`type`；`Spring` 将`@Resource` 注解的`name` 属性解析为`bean` 的名字，而`type` 属性则解析为`bean` 的类型。所以如果使用`name`属性，则使用`byName` 的自动注入策略，而使用`type` 属性时则使用`byType` 自动注入策略。如果既不指定`name` 也不指定`type` 属性，这时将通过反射机制使用`byType` 自动注入策略。
- `@Autowired` 是 `Spring` 的注解，是spring2.5版本引入的，`@Autowired`只根据`type`进行注入，不会去匹配`name`。如果涉及到type无法辨别注入对象时，那需要依赖 `@Qualifier` 或`@Primary` 注解一起来修饰

推荐使用`@Resource`