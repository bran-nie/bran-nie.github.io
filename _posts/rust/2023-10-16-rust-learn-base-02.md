---
layout: post
title: Rust 基础入门 - 02（所有权和借用）
categories: [Rust]
description: Rust 基础入门 - 02
keywords: Rust 基础入门 - 02
---

这是 bran 学习 Rust 的笔记 & 心得系列，目前是 Rust 基础入门 - 02（所有权和借用），刚开始学哦～ 加油！！！

## 所有权

因为程序要运行，就要和计算机内存打交道，那么如何在内存中申请空间、释放空间，成了语言设计的重中之重。

应用程序和计算机内存的爱恨情仇，目前有三种流派。

1. **垃圾回收机制（Garbage Collection）**，在程序运行时，不断寻找不再使用的内存，进行回收处理。典型代表：Java、Go、JavaScript
2. **手动管理内存的分配和释放**，在程序中，通过函数调用的方式来申请和释放内存。典型代表：C、C++、早期的 OC
3. **通过所有权来管理内存**，编译器在编译时会根据一系列的规则进行检查

Rust 选择了第三种，这种检查只发生在编译期，因此对于程序运行期，不会有任何性能上的损失。（还不太懂这个为什么没有，带着疑惑继续学习）

## 栈(Stack)和堆(Heap)

在 Rust 中，栈和堆是最核心的数据结构，数据是位于栈上，还是堆上，非常重要，因为这会影响程序的行为和性能

> Me：对于 jser 来说，这个概念应该好理解的

### 栈

- 按照顺序存储值并以相反的顺序取出值，（先进后出）（后进先出）。
- 增加数据叫**_进栈_**，移出数据叫**_出栈_**
- 栈中的所有数据都必须占有**已知且固定大小的内存空间**，假设数据大小是未知的，那么取出数据时，将无法取到想要的数据。。

### 堆

- 与栈不同，大小未知或者可能变化的数据，可以存放在堆上
- 堆的内存空间不连续
- 向堆上存放数据时，先申请一定大小的空间，操作系统在堆的某处找到足够大的空间后，将其标记为已使用，并返回一个表示该地址的**指针**。该过程被称为**在堆上分配内存**，有时简称“分配”（allocating）
- 该指针会被推入栈中，后续通过该指针来访问实际的内存位置，进而访问数据

### 性能区别

- 写入方面：入栈比在堆上分配内存更快
- 读取方面：由于堆的内存地址也是在栈中，再加上现代的 CPU 性能及高速缓存，栈的访问速度也是优于堆的

因此，处理器处理分配在栈上数据会比在堆上的数据更加高效。

### 所有权与堆栈

对于其他很多编程语言，你确实无需理解堆栈的原理，但是**在 Rust 中，明白堆栈的原理，对于我们理解所有权的工作原理会有很大的帮助**。

## 所有权原则

> - Rust 中每一个值都被一个变量所拥有，该变量被称为值的所有者
> - 一个值同时只能被一个变量所拥有
> - 当所有者（变量）离开作用域范围内时，这个值将被丢弃（drop）

### 变量作用域

- 类似 js，函数，块级作用域

- Rust 中，字符是基本类型，是和 String 不一样的，js 中倒是没有这种区别。字符`''`，字符串`""`

### 简单介绍 String 类型

- 字符串有**字符串字面量**，也有**动态字符串类型**。这和 js 很不一样，js 很灵活。

- 因为 String 是存储在堆上，是动态的，所以可以修改

  ```rust
  let c = 'c'; // 字符
  let s1 = "hello"; // 字符串，字符串字面量，一经确定不可再变，已经被硬编码到程序代码中了。
  let s2 = String::from("hello"); // 字符串，动态字符串类型
  s2.push_str(", world!"); // 因为是动态的，所以可以再修改
  ```

- 上面代码中的 `String::from`中的：是调用操作符，类似 js 中的 `String.from` 的 .（PS：我觉得 . 多好用啊，hhh）

## 变量绑定背后的数据交互

### 转移所有权

```rus
let x = 5;
let y = x;
```

声明 x，赋值 5，声明 y，将 x 赋值给 y，x,y 都等于 5，因为整数是 Rust 基本数据类型，是固定大小的简单值，因此这两个值都是通过**自动拷贝**的方式来赋值的，都被存在栈中，完全无需在堆上分配内存。

