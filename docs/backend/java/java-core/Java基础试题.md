  
2009-06-05 09:14一．选择题（每道题3分，共45分） 
      （1）下列关于Java语言的特点，描述错误的是（      ） 
      A．Java是跨平台的编程语言                   B．Java支持分布式计算 
      C．Java是面向过程的编程语言                 D．Java支持多线程 
      （2）下述概念中不属于面向对象方法的是________。 
      A．对象、消息    B．继承、多态      C．类、封装     D．过程调用 
      （3）结构化程序设计所规定的三种基本控制结构是 （        ） 
      A．输入、处理、输出　　                     B．树形、网形、环形 
      C．顺序、选择、循环　　                     D．主程序、子程序、函数 
      （4）下列关于构造方法的叙述中，错误的是（        ） 
      A．Java语言规定构造方法名与类名必须相同 
      B．Java语言规定构造方法没有返回值，但不用void声明 
      C．Java语言规定构造方法不可以重载 
      D．Java语言规定构造方法只能通过new自动调用 
      （5）下列哪个类的声明是正确的？ 
      A．abstract final class HI{}                      B．abstract private 
      move(){}    
      C．protected private number;                     D．public abstract class 
      Car{} 
      （6）关于被私有访问控制符private修饰的成员变量，以下说法正确的是（           ） 
      A．可以被三种类所引用：该类自身、与它在同一个包中的其他类、在其他包中的该类的子类 
      B．可以被两种类访问和引用：该类本身、该类的所有子类 
      C．只能被该类自身所访问和修改 
      D．只能被同一个包中的类访问 
      （7）以下声明合法的是（           ） 
      A．default String s；                    B．public final static native int w( 
      ) 
      C．abstract double d；                  D．abstract final double 
      hyperbolicCosine( ) 
      
      （9）下列关于for循环和while循环的说法中哪个是正确的？(    )    
      A．while循环能实现的操作，for循环也都能实现　　    
      B．while循环判断条件一般是程序结果，for循环判断条件一般是非程序结果　　    
      C．两种循环任何时候都可替换　　    
      D．两种循环结构中都必须有循环体，循环体不能为空 
      （10）类Test1定义如下： 
      1．public class Test1{ 
      2．                public float aMethod（float a，float b）{   } 
      3．                
      4．}        
      将以下哪种方法插入行3是不合法的。（          ） 
      A、public float aMethod（float a， float b，float c）{ } 
      B、public float aMethod（float c，float d）{ } 
      C、public int aMethod（int a， int b）{ } 
      D、private float aMethod（int a，int b，int c）{ } 
      （11）阅读以下代码： 
      import java.io.*; 
      import java.util.*; 
      public class foo{ 
      public static void main (String[] args){ 
      String s; 
      System.out.println("s=" + s); 
      } 
      } 
      输出结果应该是：（    ） 
      A．代码得到编译，并输出“s=” 
      B．代码得到编译，并输出“s=null” 
      C．由于String s没有初始化，代码不能编译通过 
      D．代码得到编译，但捕获到 NullPointException异常 
      （12）编译运行以下程序后，关于输出结果的说明正确的是 （        ） 
              public class   Conditional{ 
                      public static void main(String args[ ]){ 
                              int x=4; 
                              System.out.println(“value is “+ ((x>4) ? 99.9 
      :9)); 
      } 
      } 
      A．输出结果为：value is 99.99                B．输出结果为：value is 9 
      C．输出结果为：value is 9.0                        D．编译错误 
      （13）执行完以下代码int [ ] x = new int[10]；后，以下哪项说明是正确的（        ） 
      A．x[9]为0                B．x[9]未定义                C．x[10]为0                
      D．x[0]为空 
      （14）关于以下程序段，正确的说法是（          ） 
      1． String s1=“a”+“b”; 
      2．   String s2=new String（s1）； 
      3．    if（s1==s2） 
      4．       System.out.println(“= = is succeeded”); 
      5．     if (s1.equals(s2)) 
      6．        System.out.println(“.equals() is succeeded”); 
      A．行4与行6都将执行                B．行4执行，行6不执行 
      C．行6执行，行4不执行                C．行4、行6都不执行 
      （15）以下程序的运行结果是：（       ） 
      public class Increment{ 
              public static void main(String args[]){ 
      int c; 
      c = 2; 
      System.out.println(c); 
      System.out.println(c++); 
      System.out.println(c); 
      } 
      } 
      A．2           B．2           C．2               D．3 
      2               3              2                   4 
      2               3              3                   4 

      二．写出以下程序的运行结果。（每道题10分，共30分） 
      1、写出以下程序的运行结果。 
      public class ChangeStrDemo { 
      public static void changestr(String str){ 
                          str="welcome"; 
           } 
           public static void main(String[] args) { 
                          String str="1234"; 
                          changestr(str); 
                          System.out.println(str); 
                } 
      }      

      2、写出以下程序的运行结果。 
      class First{ 
                      public First(){ 
                              aMethod();                } 
                      public void aMethod(){ 
                              System.out.println(“in First class”);} 
      } 
      public class Second extends First{ 
                      public void aMethod(){ 
                              System.out.println(“in Second class”);} 
      public static void main(String[ ] args){ 
                              new Second( );                } 
      } 

      3、写出以下程序的运行结果。 
      public class FooDemo{ 
      static boolean foo(char c) { 
      System.out.print(c); 
              return true; 
      } 
      public static void main(String[] args ) { 
              int i =0; 
              for ( foo(’a’); foo(’b’)&&(i<2); foo(’c’)){ 
                      i++ ; 
                      foo(’d’); 
          } 
      } 
      } 
      ----------------------------------------------------------------------
      二. 选择题 （18题，共42分）。
      (一)单选题（共12题，每题2分，共24分）。
      程序设计语言的三种基本控制结构是:（     ）
      A. 输入、处理、输出             B. 顺序、选择、循环   
      C. 树形、网形、环形             D. 主程序、子程序、函数
      在Java中，下列哪句话是正确的:（     ）
      A. 几个类可以写在一个文件里     B. 一个类可以写在几个文件里
      C. 类的名称是不区分大、小写的   D. 方法的名称是不区分大、小写的
      一个必须被继承的类要用哪个关键字来描述:（     ）
      A. static     B. protected       C. final      D. abstract
      下面程序的输出结果是：(     )
      class DemoClass{
      public static void main(String args[]){
      int i=1,s=5;
      do{
      s += i;
      i++;
      }while(i < 5);
      System.out.println(“s=”+s); }}
      A. s=0            B. s=5          C. s=10          D. s=15
      下列方法method的定义正确的是（A）。
      private int method () {char ch=’a’; return (int) ch; }    
      public void method {int a=8; return a；}
      int method (int i ) {return (double) (i+10) ;}    
      method (int a) {return a;}哪一组都是Java关键字：(      ) 
      A. Student, float, main, public     B. byte, boolean, box, float
      C. long, extends, float, double     D. classes, float, short, import
      下面哪种说法是正确的: (       )
      A. String是用来处理字符串的类，而B. StringBuffer不C. 是
      D. StringBuffer是用来处理字符串的类，而E. String不F. 是
      G. String和StringBuffer都是用来处理字符串的类
      H. String和StringBuffer都不I. 是用来处理字符串的类
      int x=1,a=0,b=0; 
      switch(x){ 
      case 0: b++; 
      break;
      case 1: a++;
      break;
      case 2: a++;b++;
      break;
      } 
      System.out.println("a="+a+",b="+b); 
      该程序的输出结果是 （    ）
      A. a=1,b=0        B. a=1,b=1      C. a=1,b=2          D. a=2,b=2
      下面哪个赋值语句是不合法的？
      A、float a = 2.0 B、double b = 2.0
      C、int c = 2       D、long d = 2
      下面四组变量命名，符合JAVA变量命名规则的是（     ）。
      A. a@bc       B. 6x         C. void         D. ye_78
      定义类A及类中的方法getVar()，定义类A的子类B，若要在类B中覆盖类A的同名方法，下面正确的定义是（    ）
      class A
      {
      private float x = 1.0f;
      protected float getVar()
      {return x;}
      }
      class B extends A
      {
      private float x = 2.0f;
      //覆盖类A中的同名方法的代码放在此处}
      float getVar(){return x;}
      protected float getVar(float y){return x_y;}
      protected float getVar(){return x;}
      public float getVar(){return x;}
      根据下面给出的代码，判断哪个叙述是正确的。（    ）
      public class Person {
      static int arr[]=new int[10];
      public static void main ( String a[] ) {
      System.out.println ( arr[12] );
      }
      }
      编译时将发生错误 
      编二. 选择题 （18题，共42分）。
      (一)单选题（共12题，每题2分，共24分）。
      程序设计语言的三种基本控制结构是:（     ）
      A. 输入、处理、输出             B. 顺序、选择、循环   
      C. 树形、网形、环形             D. 主程序、子程序、函数
      在Java中，下列哪句话是正确的:（     ）
      A. 几个类可以写在一个文件里     B. 一个类可以写在几个文件里
      C. 类的名称是不区分大、小写的   D. 方法的名称是不区分大、小写的
      一个必须被继承的类要用哪个关键字来描述:（     ）
      A. static     B. protected       C. final      D. abstract
      下面程序的输出结果是：(     )
      class DemoClass{
      public static void main(String args[]){
      int i=1,s=5;
      do{
      s += i;
      i++;
      }while(i < 5);
      System.out.println(“s=”+s); }}
      A. s=0            B. s=5          C. s=10          D. s=15
      下列方法method的定义正确的是（A）。
      private int method () {char ch=’a’; return (int) ch; }    
      public void method {int a=8; return a；}
      int method (int i ) {return (double) (i+10) ;}    
      method (int a) {return a;}哪一组都是Java关键字：(      ) 
      A. Student, float, main, public     B. byte, boolean, box, float
      C. long, extends, float, double     D. classes, float, short, import
      下面哪种说法是正确的: (       )
      A. String是用来处理字符串的类，而B. StringBuffer不C. 是
      D. StringBuffer是用来处理字符串的类，而E. String不F. 是
      G. String和StringBuffer都是用来处理字符串的类
      H. String和StringBuffer都不I. 是用来处理字符串的类
      int x=1,a=0,b=0; 
      switch(x){ 
      case 0: b++; 
      break;
      case 1: a++;
      break;
      case 2: a++;b++;
      break;
      } 
      System.out.println("a="+a+",b="+b); 
      该程序的输出结果是 （    ）
      A. a=1,b=0        B. a=1,b=1      C. a=1,b=2          D. a=2,b=2
      下面哪个赋值语句是不合法的？
      A、float a = 2.0 B、double b = 2.0
      C、int c = 2       D、long d = 2
      下面四组变量命名，符合JAVA变量命名规则的是（     ）。
      A. a@bc       B. 6x         C. void         D. ye_78
      定义类A及类中的方法getVar()，定义类A的子类B，若要在类B中覆盖类A的同名方法，下面正确的定义是（    ）
      class A
      {
      private float x = 1.0f;
      protected float getVar()
      {return x;}
      }
      class B extends A
      {
      private float x = 2.0f;
      //覆盖类A中的同名方法的代码放在此处}
      float getVar(){return x;}
      protected float getVar(float y){return x_y;}
      protected float getVar(){return x;}
      public float getVar(){return x;}
      根据下面给出的代码，判断哪个叙述是正确的。（    ）
      public class Person {
      static int arr[]=new int[10];
      public static void main ( String a[] ) {
      System.out.println ( arr[12] );
      }
      }
      编译时将发生错误 
      编译时正确但是运行时出错
      输出为0 
      输出为null 译时正确但是运行时出错
      输出为0 
      输出为null 
      三．编程题（45分） 
      1．编写一个Java程序要求：开启一个文本文件，一次读取其内的一行文本。令每一行形成一个String，并将读出的String对象置于LinkedList中。请以相反次序印出LinkedList内的所有文本行。