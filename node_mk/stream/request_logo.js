var http = require('http')

var fs = require('fs')
var request = require('request')

http.createServer(function(req, res){
    // fs.readFile('4.png', function(err,data){
    //     if(err){
    //         console.log('file not exist')
    //     }else{
    //         res.writeHeader(200, {'Content-Type':'text/html'})
    //         res.end(data)
    //     }
    // })
        //pipe只需一行代码，有优化，随时消费
        request('http://www.imooc.com/static/img/common/new.png').pipe(res)
}).listen(8090)