```rust
let s1 = String::from("hello");
let s2 = s1;
```

当变量类型是 String 时，就不是**自动拷贝**了，因为 String 不是基本类型，而且是存储在堆上的数据，

实际上，String 是一个复杂类型，由**存储在栈中的指针、字符串长度、字符串容量**共同组成，其中堆指针式最重要的（因为它指向数据在内存中真正存放的地址，可以理解为门牌号 hhh）至于长度、容量，也就是附加信息，容量是分配大小，长度是已使用大小，（多大的房子和已经住了多少人，hhh）

因此，对 String 类型的 copy，分两种情况：

1. 所有都拷贝，也就是深拷贝
2. 只拷贝指针、容量、大小这些 id 卡
   1. 但是这样就违背了一个值只能有一个所有者！
   2. 假定只拷贝指针等，那么上面代码中 s1 和 s2 同时都是值的所有者，当 s1、s2 离开作用域时，Rust 都会尝试释放相同的内存，但第二次释放时，不就出现错误了吗，

因此，Rust 中，s1 赋值给 s2 时，s1 不再有效，因此也无需 drop s1，值当所有权就到 s2 了，s1 在赋值之后，就失效了。

![](https://raw.githubusercontent.com/bran-nie/blog_images/images/blog/20231026150530.png)

- 在 js 中，对 Object 的拷贝，有深拷贝（deep copy）和浅拷贝（shallow copy），只拷贝指针、（长度、容量）而不拷贝数据，听起来像是浅拷贝，但又因为 Rust 同时使第一个变量 s1 无效了，因此这个操作，被称为**移动（move）**，而不是浅拷贝。

![s1 moved to s2](https://raw.githubusercontent.com/bran-nie/blog_images/images/blog/rust-move.jpg)

```rust
fn main() {
    let x: &str = "hello, world";
    let y = x;
    println!("{},{}",x,y);
}
```

- 但上面这段代码，就不会报错，文章说：

- > 这段代码和之前的 `String` 有一个本质上的区别：在 `String` 的例子中 `s1` 持有了通过`String::from("hello")` 创建的值的所有权，而这个例子中，`x` 只是引用了存储在二进制中的字符串 `"hello, world"`，并没有持有所有权。
  >
  > 因此 `let y = x` 中，仅仅是对该引用进行了拷贝，此时 `y` 和 `x` 都引用了同一个字符串。

- 我还不是很理解，按照上面提到的所有权原则，每个值都有一个所有者，一个值只能同时有一个所有者，那么，这句话**此时 `y` 和 `x` 都引用了同一个字符串**又是什么情况呢，继续看。

  - 笔记 - `&T` 表示是 不可变引用，T 为类型
  - 笔记- `&mut` 表示是 可变引用

### 克隆（深拷贝）

- 如果代码性能无关紧要，例如初始化程序时，或者在某段时间只会执行一次时，你可以使用 `clone` 来简化编程。但是对于执行较为频繁的代码(热点路径)，使用 `clone` 会极大的降低程序性能，需要小心使用

### 拷贝（浅拷贝）

- 浅拷贝只发生在栈上，因此性能很高，在日常编程中，浅拷贝无处不在
- Rust 有一个叫做 Copy 的特征
  - 如果一个类型拥有 Copy 特征，一个旧的变量在被赋值给其他变量后，仍然可用
  - 任何基本类型的组合可以 copy，不需要分配内存或者某种形式资源的类型可以 copy。（具体可以查看给定类型的文档来确认
    - 所有整数类型
    - 布尔类型
    - 浮点数类型
    - 字符类型 char
    - 元组，且其包含的也是可以 copy 的类型时
    - 不可变引用 &T

## 函数传值与返回

- 将值传递给函数，一样会发生`移动`或者`复制`

- ```rust
    fn main() {
        let s = String::from("hello");  // s 进入作用域

        takes_ownership(s);             // s 的值移动到函数里 ...
                                        // ... 所以到这里不再有效

        let x = 5;                      // x 进入作用域

        makes_copy(x);                  // x 应该移动函数里，
                                        // 但 i32 是 Copy 的，所以在后面可继续使用 x

    } // 这里, x 先移出了作用域，然后是 s。但因为 s 的值已被移走，
      // 所以不会有特殊操作

    fn takes_ownership(some_string: String) { // some_string 进入作用域
        println!("{}", some_string);
    } // 这里，some_string 移出作用域并调用 `drop` 方法。占用的内存被释放

    fn makes_copy(some_integer: i32) { // some_integer 进入作用域
        println!("{}", some_integer);
    } // 这里，some_integer 移出作用域。不会有特殊操作
  ```

- 相比 js 的灵活，在 rust 中，就不能任意了

- Rust 麻烦：**总是把一个值传来传去来使用它**。 传入一个函数，很可能还要从该函数传出去，结果就是语言表达变得非常啰嗦，幸运的是，Rust 提供了新功能解决这个问题。

## 引用与借用

- 买房和租房？（不是特别合适

  ```rust
  fn main() {
      let x = 5; // 值 5 的所有者是 变量 x
      let y = &x; // 所有者 x 将值 5 出租给 y，&x 表示签了出租合同😂

      assert_eq!(5, x); // 5 是 x 的，没问题
      assert_eq!(5, *y); // 5 里面住的是 y，是租用，所以是 *y，* 表明解引用，找到 y 的房东
      // 但要是 assert_eq!(5, y)，就不对了，只是出租，不是卖给 y。
  }
  ```

- 对比，不允许比较不同的类型，必须使用解引用运算符，解出引用所指向的值

## 不可变引用 &T

- 将变量的引用作为参数传递

- ```rust
    fn main() {
        let s1 = String::from("hello");

        // 传递给函数的是 s1 的引用
        let len = calculate_length(&s1);

        println!("The length of '{}' is {}.", s1, len);
    }

    fn calculate_length(s: &String) -> usize {
        s.len()
    }
  ```

- 无需像前面的代码一样：先通过函数参数传入变量（所有权），然后再通过函数返回来传出所有权，代码更加简洁

- 函数`calculate_length`的参数类型从 String 变为 &String

- & 符号即是引用，它允许我们使用变量的值，但是不获取所有权。

## 可变引用 &mut T

```rust
fn main() {
    let mut s = String::from("hello");

    change(&mut s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

- 修改传值和参数类型就可以在函数中也能修改变量了

### 可变引用同时只能存在一个

- 这样限制的好处就是使 Rust 在编译期就避免数据竞争，数据竞争可由以下行为造成：
  - 两个或更多的指针同时访问同一数据
  - 至少有一个指针被用来写入数据
  - 没有同步数据访问的机制
- 数据竞争大白话，俺的理解就是，同一份数据多个变量访问，有的写入有的读取，导致数据出现问题啦

- 通过大括号来手动限制变量的作用域

### 可变引用和不可变引用不能同时存在

Rust 的编译器一直在优化，早期的时候，引用的作用域跟变量作用域是一致的，这对日常使用带来了很大的困扰，你必须非常小心的去安排可变、不可变变量的借用，免得无法通过编译，例如以下代码：

```rust
fn main() {
   let mut s = String::from("hello");

    let r1 = &s;
    let r2 = &s;
    println!("{} and {}", r1, r2);
    // 新编译器中，r1,r2作用域在这里结束

    let r3 = &mut s;
    println!("{}", r3);
} // 老编译器中，r1、r2、r3作用域在这里结束
  // 新编译器中，r3作用域在这里结束
```

- 新的编译器（Rust 1.31 开始）**引用作用域的结束位置从花括号变成最后一次使用的位置**
- NLL（Non-Lexical Lifetimes）专门用于找到某个引用在作用域(})结束前就不再被使用的位置

## 垂悬引用(Dangling References)

- 是返回了一个借用的值，但这个值已经被 drop 了

  ```rust
  fn dangle() -> &String { // dangle 返回一个字符串的引用

      let s = String::from("hello"); // s 是一个新字符串

      &s // 返回字符串 s 的引用
  } // 这里 s 离开作用域并被丢弃。其内存被释放。
    // 危险！

  ```

- 解决方案：直接返回 String 就可以了，这样就是所有权转移给外面的调用者了。

- ```rust
    fn no_dangle() -> String {
        let s = String::from("hello");

        s
    }

  ```
