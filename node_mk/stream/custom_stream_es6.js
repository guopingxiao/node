"use strict"
let stream=require('stream');


class ReaderStream extends stream.Readable{
    constructor(){
        super();
        this._cached=new Buffer('');
    }
    _read(){
        this.push('I');
        this.push('Love');
        this.push('Mock\n');
        this.push(null);
    }
}

class WriteStream extends stream.Writable{
    _write(chuck,encode,cb){
        console.log(chuck.toString())
        cb();
    }
}

class Transform extends stream.Transform{
    _transform(chunk,encode,cb){
        this.push(chunk);
        cb();
    }
    _flush(cb){
        this.push('oh Yeah')
        cb();
    }
}

let read=new ReaderStream();
let write = new WriteStream();
let transform = new Transform();

read.pipe(transform).pipe(write);