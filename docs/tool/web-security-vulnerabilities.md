---
title: 常见Web 漏洞修复建议
tags: [security]
date: 2025-01-01 10:00
---


# 常见Web 漏洞修复建议

## 1.SQL注入

### 　　漏洞描述

​        Web程序中对于用户提交的参数未做过滤直接拼接到SQL语句中执行，导致参数中的特殊字符破坏了SQL语句原有逻辑，攻击者可以利用该漏洞执行任意SQL语句，如查询数据、下载数据、写入webshell、执行系统命令以及绕过登录限制等。

### 　　修复建议

​      代码层最佳防御sql漏洞方案：使用预编译sql语句查询和绑定变量。

　（1）使用预编译语句，使用PDO需要注意不要将变量直接拼接到PDO语句中。所有的查询语句都使用数据库提供的参数化查询接口，参数化的语句使用参数而不是将用户输入变量嵌入到SQL语句中。当前几乎所有的数据库系统都提供了参数化SQL语句执行接口，使用此接口可以非常有效的防止SQL注入攻击。

　（2）对进入数据库的特殊字符（’”<>&*;等）进行转义处理，或编码转换。

　（3）确认每种数据的类型，比如数字型的数据就必须是数字，数据库中的存储字段必须对应为int型。

　（4）数据长度应该严格规定，能在一定程度上防止比较长的SQL注入语句无法正确执行。

　（5）网站每个数据层的编码统一，建议全部使用UTF-8编码，上下层编码不一致有可能导致一些过滤模型被绕过。

　（6）严格限制网站用户的数据库的操作权限，给此用户提供仅仅能够满足其工作的权限，从而最大限度的减少注入攻击对数据库的危害。

　（7）避免网站显示SQL错误信息，比如类型错误、字段不匹配等，防止攻击者利用这些错误信息进行一些判断。

　（8）过滤危险字符，例如：采用正则表达式匹配union、sleep、and、select、load_file等关键字，如果匹配到则终止运行。

## 2.XSS

### 　　**漏洞描述**

　（1）Web程序代码中对用户提交的参数未做过滤或过滤不严，导致参数中的特殊字符破坏了HTML页面的原有逻辑，攻击者可以利用该漏洞执行恶意HTML/JS代码、构造蠕虫、篡改页面实施钓鱼攻击、以及诱导用户再次登录，然后获取其登录凭证等。

   （2）XSS攻击对Web服务器本身虽无直接危害，但是它借助网站进行传播，对网站用户进行攻击，窃取网站用户账号身份信息等，从而也会对网站产生较严重的威胁。

###  **修复建议**

​      XSS漏洞本质上是一种html注入，也就是将html代码注入到网页中。那么其防御的根本就是在将用户提交的代码显示到页面上时做好一系列的过滤与转义

　（1）过滤输入的数据，对例如：“ ‘ ”，“ “ ”，” < “，” > “，” on* “，script、iframe等危险字符进行严格的检查。这里的输入不仅仅是用户可以直接交互的输入接口，也包括HTTP请求中的Cookie中的变量，HTTP请求头部中的变量等。

　（2）不仅验证数据的类型，还要验证其格式、长度、范围和内容。

　（3）不仅在客户端做数据的验证与过滤，关键的过滤步骤在服务端进行。

　（4）对输出到页面的数据进行相应的编码转换，如HTML实体编码、JS编码等。对输出的数据也要检查，数据库里的值有可能会在一个大网站的多处都有输出，即使在输入做了编码等操作，在各处的输出点时也要进行检查。

## **3.XXE**

###  **漏洞描述**

​       XXE漏洞全称XML External Entity Injection即XML外部实体注入漏洞,XXE漏洞发生在应用程序解析XML输入时，没有禁止外部实体的加载，导致可加载恶意外部文件，造成文件读取、命令执行、内网端口扫描、×××内网网站、发起dos×××等危害。XEE漏洞触发的点往往是可以上传xml文件的位置，没有对上传的xml文件进行过滤，导致可上传恶意xml文件。

### **漏洞建议**

  （1） 检查所使用的底层XML解析库，默认禁止外部实体的解析；

  （2） 是若使用第三方应用代码,需要及时升级补丁；

  （3）是对用户提交的XML数据进行过滤，如关键词：<!DOCTYPE和<!ENTITY或者SYSTEM和PUBLIC等。

