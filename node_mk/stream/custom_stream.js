// 自己定制的可写流，重写 _read  _write方法


var stream = require('stream')
var util = require('util')

function ReadStream(){
    stream.Readable.call(this)  //继承
}

util.inherits(ReadStream, stream.Readable)

ReadStream.prototype._read = function(){
    this.push("I")
    this.push("Love")
    this.push("YOu")
    this.push(null)
}


function WriteStream (){
    stream.Writable.call(this)
    this._cached = new Buffer(' ')
}

util.inherits(WriteStream, stream.Writable)

WriteStream.prototype._write =function(chunk, encode, cb){
    console.log(chunk.toString())
    cb();
}

function TransformStream (){
    stream.Transform.call(this)
}

util.inherits(TransformStream, stream.Transform)

TransformStream.prototype._transform = function(chunk, encode, cb){
    this.push(chunk)
    cb();
}

TransformStream.prototype._flush = function(cb){
    this.push('Oh, Yeah!')
    cb();
}

var rs = new ReadStream();
var ws = new WriteStream();
var ts = new TransformStream();

rs.pipe(ts).pipe(ws)