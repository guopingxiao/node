const EventEmitter = require('events').EventEmitter

const life = new EventEmitter();

life.setMaxListeners(15)

life.on('qiuanwei', function(who){
    console.log(`给${who}倒水`)
})
life.on('qiuanwei', function(who){
    console.log(`给${who}倒水`)
})
life.on('qiuanwei', function(who){
    console.log(`给${who}倒水`)
})
life.on('qiuanwei', function(who){
    console.log(`给${who}倒水`)
})
life.on('qiuanwei', function(who){
    console.log(`给${who}倒水`)
})
life.on('qiuanwei', function(who){
    console.log(`给${who}倒水`)
})
life.on('qiuanwei', function(who){
    console.log(`给${who}倒水`)
})
life.on('qiuanwei', function(who){
    console.log(`给${who}倒水`)
})
life.on('qiuanwei', function(who){
    console.log(`给${who}倒水`)
})

life.on('qiuanwei', callback)

life.on('qiuniai', function(who){
    console.log(`给${who}买衣服`)
})

life.removeListener('qiuanwei', callback)
let count = life.listenerCount('qiuanwei')
console.log(count)

life.removeAllListeners('qiuanwei')

let hasEmit = life.emit('qiuanwei','妹子')
console.log(hasEmit)

function callback(who){
    console.log(`给${who}---倒水`)
}