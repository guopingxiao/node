var fs = require('fs')

var readStream = fs.createReadStream('4.png')

var n =0;

readStream
    .on('data', function(chunk){
        n ++;
        console.log('data emit')

        console.log(Buffer.isBuffer(chunk))
        //console.log(chunk.toString('utf-8'))

        readStream.pause();
        console.log('data pause')
        //模拟异步请求
        setTimeout(function(){
            console.log('data pause end')
            readStream.resume()
        },10)
    })
    .on('readable',function(){
        console.log('data readable')
    })
    .on('end',function(){
        console.log(n)
        console.log('data end')
    })
    .on('close', function(){
        console.log('data close')
    })
    .on('error', function(){
        console.log('data error'+ e)
    })
