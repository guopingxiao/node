function learn(something){
    console.log(something)
}

function we(callback,something){
    something = `we learn ${something} is cool!`
    callback(something)
}

we(learn,'JS')  // 具名函数传递的方式

we(function(something){ //匿名函数传递的形式
    console.log(something)
}, 'Node')