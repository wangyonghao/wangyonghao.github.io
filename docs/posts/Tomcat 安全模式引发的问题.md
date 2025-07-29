### 1. 资源访问被拒 access denied

`logs/catalina.out`日志堆栈如下：

```shell
21-Apr-2023 21:39:21.708 SEVERE [main] org.apache.tomcat.util.descriptor.web.WebXmlParser.parseWebXml Parse error in application web.xml file at [jar:file:/usr/local/tomcat-itas/webapps/ROOT/WEB-INF/lib/spring-web-5.2.22.RELEASE.jar!/META-INF/web-fragment.xml]
	java.security.AccessControlException: access denied ("java.lang.RuntimePermission" "accessClassInPackage.org.apache.tomcat.util.buf")
  		at java.security.AccessControlContext.checkPermission(AccessControlContext.java:472)
		at java.security.AccessController.checkPermission(AccessController.java:886)
		at java.lang.SecurityManager.checkPermission(SecurityManager.java:549)
		at java.lang.SecurityManager.checkPackageAccess(SecurityManager.java:1564)
		at sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:332)
```

**问题分析：**

当开启了https，并以安全模式`-security`启动 Tomcat 时，Web 进程没有权限读取资源。

**解决：**

编辑`conf/catalina.policy`文件, 添加`accessClassInPackage.org.apache.tomcat.util.buf`权限

```shell
// ========== WEB APPLICATION PERMISSIONS =====================================


// These permissions are granted by default to all web applications
// In addition, a web application will be given a read FilePermission
// for all files and directories in its document root.
grant {
    ***
  	// 添加此行 
    permission java.lang.RuntimePermission "accessClassInPackage.org.apache.tomcat.util.buf";
}
```

参考文章：

- https://tomcat.apache.org/tomcat-8.5-doc/security-manager-howto.html



###  2. Log4j 初始化报错

`logs/localhost.2023-04-21.log`日志堆栈如下：

```shell
21-Apr-2023 23:21:13.291 SEVERE [main] org.apache.catalina.core.StandardContext.listenerStart Error configuring application listener of class [org.directwebremoting.servlet.DwrListener]
	java.lang.NoClassDefFoundError: Could not initialize class org.apache.logging.log4j.util.PropertiesUtil
		at org.apache.logging.log4j.status.StatusLogger.<clinit>(StatusLogger.java:78)
		at org.apache.logging.log4j.LogManager.<clinit>(LogManager.java:61)
```