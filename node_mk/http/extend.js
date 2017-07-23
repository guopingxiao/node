function Pet (words){
    this.words =words;
    this.speak = function(){
        console.log(this.words)
    }
}

// call apply实现继承
function Dog(words){
    Pet.call(this,words)
}

var dog = new Dog('Wang')

dog.speak()