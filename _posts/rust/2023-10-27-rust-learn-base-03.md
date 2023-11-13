---
layout: post
title: Rust 基础入门 - 03（复合类型 - 字符串切片）
categories: [Rust]
description: Rust 基础入门 - 03
keywords: Rust 基础入门 - 03
---

这是 bran 学习 Rust 的笔记 & 心得系列，目前是 Rust 基础入门 - 03（复合类型 - 字符串切片），刚开始学哦～ 加油！！！

> 行百里者半九十

- 复合类型，顾名思义，复合类型是由其他类型组合而成的，最典型的就是结构体 struct 和枚举 enum

## 字符串

> 在其他语言中，字符串往往是比较简单的（js 是的），但在 Rust 中，字符串是一个很多设计的类型

### 切片 Slice

- 切片并不是 Rust 独有的概念，在 Go 语言中也是有的，它可以让我们引用**集合中部分连续的元素序列**，而不是整个序列

```rust
let s = String::from("hello world");

let hello = &s[0..5];
let world = &s[6..11];
```

- 创建切片的方法：使用方括号包括的一个序列：**[开始索引..终止索引]**

  - `&s[0..5]`
  - ..（range 序列语法）

- **切片语法需要格外小心**：切片的索引必须在字符之间的边界位置，也就是 UTF-8 字符的边界，如中文在 UTF-8 中占用三个字节，下面的代码就会崩溃

- ```rust
     let s = "中国人";
     let a = &s[0..2];
     println!("{}",a);
    // 因为我们只取 s 字符串的前两个字节，但是本例中每个汉字占用三个字节，因此没有落在边界处，也就是连 中 字都取不完整，此时程序会直接崩溃退出，如果改成 &s[0..3]，则可以正常通过编译。 因此，当你需要对字符串做切片索引操作时，需要格外小心这一点
  ```

- 当我们已经有了可变借用时，就无法再拥有不可变的借用

#### 其他切片

- 因为切片的定义是：对集合的部分引用，因此，不仅字符串有切片，其他集合类型也有，如数组

### 字符串字面量是切片

- 直接声明赋值一个 `let s = "hello";`s 的类型实际上是 字符串切片。

## 什么是字符串？

- Rust 中的「字符」是 Unicdoe 类型，因此每个字符占据 4 个字节的内存空间
- 字符串是 UTF-8 编码，也就是字符串中的字符所占用的字节数是变化的（1-4）（这样有助于大幅降低字符串所占用的内存空间）
- Rust 在语言级别，只有一种字符串类型：str，通常是以引用类型出现：&str，也就是前面提到的字符串切片
- 虽然语言级别只有 str 类型，但标准库中，还有多种不同用途的字符串类型，其中使用最广的是 `String` 类型
- str 类型是硬编码的可执行文件，也无法被修改
- String 是一个可增长、可改变且具有所有权的 UTF-8 编码字符串
- 当 Rust 用户提到字符串时，往往指的就是 String 类型 和 &str 字符串切片类型，这两个类型都是 UTF-8 编码

## String 与 &str 的转换

- 从 &str 类型生成 String 类型：`String::from("hello bran")`、`"hello bran".to_string()`
- 从 String 类型到 &str 类型：取引用，`let s = String.from("hello"); let s1 = &s[0..3]`
  - 实际上这种灵活用法是因为 `deref` 隐式强制转换，具体后面会学到

## 字符串索引

> 在其它语言中，使用索引的方式访问字符串的某个字符或者子串是很正常的行为 **(s[0])**，但是在 Rust 中就会报错：

### 深入字符串内部

- 字符串的底层的数据存储格式实际上是 [u8]，一个字节数组。
  - 对于 `let hello = String::from("Hola");`这行代码来说，Hola 的长度是 4 个字节，因为 "Hold" 中的每个字母在 UTF-8 编码中仅占用 1 个字节
  - 但对于 `let hello = String::from("中国人")；`这个来说，看起来字符串的长度是 3，但实际上是 9，因为汉字在 UTF-8 中的长度是 3 个字节。

### 字符串的不同表现形式（没太看懂

