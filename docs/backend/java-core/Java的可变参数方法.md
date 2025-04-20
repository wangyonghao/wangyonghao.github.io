Java的可变参数方法

    可变参数方法是JDK1.5的新特性,也称为不定参数方法,英文缩写是VarArgs,还原一下就是variable argument type.可变参数方法,可用于普通方法,也可用于构造方法,它的接收参数可以是任意多个.
    代码示例:
	//可变参数方法
	public void hello(String ...params){
	    for(String str : params){
		System.out.println(str);
	    }
	}
     

   使用可变参数方法时要注意:

   	1. public class TestVarArgs {
		public static void dealArray(int... intArray){
			for (int i : intArray)
				System.out.print(i +" ");
			
			System.out.println();
		}
		
		public static void main(String args[]){
			dealArray(); //dealArray(int[] intArray{});
			dealArray(1); //dealArray(int[] intArray{1});
			dealArray(1, 2, 3); //dealArray(int[] intArray{1, 2, 3});
		}
	   } 
	   输出: 1
	         1 2 3

	   注: 通过上面的代码可以看出,可变参数方法即没有参数,也可以有任意多个参数.

	2. public class TestVarArgs{
		  //带可变参数的方法
		  public void hello(String ...params) {
		  	  System.out.println("执行带可变参数的方法，参数个数为：" + params.length);
		  }
		  //带数组参数的方法
		  public void hello(String[] params) {
			  System.out.println("执行带数组参数的方法，数组长度为：" + params.length);
		  }
	   }

	   编译时报错: Duplicate method hello(String...) in type TestVarArgs(TestVarArgs类中定义了重复的hello(String...)方法)

	   注: JDK不允许带可变参数的方法和带数组参数方法在同一类中重载.读取可变参数时,是以数组的方式来读取的.并且可以只传入一个参数,而数组参数必须传一个数组

	3. public class TestVarArgs {
		public static void dealArray(int... intArray){
			for (int i : intArray)
				System.out.print(i +" ");
			
			System.out.println();
		}
		
		public static void main(String args[]){
			int[] intArray = {1, 2, 3};
			
			dealArray(intArray);  //通过编译，正常运行
		}
	   }

	   public class TestVarArgs {
		public static void dealArray(int[] intArray){
			for (int i : intArray)
				System.out.print(i +" ");
			
			System.out.println();
		}
		
		public static void main(String args[]){
			dealArray(1, 2, 3);  //编译错误
		}
	   }
	   错误信息: The method dealArray(int[]) in the type TestVarArgs is not applicable for the arguments (int, int, int)(TestVarArgs类的dealArray(int[])方法不能适用于arguments(int,int,int);)
	   
	   注: 可以看出可变参数是可以兼容数组参数的,但是数组参数是无法兼容可变参数的.

	4. public class TestVarArgs {
		public static void dealArray(int... intArray, int count){//编译报错}
	   }
	   public class TestVarArgs {
		public static void dealArray(int... intArray, String... names){//编译报错}
	   }

	   错误信息:The variable argument type int of the method dealArray must be the last parameter
	   (可变参数类型应该作为参数列表的最后一项)
	   注: 	两段代码是同一个错误信息,这也说明了同一方法是不能有两个可变参数的.

	5. public class TestVarArgs {
		public static void dealArray(int... intArray){
			System.out.println("1");
		}
		
		public static void dealArray(int count, int count2){
			System.out.println("2");
		}
		
		public static void main(String args[]){
			dealArray(1, 2);
		}
	   }
	   输出: 2
	   
	   注: 运行时,JDK会优先匹配定长参数的方法,然后才会匹配可变参数的方法.

	6. public static void dealArray(int... intArray){
			System.out.println("1");
		}

		public static void dealArray(int count, int... intArray){
			System.out.println("3");
		}
		public static void dealArray(int count, int count2){
			System.out.println("2");
		}
		
		public static void main(String args[]){
			dealArray(1, 2,3);//编译出错
		}
	    }
	    错误信息: The method dealArray(int[]) is ambiguous for the type TestVarArgs(TestVarArgs的dealArray(int[])方法是模棱两可的)

	    注: 如果main方法中调用的不是dealArray(1,2,3),而是dealArray(1,2)哪? 这时代码编译不会出错,并输出2! 所以在编写代码时这一点要特别注意



2011年1月16日 星期日