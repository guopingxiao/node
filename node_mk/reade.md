node.js 采用了commmon.js 的规范

拥有全局变量

__filename:当前文件名所在的完整路径（包括文件名）；
__dirname:当前文件所在目录的完整路径

- 核心模块 http, fs, path

`var fs = require('path')`

- 自定义的模块，通过相对路径引用
`var util = require('./util.js')`

- npm第三方模块
`var util = require('jquery')`

- 说千遍到万变，不如动手做一遍：

讲解模块的定义 school

不要陷入版本的选择 node.js , io.js , libuv

API撸一发

- 上图不上种，菊花万人捅

url解析好帮手， uri是url的超级 

- 何为http

http客户端发起请求，创建一个端口，默认为80，

http服务器在端口监听客户端请求

http服务器向客户端返回状态和内容

但是在这个过程中，浏览器和计算机为我们做了很多事情

1.域名解析

- （1）chrome浏览器搜索自身的DNS缓存   chrome://net-internals#dns
- （2）搜索操作系统自身的DNS的缓存（浏览器没有缓存，或者缓存已失效）
- （3）读取本地的host文件
- （4）如果都没找到，浏览器发起一个dns的系统调用，向网络运营商发起dns域名解析的请求.  宽带运营商服务器也会查看本身缓存， 如果还是没有，运营商服务器发起一个迭代的DNS解析请求。  www.baidu.com , 首先会问根域com的服务器，嘿哥们，baidu.com的域名地址是多少呀？  对面回答，我靠，我怎么知道baidu.com的域名地址，我只知道com域顶级域的IP地址。 运营商网络拿到com域的ip地址后，就向com域的DNS服务器询问，嘿哥们，baidu.com的域名地址是多少？ 我靠，我怎么知道baidu.com的域名地址，但我知道baidu.com的IP地址，你可以找它去，那运营商服务器一路小跑，找到baidu.com的域服务器，这一般是域名注册商服务器，还是很谦虚的问，你知道baidu.com服务器的

1. 浏览器查看DNS缓存
2. 搜索操作系统的DNS缓存
3. 读取host文件
4. 浏览器发起一个DNS解析请求的系统调用
5. 宽带运营商查看本地缓存
6. 运营商服务器发起一个迭代DNS解析请求
7. 系统内核讲ip地址返回给浏览器
8. 建立TCP连接，客户端开启一个端口，发起一个tcp的请求，请求经过层层路由，经过网卡，防火墙到达TCP/IP协议栈，到了服务器端。
9. 三次握手
10. 开始传输数据


get 拿， post 传， put更新


## HTTP模块
Node.js的三大特性：非阻塞，单线程和事件回掉

1. 什么是回调？
回调是异步编程时的基础，将后续逻辑封装成起始函数的参数，逐层嵌套（打电话，问有没有位子，挂机，回电话，回调）
js需要执行异步逻辑的时候，将后续的逻辑封装成函数，作为起始函数的参数，逐层嵌套，让程序按照我们期望的顺序执行下去

2. 什么是同步/异步？
同步是指：发送方发出数据后，等接收方发回响应以后才发下一个数据包的通讯方式。  
异步是指：发送方发出数据后，不等接收方发回响应，接着发送下个数据包的通讯方式。 

还是打电话的例子，问老板，有没有位置，老板说，稍等我查一下，电话不挂，一直等到查完，告诉你结果
异步则是，稍等，我查一下，查完老板回电话你，中间挂断电话，可以去做其他的事情

因为Js是单线程，因此js文件是按顺序执行，如果某个文件有死循环，那么js文件就会被阻塞在这里；

3. 什么是I/O？
磁盘的写入（in）磁盘的读取（out）

数据的进和出，在nodejs中本质上就是为数据库和文件系统提供接口，当向文件系统发送一个请求的时候，
不需要等待磁盘，当磁盘准备好之后，非阻塞接口会通知node