```rust
现在看一下用梵文写的字符串 “नमस्ते”, 它底层的字节数组如下形式：

[224, 164, 168, 224, 164, 174, 224, 164, 184, 224, 165, 141, 224, 164, 164,
224, 165, 135]
长度是 18 个字节，这也是计算机最终存储该字符串的形式。如果从字符的形式去看，则是：

['न', 'म', 'स', '्', 'त', 'े']
但是这种形式下，第四和六两个字母根本就不存在，没有任何意义，接着再从字母串的形式去看：

["न", "म", "स्", "ते"]
```

- Rust 提供了不同的字符串的展现方式
- 还有一个原因导致了 Rust 不允许去索引字符串：因为索引操作，我们总是期望它的性能表现是 O(1)，然而对于 `String` 类型来说，无法保证这一点，因为 Rust 可能需要从 0 开始去遍历字符串来定位合法的字符

## 字符串切片

- 在通过索引区间来访问字符串时，**需要格外的小心**，一不注意，就会导致你程序的崩溃！

## 操作字符串

由于 String 是可变字符串，Rust 中提供了字符串的修改，添加，删除等常用方法：

### 追加（push）

- push() 方法追加字符到尾部
- push_str() 追加字符串字面量
- **都是在原有的字符串上追加，对原数据进行修改，不会返回新的数据**
  - 因此，该字符串必须是可变的，即字符串变量必须由 mut 关键字修饰

### 插入（insert）

- insert() 插入单个字符
- insert_str() 插入字符串字面量
- 这两个方法需要传入两个参数，first 插入位置的索引，second 要插入的字符（串）
  - 索引从 0 开始，如果越界，则会发生错误
- **都是在原有的字符串上追加，对原数据进行修改，不会返回新的数据**
  - 因此，该字符串必须是可变的，即字符串变量必须由 mut 关键字修饰

### 替换（replace）

> 如果想要把字符串中的某个字符串替换成其它的字符串，那可以使用 `replace()` 方法。与替换有关的方法有三个。

- replace 适用于 String 类型 和 &str 类型
  - 两个参数，first 要被替换的字符串，second 新的字符串
  - 该方法会替换所有匹配到的字符串
  - **该方法是返回一个新的字符串，而不是原本的字符串**
- replacen 适用于 String 类型 和 &str 类型
  - 三个参数，first 要被替换的字符串，second 新的字符串，third 表示替换的个数（也就是可以选择不全部替换）
  - **该方法是返回一个新的字符串，而不是原本的字符串**
- replace_range 该方法仅适用于 `String` 类型
  - 两个参数，first 要替换字符串的**范围**，second 新的字符串
  - **该方法是直接操作原来的字符串，不会返回新的字符串。**
    - **该方法需要使用 `mut` 关键字修饰**。

### 删除（delete）

> 与字符串删除相关的方法有 4 个，他们分别是 `pop()`，`remove()`，`truncate()`，`clear()`。这四个方法仅适用于 `String` 类型

**字符串删除操作，均是对原数据的修改，所以必须是可变引用，即需要 mut 关键字声明**

- pop() 删除并返回最后一个字符
  - 没有参数，注意字符越界问题
- remove() 删除并返回字符串中指定位置的字符
  - 有一个参数，表示删除的字符的起始索引位置，注意字符越界问题
- truncate() 删除字符串中从指定位置开始到结尾的全部字符
  - 没有返回值
  - 注意字符越界问题
- clear() 清空字符串
  - 没有返回值
  - 相当于 truncate(0)

### 连接（concatenate）

- `+` 或者 `+=` 连接字符串

  - 需要右边的参数必须是**字符串的切片引用类型（&str）**

  - 其实相当于调用 `std::string.add()`

    - ```rust
        fn add(self, s: &str) -> String
      ```

  - `+`是返回一个新的字符串，所以变量可以不需要 mut 关键词修饰

  - `+`左边是一个 String 类型，在执行过连接之后，就会涉及到所有权转移

    - `let s3 = s1 + &s2` s1 就被释放了

- 使用 format！连接字符串

  - `format!` 这种方式适用于 `String` 和 `&str` 。`format!` 的用法与 `print!` 的用法类似

    ```rust
    fn main() {
        let s1 = "hello";
        let s2 = String::from("rust");
        let s = format!("{} {}!", s1, s2);
        println!("{}", s);
    }
    // hello rust!
    ```

## 字符串转义

