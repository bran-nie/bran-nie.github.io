---
layout: post
title: Rust 基础入门 - 05（复合类型 - 结构体）
categories: [Rust]
description: Rust 基础入门 - 05（复合类型 - 结构体）
keywords: Rust 基础入门 - 05（复合类型 - 结构体）
---

这是 bran 学习 Rust 的笔记 & 心得系列，目前是 Rust 基础入门 - 05（复合类型 - 结构体），刚开始学哦～ 加油！！！

## 结构体 struct

看起来像是 TypeScript 中的 interface

定义结构体（括号内是 ts 的描述）

- 通过关键字 struct 定义（interface）
- 一个清晰明确的结构体（接口）名称
- 几个有名字的结构体字段（类型字段）

```rust
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}
```

```typescript
interface User {
    active: Boolean;
    username: String;
    email: String;
    signInCount: number;
}
```

是不是挺像的

### 创建结构体实例

上面只是声明结构体的组成和类型，还需要创建结构体的实例

```rust
let user1 = User {
    email: String::from("someone@example.com"),
    username: String::from("someusername123"),
    active: true,
    sign_in_count: 1,
};
```

- 初始化时，每个字段都需要进行初始化
- 顺序不需要一致，需要有

### 访问结构体字段

通过 `.`操作符进行访问

### 简化结构体创建

下面的函数类似一个构建函数，返回了 `User` 结构体的实例：

```rust
fn build_user(email: String, username: String) -> User {
    User {
        email: email,
        username: username,
        active: true,
        sign_in_count: 1,
    }
}
```

可以简化

```rust
fn build_user(email: String, username: String) -> User {
    User {
        email,
        username,
        active: true,
        sign_in_count: 1,
    }
}
```

如上所示，当函数参数和结构体字段同名时，可以直接使用缩略的方式进行初始化，跟 TypeScript 中一模一样。

### 结构体更新

- 可以使用 `..`操作符解构
- 解构必须在尾部使用
- 和 js 不同的是，解构只会提取没有出现的字段

坏了，解构语法和赋值 `=`非常相似，因此在解构之后，原结构体的部分字段的所有权就会发生转移！然后原结构体就不能使用了，但其内部的其他字段(没有转移的)还可以使用。

![](https://raw.githubusercontent.com/bran-nie/blog_images/images/blog/rust_file_struct.png)

从图中可以清晰地看出 `File` 结构体两个字段 `name` 和 `data` 分别拥有底层两个 `[u8]` 数组的所有权(`String` 类型的底层也是 `[u8]` 数组)，通过 `ptr` 指针指向底层数组的内存地址，这里你可以把 `ptr` 指针理解为 Rust 中的引用类型。

该图片也侧面印证了：**把结构体中具有所有权的字段转移出去后，将无法再访问该字段，但是可以正常访问其它的字段**。

## 元组结构体

- 元组结构体在你希望有一个整体名称，但是又不关心里面字段的名称时将非常有用

## 单元结构体

- 如果你定义一个类型，但是不关心该类型的内容, 只关心它的行为时，就可以使用 `单元结构体`

## 结构体数据的所有权

- 一个选择：想要结构体拥有它所有的数据，而不是从其它地方借用数据（原因是涉及到变量的生命周期）
    - 因此也可以借用其他数据，但需要注意生命周期小于原数据的生命周期

## 使用 `#[derive(Debug)]`来打印结构体的信息

- 之所以 String、char 等可以打印是因为其有实现 Display 特征

    > 因在于结构体较为复杂，例如考虑以下问题：你想要逗号对字段进行分割吗？需要括号吗？加在什么地方？所有的字段都应该显示？类似的还有很多，由于这种复杂性，Rust 不希望猜测我们想要的是什么，而是把选择权交给我们自己来实现：如果要用 `{}` 的方式打印结构体，那就自己实现 `Display` 特征

- `{:?}` 打印

- `{:#?}`打印，可以换行

- 还可以自己实现

- `deg!()` 打印