4. 什么的单线程/多线程？
一次只能执行一个程序叫做单线程
一次能执行多个程序叫多线程

单线程就比如谈女朋友，一次只能谈一个，这个没分手就不能谈下一个，多线程就比如是脚踏两只船；

5. 什么是阻塞/非阻塞？
阻塞：前一个程序未执行完就得一直等待
非阻塞：前一个程序未执行完时可以挂起，继续执行其他程序，等到使用时再执行

也是打电话的例子，阻塞就是你打电话的时候，你电话不挂，等待的时候，别人是打不进去电话的，
而非阻塞就是，你可以去看电影，该干啥干啥，不要别这个电话给拖住了；

6. 什么是事件？
一个触发动作（例如点击按钮，拖拽窗口）
在nodejs层面的 当客户端发起一个请求的时候，会触发一个事件，当读取一个文件的时候也会触发一个事件；

EventEmitter,为每个事件注册了回掉函数，这个函数不是立马执行，而是当这个事件被触发的时候才去执行。

7. 什么是事件驱动？
一个触发动作引起的操作（例如点击按钮后弹出一个对话框），所以这种基于事件驱动的机制，使得js可以通过回掉来达到异步编程的效果；


8. 什么是基于事件驱动的回调？
为了某个事件注册了回调函数，但是这个回调函数不是马上执行，只有当事件发生的时候，才会调用回调函数，这种函数执行的方式叫做事件驱动~这种注册回调就是基于事件驱动的回调，如果这些回调和异步I/O(数据写入、读取)操作有关，可以看作是基于回调的异步I/O，只不过这种回调在nodejs中是有事件来驱动的

9. 什么是事件循环？
//事件循环Eventloop,倘若有大量的异步操作，一些I/O的耗时操作，甚至是一些定时器控制的延时操作，它们完成的时候都要调用相应的回调函数，从而来完成一些密集的任务，而又不会阻塞整个程序执行的流程，此时需要一种机制来管理，这种机制叫做事件循环.
总而言之就是：管理大量异步操作的机制叫做事件循环

Event Loop:
回调函数队列。异步执行的函数会被压入这个队列; 队列被循环查询，查看队列中是否有事件还未执行完。先进先出，




HTTP源码解读

什么是作用域

什么是上下文

作用域：与调用函数,访问变量的能力有关 作用域分为：局部和全局（在局部作用域里可以访问到全局作用域的变量，但在局部作用域外面就访问不到局部作用里面所设定的变量）

上下文：与this关键字有关 是调用当前可执行代码的引用
       this总是指向调用这个的方法的对象
js里的this 通常是当前函数的拥有者
this 是js的一个关键字 代表函数运行时自动生成的一个内部对象 只能在函数内部使用

1.作为对象的方法 
this在方法内部，this就指向调用这个方法的对象
2.函数的调用
this指向执行环境中的全局对象（浏览器->window  nodejs->global）
3.构造函数
this所在的方法被实例对象所调用，那么this就指向这个实例对象

更改上下文方法(更改this指向的内容,可方便地实现继承)：
		call(list);
		apply(array);
根据call()、apply()改变上下文this指向的特性,也可以方便实现继承


HTTP性能测试