- 我们可以通过转义的方式 `\` 输出 ASCII 和 Unicode 字符

  ```rust
  fn main() {
      // 通过 \ + 字符的十六进制表示，转义输出一个字符
      let byte_escape = "I'm writing \x52\x75\x73\x74!";
      println!("What are you doing\x3F (\\x3F means ?) {}", byte_escape);

      // \u 可以输出一个 unicode 字符
      let unicode_codepoint = "\u{211D}";
      let character_name = "\"DOUBLE-STRUCK CAPITAL R\"";

      println!(
          "Unicode character {} (U+211D) is called {}",
          unicode_codepoint, character_name
      );

      // 换行了也会保持之前的字符串格式
      // 使用\忽略换行符
      let long_string = "String literals
                          can span multiple lines.
                          The linebreak and indentation here ->\
                          <- can be escaped too!";
      println!("{}", long_string);
  }
  // 程序执行后输出结果：
  // What are you doing? (\x3F means ?) I'm writing Rust!
  // Unicode character ℝ (U+211D) is called "DOUBLE-STRUCK CAPITAL R"
  // String literals
  //                        can span multiple lines.
  //                        The linebreak and indentation here -><- can be escaped too!
  ```

- 可以通过 `\` `##`保持字符串的原样

  ```rust
  fn main() {
      println!("{}", "hello \\x52\\x75\\x73\\x74");
      let raw_str = r"Escapes don't work here: \x3F \u{211D}";
      println!("{}", raw_str);

      // 如果字符串包含双引号，可以在开头和结尾加 #
      let quotes = r#"And then I said: "There is no escape!""#;
      println!("{}", quotes);

      // 如果还是有歧义，可以继续增加，没有限制
      let longer_delimiter = r###"A string with "# in it. And even "##!"###;
      println!("{}", longer_delimiter);
  }
  // 程序执行后输出结果：
  // hello \x52\x75\x73\x74
  // Escapes don't work here: \x3F \u{211D}
  // And then I said: "There is no escape!"
  // A string with "# in it. And even "##!
  ```

## 操作 UTF-8 字符串

### 字符

- for in "中国人".chars()
  - 中
  - 国
  - 人

### 字节

- for in "".bytes()
  - 228
  - 184
  - ...

### 获取子串

想要准确的从 UTF-8 字符串中获取子串是较为复杂的事情，例如想要从 `holla中国人नमस्ते` 这种变长的字符串中取出某一个子串，使用标准库你是做不到的。 你需要在 `crates.io` 上搜索 `utf8` 来寻找想要的功能。

可以考虑尝试下这个库：[utf8_slice](https://crates.io/crates/utf8_slice)。

## 字符串深度解析

- 为什么 String 可变，而字符串字面值 str 却不可变？

  - 对于 str，在编译的时候就知道其内容，最终文本可被直接硬编码进可执行文件中，这样使得字符串字面值快速且高效，这种实现主要得益于字符串字面值的不可变性。
  - 但有的文本，是在执行时动态生成的，那这种不能在编译时，将大小未知的的文本都放入内存中。

- 对于 String 类型，为了支持 可变、可增长的文本片段，需要在堆上分配一块在编译时未知大小的内存用来存放内容，这些都是在程序运行时完成的

  1. 首先向操作系统请求内存存放 String 对象
  2. 在使用完成后，将内存释放，归还操作系统

  - 第二点就是 GC 环节

> 重点来了，到了第二部分，就是百家齐放的环节，在有**垃圾回收 GC** 的语言中，GC 来负责标记并清除这些不再使用的内存对象，这个过程都是自动完成，无需开发者关心，非常简单好用；但是在无 GC 的语言中，需要开发者手动去释放这些内存对象，就像创建对象需要通过编写代码来完成一样，未能正确释放对象造成的后果简直不可估量。
>
> 对于 Rust 而言，安全和性能是写到骨子里的核心特性，如果使用 GC，那么会牺牲性能；如果使用手动管理内存，那么会牺牲安全，这该怎么办？为此，Rust 的开发者想出了一个无比惊艳的办法：变量在离开作用域后，就自动释放其占用的内存：
>
> 与其它系统编程语言的 `free` 函数相同，Rust 也提供了一个释放内存的函数： `drop`，但是不同的是，其它语言要手动调用 `free` 来释放每一个变量占用的内存，而 Rust 则在变量离开作用域时，自动调用 `drop` 函数: 上面代码中，Rust 在结尾的 `}` 处自动调用 `drop`。
