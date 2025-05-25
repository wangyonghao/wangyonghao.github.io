版面管理器(Layout Manager)
         |BorderLayout
         |FlowLayout
         |GridLayout
  AWT----|CardLayout
         |GridBagLayout


1:BorderLayout的使用:
   BorderLayout的类层次结构图：
       java.lang.Object
        --java.awt.BorderLayout
   构造函数：BorderLayout()建立一个没有间距的border layout
             BorderLayout(int hgap,int vgap)建立一个组件间有间距的border layout
  BorderLayout将版面划分为东、西、南、北、中

2:FlowLayout的使用：
   FlowLayout的类层次结构图：
       java.lang.Object
        --java.awt.FlowLayout
   构造函数：FlowLayout()建立一个新的Flow Layout，此FlowLayout默认值是居中对齐，组件彼此有5单位的水平与垂直间距。
             FlowLayout(int align)建立一个新的Flow Layout，此FlowLayout可设置排列方式，组件彼此有5单位的水平与垂直
                                 间距。
             FlowLayout(int align,int hgap,int vgap)建立一个新的Flow Layout，此FlowLayout可设置排列方式与组件间距。

3:GridLayout的使用：
       GridLayout的类层次结构图：
       java.lang.Object
        --java.awt.GridLayout
    GridLayout比FlowLayout多了行和列的设置，也就是说你要先设置GridLayout共有几行几列，就如同二维平面一般，然后你加
进去的组件会先填第一行的格子，然后再从第二行开始填，依此类扒，就像是一个个的格子一般。而且GridLayout会将所填进去组
件的大小设为一样。
构造函数：GridLayout()建立一个新的GridLayout，默认值是1行1列。
          GridLayout(int rows,int cols)建立一个几行几列的GridLayout.
          GridLayout(int rows,int cols, int hgap,int vgap)建立一个几行几列的GridLayout,并设置组件的间距。

4:GridBagLayout的使用：是java中最有弹性但也是最复杂的一种版面管理器。它只有一种构造函数，但必须配合
                           GridBagConstraints才能达到设置的效果。
    GridBagLayout的类层次结构图：
    java.lang.Object
     --java.awt.GridBagLayout
构造函数：
    GirdBagLayout()建立一个新的GridBagLayout管理器。
    GridBagConstraints()建立一个新的GridBagConstraints对象。
    GridBagConstraints(int gridx,int gridy,int gridwidth,int gridheight,double weightx,double weighty,
                       int anchor,int fill, Insets insets,int ipadx,int ipady)建立一个新的GridBagConstraints对象
                      ，并指定其参数的值。
 参数说明:
 gridx,gridy:设置组件的位置，gridx设置为GridBagConstraints.RELATIVE代表此组件位于之前所加入组件的右边。
             若将gridy设置为GridBagConstraints.RELATIVE代表此组件位于以前所加入组件的下面。建议定义出
             gridx,gridy的位置，以便以后维护程序。表示放在几行几列，gridx=0,gridy=0时放在0行0列。

 gridwidth,gridheight:用来设置组件所占的单位长度与高度，默认值皆为1。你可以使用GridBagConstraints.REMAINDER常
                      量，代表此组件为此行或此列的最后一个组件，而且会占据所有剩余的空间。

 weightx,weighty:用来设置窗口变大时，各组件跟着变大的比例，当数字越大，表示组件能得到更多的空间，默认值皆为0。
 anchor:         当组件空间大于组件本身时，要将组件置于何处，有CENTER(默认值)、NORTH、NORTHEAST、EAST、SOUTHEAST、
                 WEST、NORTHWEST可供选择。
 insets:设置组件之间彼此的间距，它有四个参数，分别是上，左，下，右，默认为(0,0,0,0).
 ipadx,ipady:设置组件内的间距，默认值为0。              


5:BoxLayout的使用：
    BoxLayout的类层次结构图：
    java.lang.Object
     --java.awt.BoxLayout

   BoxLayout提供了两个常数X_AXIS,Y_AXIS来表示水平或垂直排列。若放进去的组件不等高，则系统将会使所有的组件与最高组件
等高，还有，若你将组件都摆在同一行时，系统不因组件宽度在于Container的宽度，而使组件自动摆在下一行，你必须自行处理换
行的操作。
构造函数：
     BoxLayout(Container targe,int axis)建立一个水平或垂直的BoxLayout.
   讲到BoxLayout，我们就不得不提到Box这个Container,Box这个Container默认的Layout为BoxLayout,而它只能使用这个Layout,
否则编译时会有Error产生，如同前面所讲的，BoxLayout是以水平或垂直方式排列，因此，当我们要产生一个Box Container时，
就必须指定它的排列方式，下面为Box的构造函数：
  Box(int axis) 建立一个Box Container,并指定组件的排列方式是水平或垂直。
  上面的axis参数，我们可以使用BoxLayout.X_AXIS或BoxLayout.Y_AXIS来指定。或是利用Box类所提供的两个方法：
createHorizontalBox()与createVerticalBox(),来建立BoxContainer.
  Box类提供4种透明的组件来做更方便的版面管理。分别是glue、strut、rigid、filler: