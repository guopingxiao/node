var fs = require('fs');

fs.readFile('./new.png', function(err, originBuffer){
    console.log(Buffer.isBuffer(originBuffer))

    fs.writeFile('newImage.png', originBuffer, function(err){
        if(err){
            console.log(err)
        }

        // var base64Img = new Buffer(originBuffer).toString('base64');多余的直接下面的就行

        var base64Img = originBuffer.toString('base64');

        console.log(base64Img)

        var decodedImg = new Buffer(base64Img, 'base64')

        //比较前后两个Buffer是不是一样
        console.log(Buffer.compare(originBuffer, decodedImg))

        fs.writeFile('decodeImg.png', decodedImg, function(err){
            if(err){
                console.log(err)
            }
        })
    })
});