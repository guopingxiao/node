var glob = require('glob')

var globInstance = new glob.Glob('http/!(a|b|c).js',{nonull:true})

globInstance.on('match', function(files){
    console.log(files)
})

globInstance.on('end', function(files){
    console.log(files)
})

globInstance.on('abort', function(){
    console.log('abort')
})

globInstance.pause();
globInstance.resume();
//globInstance.abort();