## node-glob：匹配对应规则的文件

安装：npm install glob
地址：https://github.com/isaacs/node-glob

示例：
```
var glob = require('glob');
  
// options是可选的
glob("**/*.js", options, function(er,files) {
    // files 是匹配到的文件的数组。
    // 如果options中的nonull被设置为true，而且没有找到任何文件，那么files就是glob规则本身即["**/*.js"]，而不是空数组。
    // er 是当寻找的过程中遇到的错误。
});
```

## 匹配规则

- （1）*：表示该路径下0个或多个任意字符
```
glob("js/*.js", function (er, files) {
    console.log(files);
});
```
获取js目录下所有的js文件。（不包括以.开头的文件)

- （2）?：匹配该路径下的1个任意字符

```
glob("js/?.js", function(er, files) {
    console.log(files);
});
```
获取js目录下所有名字只有1个字的js文件

- （3）[...]：匹配该路径下在指定范围内的字符，注意不能组合，只能是其中一个字符
```
glob("js/a[0-3].js", function(er, files) {
    console.log(files);
});
```
获取js目录下a开头，第二个字符为0~3之间（包括0和3）的js文件，eg：a0.js、a1.js、a3.js，但是像a03.js不能被匹配到。

- （4）*(pattern|pattern|pattern)： 匹配括号中多个模型的0个或多个或任意个的组合，注意|前后不能有空格。
```
glob("js/*(a|b|c).js", function(er, files) {
    console.log(files);
});
```
获取js目录下a.js、b.js、c.js，或者a/b/c这几个字符的组合，比如ab.js、abc.js

- （5）!(pattern|pattern|pattern)：匹配不包含任何模型，注意它并不等于!(*(pattern|pattern|pattern))

```
glob("js/!(a|b).js", function(er, files) {
    console.log(files);
});
```
获取js目录下名字中不包含a也不包含b的所有文件

- （6）?(pattern|pattern|pattern)： 匹配多个模型中的0个或者任意1个。它和4的区别是，不可以组合，必须完全匹配。
```
glob("js/?(a|b|c).js", function(er, files) {
    console.log(files);
});
```
获取js目录下的a.js、b.js、c.js任意一个文件

- （7）+(pattern|pattern|pattern)： 匹配多个模型中的1个或多个，它和4的区别是，必须有一个，为空不匹配。
```
glob("js/+(a|b|c).js", function(er, files) {
    console.log(files);
});
```
获取js目录下a.js、b.js、c.js，或者a/b/c这几个字符的组合，比如ab.js、abc.js

- （8）@(pattern|pattern|pattern)：匹配多个模型中的任意1个，它和6的区别是不匹配空的情况。
```
glob("js/@(a|b|c).js", function(er, files) {
    console.log(files);
});
```
获取js目录下的a.js、b.js、c.js任意一个文件
- （9）\*\*：和1一样，可以匹配任何内容，但\*\*不仅匹配路径中的某一段，而且可以匹配'a/b/c'这样带有/的内容，所以，它还可以匹配子文件夹下的文件。
```
glob("**/@(a|b|c).js", function(er, files) {
    console.log(files);
});
```
获取当前目录所有文件夹及子文件夹下的a.js、b.js、c.js。

还有一种方式是设置options的matchBase属性为true，同样可以起到在当前路径下搜索所有子文件夹的效果：

```
glob("@(a|b|c).js", {matchBase: true}, function(er, files) {
    console.log(files);
});
```

##Events:

end：end事件会在文件匹配结束，找出所有匹配结果的时候触发，它接受的参数就是找到的文件的数组。
match：match事件会在每次匹配到一个文件的时候触发，它接受的参数就是匹配到的文件。
error： error事件会在匹配遇到错误时触发，接受的参数是错误信息。
abort：当实例调用abort()方法时触发。


##方法：

pause 暂停匹配搜索
resume 继续匹配搜索
abort 永远停止匹配搜索，不能继续

```
    var globInstance = new glob.Glob("js/@(a|b|c).js", {nonull: true});
    
    globInstance.on('match', function(files){
        console.log(files);
    });
    
    globInstance.on('end', function(files){
        console.log(files);
    });
    
    globInstance.on('abort', function(){
        console.log('abort');
    });
    
    globInstance.pause();
    globInstance.resume();
    globInstance.abort();
```