Apache的ab的用法是（用tomcat里的ab.exe来测试）：
（需要进到目录/usr/bin/目录里）
ab [options] [http://]hostname[:port]/path
ab常用参数的介绍：
-n ：总共的请求执行数，缺省是1
-c： 并发数，缺省是1
-t：测试所进行的总时间，秒为单位，缺省50000s
-p：POST时的数据文件
-w: 以HTML表的格式输出结果

找到 apache的bin目录 ./ab -n1000 -c10 http://www.imooc.com/

```
Server Software:
Server Hostname:        localhost
Server Port:            3001

Document Path:          /
Document Length:        12 bytes

Concurrency Level:      10
Time taken for tests:   0.894 seconds
Complete requests:      1000
Failed requests:        0
Write errors:           0
Total transferred:      113000 bytes
HTML transferred:       12000 bytes
Requests per second:    1118.79 [#/sec] (mean)
Time per request:       8.938 [ms] (mean)
Time per request:       0.894 [ms] (mean, across all concurrent requests)
Transfer rate:          123.46 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   1.5      0      16
Processing:     0    8   7.0      8      31
Waiting:        0    5   6.5      0      20
Total:          0    8   7.0      8      31

Percentage of the requests served within a certain time (ms)
  50%      8
  66%     16
  75%     16
  80%     16
  90%     16
  95%     16
  98%     20
  99%     20
 100%     31 (longest request)
```


HTTP 小爬虫

见代码


## event模块

nodejs 的事件模块不存在事件的冒泡，捕获这些事件流，所以自己实现了event模块 eventEmitter,主要是事件的监听与发射，支持多个监听函数，支持10个监听器，可以通过 setMaxLlistener()设置

on  可以用 addListener 
具体看api文档

## HTTP - GET和Requet

client.js
可以模拟发送post提交数据

可以见具体的api文档


Buffer在nodejs中用来处理二进制的数组（js字符串是用utf-8存储的，处理二进制的能力是很弱的，而网络层对资源的请求，响应等基本以二进制来进行交互）创建一个专门存储二进制的缓存区，并提供了一些方法对这些缓存区的数据做进一步的处理
buffer在nodejs里可全局访问


## buffer实例化
```
1. new Buffer('hello 你好');//以默认编码格式utf-8进行字符转换
2. new Buffer('hello 你好','base64');//将默认编码格式修改为base64
3. var buf = new Buffer(8);//设置缓存区的大小
   buf.length; //8
4. var buf = new Buffer('12345678');
   console.log(buf) //buf长度为8
5. var buf = new Buffer(7);
   buf.write('12345678');
   console.log(buf) //只要指定了buf长度，超出了都不会被缓存
6. var buf = new Buffer([1,2,3,4]);//经过数组初始化
   console.log(buf[1])//值为2. 可以通过下标来访问，如果值为小数，会直接取整数。
```

poolSize:内存载体的容量
isBuffer:是否为buffer类型对象
compare:用来判断两个buffer对象的相对位置
isEncoding:判断nodejs是否支持某种编码
concat:将几个buffer对象连接创建一个新的buffer对象
byteLength:获得指定编码下字符串所占的字节数


对Unicode编码的数据很容易处理的但是对于二进制数据就没什么处理方法了。但是在一些TCP数据流或者在操作一些文件数据流的时候，字节流的处理方法还是必须的。nodeJS中便出了处理的策略方法~提供了与String类似对等的全局构造函数Buffer（与其说与String对等，还不如说与Array类似但是有些不同方面还是需要注意），全局那么自然就不要每次的require了。Buffer则node中储存二进制数据的中介者。

光说不练瞎扯淡

要让网页中的base64格式生效，得写成：data:image/png;base64,iVB...

Buffer用来保存原始数据（适合小文件，单个图片等，一次性全部存到buffer内存中），流是用来暂存和移动数据的（适合大文件，类似视频文件等，不用全部占用内存，通过流事件来实现边读边写的过程），两个常常结合使用比较好

fs.createReadStream(); 有 data 事件、readable事件、end事件；
暂停读取时 readStream.pause(); 恢复是 readStream.resume();

cat *.js | grep http
查找当前目录下，含有'http'字符串的所有js文件

Node.js 中有四种基本的流类型：

Readable - 可读的流 (例如 fs.createReadStream()).
Writable - 可写的流 (例如 fs.createWriteStream()).
Duplex - 可读写的流 (例如 net.Socket).
Transform - 在读写过程中可以修改和变换数据的 Duplex 流 (例如 zlib.createDeflate()).

TransformStream 是用来添加一些前后缀，不保留数据
rs.pipe(ts).pipe(ws);
rs可读流负责读取数据，ws 可写流 负责消费数据

