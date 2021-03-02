# 使用Optional优化判空代码

日常if-return`判空
```java 
public String testSimple(Test4 test) {  
    if (test == null) {  
      return "";  
    }  
    if (test.getTest3() == null) {  
      return "";  
    }  
    if (test.getTest3().getTest2() == null) {  
      return "";  
    }  
    if (test.getTest3().getTest2().getInfo() == null) {  
      return "";  
    }  
    return test.getTest3().getTest2().getInfo();  
}
```

但是使用 `Optional`后，整个就都不一样了。

```java
public String testOptional(Test test) {  
    return Optional.ofNullable(test).flatMap(Test::getTest3)  
        .flatMap(Test3::getTest2)  
        .map(Test2::getInfo)  
        .orElse("");  
}  
```

##### 使用Optional具有如下优点：

1. 将防御式编程代码完美包装
2. 链式调用
3. 有效避免程序代码中的空指针

##### 但是也同样具有一些缺点：

1. 流行性不是非常理想，团队新成员需要学习成本
2. 安卓中需要引入Guava，需要团队每个人处理IDEA默认提示，或者忍受黄色提示