## **4.CSRF**

### **漏洞描述**

​         CSRF是跨站请求伪造，不攻击网站服务器，而是冒充用户在站内的正常操作。通常由于服务端没有对请求头做严格过滤引起的。CSRF会造成密码重置，用户伪造等问题，可能引发严重后果。绝大多数网站是通过 cookie 等方式辨识用户身份，再予以授权的。所以要伪造用户的正常操作，最好的方法是通过 XSS 或链接欺骗等途径，让用户在本机（即拥有身份 cookie 的浏览器端）发起用户所不知道的请求。CSRF攻击会令用户在不知情的情况下攻击自己已经登录的系统。

### **修复建议**

​    （1）验证请求的Referer是否来自本网站，但可被绕过。

　（2）在请求中加入不可伪造的token，并在服务端验证token是否一致或正确，不正确则丢弃拒绝服务。

## **5.SSRF**

### **漏洞描述**

​       SSRF（Server-Side Request Forgery，服务器端请求伪造）：通俗的来说就是我们可以伪造服务器端发起的请求，从而获取客户端所不能得到的数据。SSRF漏洞形成的原因主要是服务器端所提供的接口中包含了所要请求的内容的URL参数，并且未对客户端所传输过来的URL参数进行过滤。这个漏洞造成的危害有：

　（1）可以对外网、服务器所在内网、本地进行端口扫描，获取一些服务的banner信息;

　（2）攻击运行在内网或本地的应用程序（比如溢出）;

　（3）对内网Web应用进行指纹识别，通过访问默认文件实现;

   （4）攻击内外网的Web应用，主要是使用Get参数就可以实现的攻击（比如Struts2漏洞利用，SQL注入等）;

　（5）利用File协议读取本地文件。

### **修复建议**

  （1）禁用不需要的协议，只允许HTTP和HTTPS请求，可以防止类似于file://, gopher://, ftp:// 等引起的问题。

  （2）白名单的方式限制访问的目标地址，禁止对内网发起请求

  （3）过滤或屏蔽请求返回的详细信息，验证远程服务器对请求的响应是比较容易的方法。如果web应用是去获取某一种类型的文件。那么在把返回结果展示给用户之前先验证返回的信息是否符合标准。

  （4）验证请求的文件格式

  （5）禁止跳转

  （6）限制请求的端口为http常用的端口，比如 80、443、8080、8000等

  （7）统一错误信息，避免用户可以根据错误信息来判断远端服务器的端口状态。

## **6.任意命令/代码执行**

### **漏洞描述**

　　命令或代码执行漏洞是指代码未对用户可控参数做过滤，导致直接带入执行命令和代码，通过漏洞执行恶意构造的语句，执行任意命令或代码。攻击者可在服务器上执行任意命令，读写文件操作等，危害巨大。

### **修复建议**

　　（1）严格过滤用户输入的数据，禁止执行非预期系统命令。

　　（2）减少或不使用代码或命令执行函数

　　（3）客户端提交的变量在放入函数前进行检测

　　（4）减少或不使用危险函数

## **7.任意文件上传**

### **漏洞描述**

　　文件上传漏洞通常由于代码中对文件上传功能所上传的文件过滤不严或web服务器相关解析漏洞未修复而造成的，如果文件上传功能代码没有严格限制和验证用户上传的文件后缀、类型等，攻击者可通过文件上传点上传任意文件，包括网站后门文件（webshell）控制整个网站。

### **修复建议**

