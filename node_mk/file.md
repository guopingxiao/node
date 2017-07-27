所有的方法都有异步和同步的形式。

异步方法的最后一个参数都是一个回调函数。 传给回调函数的参数取决于具体方法，但回调函数的第一个参数都会保留给异常。 如果操作成功完成，则第一个参数会是 null 或 undefined。

当使用同步方法时，任何异常都会被立即抛出。 可以使用 try/catch 来处理异常，或让异常向上冒泡。

```
const fs = require('fs');

fs.unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('成功删除 /tmp/hello');
});
```

异步的方法不能保证执行顺序。 所以下面的例子可能会出错：


```
fs.rename('/tmp/hello', '/tmp/world', (err) => {
  if (err) throw err;
  console.log('重命名完成');
});
fs.stat('/tmp/world', (err, stats) => {
  if (err) throw err;
  console.log(`文件属性: ${JSON.stringify(stats)}`);
});
```

fs.stat 可能在 fs.rename 之前执行。 正确的方法是把回调链起来。

```
fs.rename('/tmp/hello', '/tmp/world', (err) => {
  if (err) throw err;
  fs.stat('/tmp/world', (err, stats) => {
    if (err) throw err;
    console.log(`文件属性: ${JSON.stringify(stats)}`);
  });
});
```

fs.Stats 类

stats.isFile()
stats.isDirectory()

函数：fs.accessSync
说明：如果有任何可访问性检查失败则抛出错误，否则什么都不做！
示例：http://nodejs.cn/api/fs.html#fs_fs_accesssync_path_mode

```
function accessible(filePath) {
    let fs = require('fs');
    try {
        fs.accessSync(filePath);
        return true;
    } catch(e) {
        return e;
    }
}
```

函数：fs.existsSync
说明：如果文件存在，则返回true，否则返回false。
示例：http://nodejs.cn/api/fs.html#fs_fs_existssync_path

```
function accessible(filePath) {
    let fs = require('fs');
    return fs.existsSync(filePath);
}
```