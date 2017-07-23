let c = 0

// function plus(){
//     c +=1;
// }

function plus(callback){
    setTimeout(function(){
        c +=1
        callback()
    },1000)
}

function printIt(){
    console.log(c)
}

// plus()
// printIt()

plus(printIt)