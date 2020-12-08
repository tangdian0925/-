router.get('/test1', async (ctx, next) => {

  *// ctx.body = 'Hello World'*

  let { user,id } = ctx.request.query



  *// ctx.state = {*

  *//   title: 'Koa2'*

  *// }*

  let obj = {

​    user,

​    id,

  }

  ctx.response.body = obj;

  *// await ctx.render('index', ctx.state)*

})



router.post('/post',(ctx,next)=>{



  const{ name, id } = ctx.request.body;



  console.log(name);



  console.log(id);



  ctx.request.body = {

​    type:'post'

  };

})


# 软通动力
```js
1.页面布局flex
2.less和sass
3.js上下文

js 引擎在代码执行前有一个解析的过程，创建了执行上下文，初始化了一些代码执行时需要用到的对象。

4.闭包

概念：闭包就是能够读取其函数内部变量的函数。在JavaScript中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成“定义在一个函数内部的函数”。

本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。
5.继承
JavaScript 继承机制的设计思想就是，原型对象的所有属性和方法，都能被实例对象共享。

6.深浅拷贝（使用json会有缺陷，如果是null或者un会有问题）
7.pwa？
8.vue生命周期
9.有没有了解过在生命周期里自己再写一个生命周期
10.虚拟dom
11.diff算法（如何算的）
12.父子组件传值
13.Echarts用到什么程度？如果？？？太长，渲染出来不显示怎么办
14.webpack用过？只是用过还是自己理解？
15.如果不是框架项目，比如html用webpack打包？用庞克？写页面，css用less然后想打包怎么解决？ 

```

# 中软
```js
1.游览器兼容性
2.pc端多还是移动端
3.伪类&伪元素
  css引入伪类和伪元素概念是为了格式化文档树以外的信息。也就是说，伪类和伪元素是用来修饰不在文档树中的部分，比如，一句话中的第一个字母，或者是列表中的第一个元素。
   
   伪类用于当已有的元素处于某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的元素时，我们可以通过:hover来描述这个元素的状态。
   
   伪元素用于创建一些不在文档树中的元素，并为其添加样式。它们允许我们为元素的某些部分设置样式。比如说，我们可以通过::before来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。
   
   有时你会发现伪元素使用了两个冒号（::）而不是一个冒号（:）。这是CSS3的一部分，并尝试区分伪类和伪元素。大多数浏览器都支持这两个值。按照规则应该使用（::）而不是（:），从而区分伪类和伪元素。但是，由于在旧版本的W3C规范并未对此进行特别区分，因此目前绝大多数的浏览器都支持使用这两种方式表示伪元素。
4.实现一个三角形

  https://www.jianshu.com/p/9a463d50e441
  将一个div的高和宽设为0，然后给border宽度，最后将不需要的几条边设置隐藏（transparent）
    width: 0;
    height: 0;
    border: 40px solid;
    border-color: orange blue red green;


5.css3新特性
  border-radius圆角 box-shadow阴影 text-shadow文字阴影  
  2. 对文字加特效（text-shadow），线性渐变（gradient），旋转（transform）
  3.transform:rotate(9deg) //旋转
    scale(0.85,0.90)          //缩放
    translate(0px,-30px)   //定位
    skew(-9deg,0deg)      // 倾斜
6.js深浅拷贝（如果说到lodash 怎么实现）

浅拷贝 JSON.stringify()  
将一个对象的属性值复制到另一个对象，如果有的属性的值为引用类型的话，那么会将这个引用的地址复制给对象，因此两个对象会有同一个引用类型的引用。浅拷贝可以使用  Object.assign 和展开运算符来实现。 

深拷贝JSON.parse()

深拷贝相对浅拷贝而言，如果遇到属性值为引用类型的时候，它新建一个引用类型并将对应的值复制给它，因此对象获得的一个新的引用类型而不是一个原有类型的引用。深拷贝对于一些对象可以使用 JSON 的两个函数来实现，但是由于 JSON 的对象格式比 js 的对象格式更加严格，所以如果属性值里边出现函数或者 Symbol 类型的值时，会转换失败。


7.判断变量数据类型（typeof null 返回的是undefind）
 typeof 和 Object.prototype.toString.call（）
8.原型



- 每个对象都有一个`__proto__`属性，并且指向它的`prototype`原型对象
- 每个构造函数都有一个`prototype`原型对象
- `prototype`原型对象里的`constructor`指向构造函数本身


9.创建一个没有原型的对象

Object.create(null)

10.axios是什么？做项目的时候会再次封装吗
axios是一个基于promise的Http库。可以发送get，post请求，正由于Vue，React的出现，促使了axios轻量级库的出现

特性：

　　可以在浏览器中发送XMLHttpRequest请求

　　可以在node.js发送http请求

　　支持Promise API

　　拦截请求和响应

　　转换请求数据和响应数据

　　能够取消请求

　　自动转化JSON格式

　　客户端支持保护安全免受XSRF攻击

11.axios封装get，post的目的是什么

api统一管理,不管接口有多少,所有的接口都可以非常清晰,容易维护.

通常我们的项目会越做越大,页面也会越来越多,如果页面非常的少,直接用axios也没有什么大的影响,那页面组件多了起来,上百个接口呢,这个时候后端改了接口,多加了一个参数什么的呢?那就只有找到那个页面,进去修改.整个过程很繁琐不易于项目的维护和迭代.

这个时候如果我们统一的区管理接口,需要修改某一个接口的时候直接在api里修改对应的请求是不是很方便呢?因为我们用的最多的还是get post请求.我们就可以针对封装.

12.ajax的请求可以同步吗？ 对同步和异步的理解？
Ajax的原理简单来说通过XmlHttpRequest对象来向服务器发异步请求，从服务器获得数据，然后用javascript来操作DOM而更新页面。这其中最关键的一步就是从服务器获得请求数据
13.promise几种状态？
等待 成功 失败

promise 是异步函数的解决方案，从语法上讲 promise 是一个对象，可以获取异步操作的消息

promise 有三个状态，pending 等待状态、fulfilled 成功状态、rejected 失败状态，状态一旦更改，就不会在变

创造出 promise 实例后，他会立刻执行，promise 有两个API  resolve 和 reject
resolve 代表的是回调成功后的函数，reject 代表的是失败后返回的结果
原型上有两个放法：.then 和 .catch 方法，例如请求接口 .then 拿到的是数据，通过 .catch 捕获错误异常


14.try，catch可以捕捉异常吗？

可以 

15.箭头函数中的this指向谁，es5中呢？普通的function的this指向谁？
继承父级作用域的this指向，否则指向全局 普通函数谁调用指向谁

16.ajax请求的时候了解过哪些传输的数据？ 除了json

17.git拉取一个分支的命令？

git branch

18.es6中的map和set？

map
把原先的数值拿出来操作返回

set
它类似于数组，但是成员的值都是唯一的，没有重复的值。



19.set如何转成数组？

1.Array.from  2.遍历set 然后添加到一个新的空数组 