　（1）对上传文件类型进行验证，除在前端验证外在后端依然要做验证，后端可以进行扩展名检测，重命名文件，MIME类型检测以及限制上传文件的大小等限制来防御，或是将上传的文件其他[文件存储](https://cloud.tencent.com/product/cfs?from_column=20065&from=20065)服务器中。

　（2）严格限制和校验上传的文件，禁止上传恶意代码的文件。同时限制相关上传文件目录的执行权限，防止木马执行。

　（3）对上传文件格式进行严格校验，防止上传恶意脚本文件；

　（4）严格限制上传的文件路径。

　（5）文件扩展名在服务端白名单校验。

　（6）文件内容服务端校验。

　（7）上传文件重命名。

　（8）隐藏上传文件路径。

## **8.目录穿越/目录遍历**

### 　   **漏洞描述**

　　文件下载或获取文件显示内容页面由于未对传入的文件名进行过滤，利用路径回溯符../跳出程序本身的限制目录，来下载或显示任意文件。

### 　　**修复建议**

　　对传入的文件名参数进行过滤，并且判断是否是允许获取的文件类型，过滤回溯符../。

## **9.文件包含**

### **漏洞描述**

　　本地文件包含是指程序在处理包含文件的时候没有严格控制。利用这个漏洞，攻击者可以先把上传的文件、网站日志文件等作为代码执行或直接显示出来，或者包含远程服务器上的恶意文件，进而获取到服务器权限。

###  **修复建议**

　（1）严格检查变量是否已经初始化。

　（2）对所有输入提交可能包含的文件地址，包括服务器本地文件及远程文件，进行严格的检查，参数中不允许出现./和../等目录跳转符。

　（3）严格检查文件包含函数中的参数是否外界可控。

## **10.弱口令**

### **漏洞描述**

　　由于网站用户帐号存在弱口令，导致攻击者通过弱口令可轻松登录到网站中，从而进行下一步的攻击，如上传webshell，获取敏感数据。

　　另外攻击者利用弱口令登录网站管理后台，可执行任意管理员的操作。

### **修复建议**

　　（1）强制用户首次登录时修改默认口令，或是使用用户自定义初始密码的策略；

　　（2）完善密码策略，信息安全最佳实践的密码策略为8位（包括）以上字符，包含数字、大小写字母、特殊字符中的至少3种。

　　（3）增加人机验证机制，限制IP访问次数。

## **11.暴力破解**

### **漏洞描述**

　　由于没有对登录页面进行相关的人机验证机制，如无验证码、有验证码但可重复利用以及无登录错误次数限制等，导致攻击者可通过暴力破解获取用户登录账号和密码。

### **修复建议**

　（1）如果用户登录次数超过设置的阈值，则锁定帐号(有恶意登录锁定帐号的风险)

　（2）如果某个 IP登录次数超过设置的阈值，则锁定IP

　（3）增加人机验证机制

　（4）验证码必须在服务器端进行校验，客户端的一切校验都是不安全的。

## **12.越权访问**

### **漏洞描述**

　　由于没有对用户访问角色的权限进行严格的检查及限制，导致当前账号可对其他账号进行相关操作，如查看、修改等。对低权限对高权限账户的操作为纵向越权，相同权限账户之间的操作成为横向越权也称水平越权。

### **修复建议**

　（1）对用户访问角色的权限进行严格的检查及限制。

　（2）在一些操作时可以使用session对用户的身份进行判断和控制

## **13.未授权访问**

### **漏洞描述**

　　由于没有对网站敏感页面进行登录状态、访问权限的检查，导致攻击者可未授权访问，获取敏感信息及进行未授权操作。

### **修复建议**

　（1）页面进行严格的访问权限的控制以及对访问角色进行权限检查。

　（2）可以使用session对用户的身份进行判断和控制。

## **14.列目录**

### **漏洞描述**

　　由于web服务器配置不当，开启了目录浏览，攻击者可获得服务器上的文件目录结构，获取敏感文件。

### **修复建议**

　　（1）通过修改配置文件，禁止中间件（如IIS、apache、tomcat）的文件目录索引功能

　　（2）设置目录访问权限

## **15.CRLF注入**

### **漏洞描述**

​     CRLF 是“回车 +换行”（\r\n）的简称。在 HTTP 协议中，HTTPHeader 与 HTTP Body 是用两个 CRLF 符号进行分隔的，浏览器根据这两个 CRLF 符号来获取 HTTP 内容并显示。因此，一旦攻击者能够控制 HTTP 消息头中的字符，注入一些恶意的换行，就能注入一些会话 Cookie 或者 HTML 代码。

### **修复建议**

​      过滤 \r 、\n 及其各种编码的换行符，避免输入的数据污染到其他 HTTP 消息头。

## **16.LDAP注入**

### **漏洞描述**

　　由于Web 应用程序没有对用户发送的数据进行适当过滤和检查，攻击者可修改LDAP 语句的结构，并且以[数据库服务](https://cloud.tencent.com/product/tencentdb-catalog?from_column=20065&from=20065)器、Web 服务器等的权限执行任意命令，许可权可能会允许查询、修改或除去 LDAP 树状构造内任何数据。

### **修复建议**

　　对用户的输入内容进行严格的过滤。

## **17.URL 跳转**

### **漏洞描述**

　　有的Web 应用程序中使用URL参数中的地址作为跳转链接的功能 ，攻击者可实施钓鱼、恶意网站跳转等攻击。

###  **修复建议**

　（1）在进行页面跳转前校验传入的URL是否为可信域名。

　（2）白名单规定跳转链接

## **18.明文传输**

### **漏洞描述**

　　用户登录过程中使用明文传输用户登录信息，若用户遭受中间人攻击时，攻击者可直接获取该用户登录账户，从而进行进一步渗透。

### **修复建议**

　（1）用户登录信息使用加密传输，如密码在传输前使用安全的算法加密后传输，可采用的算法包括：不可逆hash算法加盐（4位及以上随机数，由服务器端产生）；安全对称加密算法，如AES(128、192、256位)，且必须保证客户端密钥安全，不可被破解或读出；非对称加密算法，如RSA(不低于1024位)、SM2等。

　（2）使用https来保证传输的安全。

## **19.敏感信息泄露**

### **漏洞描述**

　　在页面中或者返回的响应包中泄露了敏感信息，通过这些信息，给攻击者渗透提供了非常多的有用信息。

###  **修复建议**

　　（1）如果是探针或测试页面等无用的程序建议删除，或者修改成难以猜解的名字。

​       （2）不影响业务或功能的情况下删除或禁止访问泄露敏感信息页面。

　　（3）在服务器端对相关敏感信息进行模糊化处理。

　　（4）对服务器端返回的数据进行严格的检查，满足查询数据与页面显示数据一致。

## **20.短信/邮件轰炸**

### **漏洞描述**

　　由于没有对短信或者邮件发送次数进行限制，导致可无限次发送短信或邮件给用户，从而造成短信轰炸，进而可能被大量用户投诉，从而影响公司声誉。

### **修复建议**

　　在服务器限制发送短信或邮件的频率，如同一账号1分钟只能发送1次短信或邮件，一天只能发送3次。

## **21.phpinfo信息泄漏**

### **漏洞描述**

​        Web站点的某些测试页面可能会使用到PHP的phpinfo()函数，会输出服务器的关键信息，造成服务器信息泄露，为攻击提供有利的信息。

###  **修复建议**

　（1）删除phpinfo 函数。

　（2）若文件无用可直接删除。 

## **22.Apache Tomcat默认文件**

###  **漏洞描述**

​       Apache Tomcat默认样例文件没有删除或限制访问，可能存在cookie、session伪造，进行后台登录操作

###  **修复建议**

　（1）删除样例文件

　（2）限制文件访问权限

## **23.Crossdomain.xml 配置不当**

### **漏洞描述**

　　网站根目录下的 crossdomain.xml 文件指明了远程Flash 是否可以加载当前网站的资源（图片、网页内容、Flash等）。如果配置不当，可能导致遭受跨站请求伪造（CSRF）攻击。

### **修复建议**

　　对于不需要从外部加载资源的网站，在 crossdomain.xml 文件中更改allow-access-from的domain属性为域名白名单。

## **24.目标服务器启用了不安全 HTTP 方法**

### **漏洞描述**

　　目标服务器启用了不安全的传输方法，如PUT、TRACE、DELETE、MOVE等，这些方法表示可能在服务器上使用了 WebDAV，由于dav方法允许客户端操纵服务器上的文件，如上传、修改、删除相关文件等危险操作，如果没有合理配置dav，有可能允许未授权的用户对其进行利用，修改服务器上的文件。

### **修复建议**

　　（1）关闭不安全的传输方法，只开启POST、GET方法。

　　（2）如果服务器不使用 WebDAV 可直接禁用，或为允许webdav的目录配置严格的访问权限，如认证方法，认证需要的用户名，密码。

​        