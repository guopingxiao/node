var Readable = require('stream').Readable;
var Writable = require('stream').Writable;

var readStream = new Readable();
var writeStream = new Writable();

readStream.push('I')
readStream.push('Love')
readStream.push('You')
readStream.push(null)

// 重写——write方法
writeStream._write = function(chunk, encode, cb){
    console.log(chunk.toString())
    cb();
}

readStream.pipe(writeStream)