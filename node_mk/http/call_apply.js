var pet ={
    words:'Miao Miao Miao',
    speak: function(param){
        console.log( param + this.words )
    }
}

pet.speak('Cat ')

var dog = {
    words:'Wang Wang Wang'
}

pet.speak.call(dog,'Dog ') // call 和apply 运行时改变执行上下文