Java使得复杂应用的开发变得相对简单。毫无疑问，它的这种易用性对Java的大范围流行功不可没。然而，这种易用性实际上是一把双刃剑。一个设计良好的Java程序，性能表现往往不如一个同样设计良好的C++程序。在Java程序中，性能问题的大部分原因并不在于Java语言，而是在于程序本身。养成好的代码编写习惯非常重要，比如正确地、巧妙地运用java.lang.String类和java.util.Vector类，它能够显著地提高程序的性能。下面我们就来具体地分析一下这方面的问题。
在java中，使用最频繁、同时也是滥用最多的一个类或许就是java.lang.String，它也是导致代码性能低下最主要的原因之一。请考虑下面这个例子：
 
String s1 = "Testing String";
String s2 = "Concatenation Performance";
String s3 = s1 + " " + s2;
 

几乎所有的Java程序员都知道上面的代码效率不高。那么，我们应该怎么办呢？也许可以试试下面这种代码：
 
StringBuffer s = new StringBuffer();
s.append("Testing String");
s.append(" ");
s.append("Concatenation Performance");
String s3 = s.toString();
 

这些代码会比第一个代码片段效率更高吗？答案是否定的。这里的代码实际上正是编译器编译第一个代码片段之后的结果。既然与使用多个独立的String对象相比，StringBuffer并没有使代码有任何效率上的提高，那为什么有那么多的Java书籍批评第一种方法、推荐使用第二种方法？
第二个代码片段用到了StringBuffer类（编译器在第一个片段中也将使用StringBuffer类），我们来分析一下StringBuffer类的默认构造函数，下面是它的代码：
 
public StringBuffer() { this(16); }
 

默认构造函数预设了16个字符的缓存容量。现在我们再来看看StringBuffer类的append()方法：
 
public synchronized StringBuffer append(String str) {
 if (str == null) { 
    str = String.valueOf(str);
  }
 int len = str.length();
 int newcount = count + len;
 if (newcount > value.length) expandCapacity(newcount);
 str.getChars(0, len, value, count);
 count = newcount; return this;
}
 

append()方法首先计算字符串追加完成后的总长度，如果这个总长度大于StringBuffer的存储能力，append()方法调用私有的expandCapacity()方法。expandCapacity()方法在每次被调用时使StringBuffer存储能力加倍，并把现有的字符数组内容复制到新的存储空间。
在第二个代码片段中（以及在第一个代码片段的编译结果中），由于字符串追加操作的最后结果是“Testing String Concatenation Performance”，它有40个字符，StringBuffer的存储能力必须扩展两次，从而导致了两次代价昂贵的复制操作。因此，我们至少有一点可以做得比编译器更好，这就是分配一个初始存储容量大于或者等于40个字符的StringBuffer，如下所示：
 
StringBuffer s = new StringBuffer(45);
s.append("Testing String");
s.append(" ");
s.append("Concatenation Performance");
String s3 = s.toString();
 

再考虑下面这个例子：
String s = "";
int sum = 0;
for(int I=1; I<10; I++) {
  sum += I;
  s = s + "+" +I ;
 }
s = s + "=" + sum; 

分析一下为何前面的代码比下面的代码效率低：
 
StringBuffer sb = new StringBuffer();
int sum = 0;
 for(int I=1;
 I<10; I++){
  sum + = I;
  sb.append(I).append("+");
 }
String s = sb.append("=").append(sum).toString();
 

原因就在于每个s = s + "+" + I操作都要创建并拆除一个StringBuffer对象以及一个String对象。这完全是一种浪费，而在第二个例子中我们避免了这种情况。
我们再来看看另外一个常用的Java类 `java.util.Vector`。简单地说，一个Vector就是一个`java.lang.Object`实例的数组。Vector与数组相似，它的元素可以通过整数形式的索引访问。但是，Vector类型的对象在创建之后，对象的大小能够根据元素的增加或者删除而扩展、缩小。请考虑下面这个向Vector加入元素的例子：

```
Object obj = new Object();
 Vector v = new Vector(100000);
 for(int I=0;
 I<100000; I++) { v.add(0,obj); } 
```
 

除非有绝对充足的理由要求每次都把新元素插入到Vector的前面，否则上面的代码对性能不利。在默认构造函数中，Vector的初始存储能力是10个元素，如果新元素加入时存储能力不足，则以后存储能力每次加倍。Vector类就象StringBuffer类一样，每次扩展存储能力时，所有现有的元素都要复制到新的存储空间之中。下面的代码片段要比前面的例子快几个数量级：
```
Object obj = new Object();
Vector v = new Vector(100000);
for(int I=0; I<100000; I++) { v.add(obj); }
```

同样的规则也适用于Vector类的remove()方法。由于Vector中各个元素之间不能含有“空隙”，删除除最后一个元素之外的任意其他元素都导致被删除元素之后的元素向前移动。也就是说，从Vector删除最后一个元素要比删除第一个元素“开销”低好几倍。
假设要从前面的Vector删除所有元素，我们可以使用这种代码：

`for(int I=0; I<100000; I++){ v.remove(0); }`
 
但是，与下面的代码相比，前面的代码要慢几个数量级：
 
for(int I=0; I<100000; I++){ v.remove(v.size()-1); }
 

从Vector类型的对象v删除所有元素的最好方法是：
 
v.removeAllElements();
 

假设Vector类型的对象v包含字符串“Hello”。考虑下面的代码，它要从这个Vector中删除“Hello”字符串：
 
String s = "Hello"; int i = v.indexOf(s); if(I != -1) v.remove(s);
 

这些代码看起来没什么错误，但它同样对性能不利。在这段代码中，indexOf()方法对v进行顺序搜索寻找字符串“Hello”，remove(s)方法也要进行同样的顺序搜索。改进之后的版本是：
 
String s = "Hello"; int i = v.indexOf(s); if(I != -1) v.remove(i);
 

这个版本中我们直接在remove()方法中给出待删除元素的精确索引位置，从而避免了第二次搜索。一个更好的版本是：
 
String s = "Hello"; v.remove(s);
 

最后，我们再来看一个有关Vector类的代码片段：
 
for(int I=0; I
 

如果v包含100,000个元素，这个代码片段将调用v.size()方法100,000次。虽然size方法是一个简单的方法，但它仍旧需要一次方法调用的开销，至少JVM需要为它配置以及清除堆栈环境。在这里，for循环内部的代码不会以任何方式修改Vector类型对象v的大小，因此上面的代码最好改写成下面这种形式：
 
int size = v.size(); for(int I=0; I
 

虽然这是一个简单的改动，但它仍旧赢得了性能。毕竟，每一个CPU周期都是宝贵的。
拙劣的代码编写方式导致代码性能下降。但是，正如本文例子所显示的，我们只要采取一些简单的措施就能够显著地改善代码性能