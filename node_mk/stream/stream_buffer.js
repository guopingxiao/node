var fs = require('fs')

var readStram = fs.createReadStream('4.png')

var writeStream = fs.createWriteStream('4-copy.png')

readStram.on('data', function(chunk){
    if(writeStream.write(chunk) === false){
        // 数据还没写入，在缓存区
        console.log('still cached')
        readStram.pause();
    }
})

readStram.on('end', function(){
    writeStream.end();
})

writeStream.on('drain', function(){
    console.log('data drain')

    readStram.resume();
})