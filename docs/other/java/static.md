# java 中 static 加载顺序

## static 加载顺序

注意：static 代码块 和 static 成员变量加载时根据代码的先后顺序加载

**一个 java 程序的加载顺序**

- 一、想看主类有无继承父类
  若有 1.先加载主类父类的 static 2.再加载主类的 static， 3.加载主类中的 static main
  若无
  加载 main
  当加载到 main 中初始化类时 1.加载所初始化类的父类时 按以下顺序加载

**所初始化类的父类静态——>初始化的子类静态**

**——>初始化类的父类代码块——>初始化类的父类构造方法**

**——>初始化的子类代码块——>初始化的子类构造方法**

- 代码如下：

```java
package question;

class superQtwo{
	{
		System.out.println("super's {}");
	}
	static {
		System.out.println("super's static");
	}
	static Foo FOO = new Foo("super's static parameter");//根据先后顺序
	public superQtwo() {
		System.out.println("super's constructor");
	}
}
class Foo{
	public Foo(String word) {
		System.out.println(word);
	}
} //用于测试static成员变量 与 static代码块 的加载顺序

class superNew{
	{
		System.out.println("superNew's {}");
	}
	public superNew() {
		System.out.println("superNew's constructor");
	}
	static {
		System.out.println("superNew's static");
	}
}

class New extends superNew{
	public New(){
		System.out.println("New's constructor");
	}
	{
		System.out.println("New's {}");
	}
	static {
		System.out.println("New's static");
	}
	static Foo FOO = new Foo("New's static parameter");//根据先后顺序
}

public class Qtwo extends superQtwo {
	{
		System.out.println("主类中的{}");
	}
	public Qtwo(){
		System.out.println("主类中的 constructor");
	}
	public static void main(String[] args) {
		System.out.println("加载main---------");
		new Qtwo();
		new New();
		System.out.println("加载完毕---------");
	}
	static Foo FOO = new Foo("主类中的static parameter(按static的选后顺序)");
	static {
		System.out.println("主类中的static");
	}

}
```

- 代码运行结果

```
super's static
super's static parameter
主类中的static parameter(按static的选后顺序)
主类中的static
加载main---------
super's {}
super's constructor
主类中的{}
主类中的 constructor
superNew's static
New's static
New's static parameter
superNew's {}
superNew's constructor
New's {}
New's constructor
加载完毕---------
```

数组定义引用类时，不会触发类初始化
