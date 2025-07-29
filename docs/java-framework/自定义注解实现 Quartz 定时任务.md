### 痛点

1. 使用Spring XML 配置 Quartz Job 方式较为繁琐。 JobDetail 和 Trigger
2. 各业务模块的 Job 必须在定义 SchedulerFactoryBean 时统一注册。无法按模块拆分Job配置。
3. Job 类必须继承 QuartzJobBean ，不利于扩展。
4. 希望向 Spring 原生的计划任务一样，只需要 @Scheduled("cron") 注解即可实现

### 实现效果

只需增加配置，即可实现自动注册Job

```java
@Configuration
public class QuartzConfig {
	@Bean
    public SchedulerFactoryBean schedulerFactoryBean(){
        ......
    }

    // 定义Bean quartzAnnotationProcessor 
    @Bean
    public QuartzAnnotationProcessor quartzAnnotationProcessor() {
        return new QuartzAnnotationProcessor();
    }
}
```

QuartzAnnotationProcessor 实现了将带 @QuartzScheduled 的方法 注册为Quartz Job

Job 简单示例

```java
/** 凌晨自动同步一次 */
@Component
public class xxJob{
    @QuartzScheduled("20 0 0 * * ?")
    public void job1() {}

    @QuartzScheduled(value="30 0 0 * * ?", group="xx")
    public void job2() {}
}
```

- @Component 类需要交由Spring管理
- @QuartzScheduled 有两个属性：group 和 value； group 表示分组，而 value 值是 cron表达式。



### 历史数据兼容

创建一个migrateOldTriggers 方法，用于从配置文件中读取Job，然后通过schedulerFactoryBean.setTriggers()

注册旧的定时任务。

```java
public List<Trigger> migrateOldTriggers(ApplicationContext applicationContext){
    List<Trigger> triggers  = new ArrayList<>();
	triggers.add(applicationContext.getBean("userLoginStatisticsTrigger",Trigger.class));
    //...
    return triggers;
}

@Bean
public SchedulerFactoryBean schedulerFactoryBean(){
    SchedulerFactoryBean factory = new SchedulerFactoryBean();
    //...
    factory.setTriggers(migrateOldTriggers(applicationContext).toArray(new Trigger[0]));
    return factory;
}
    
```