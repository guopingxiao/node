// var pet = {
//     words: '...',
//     speak: ()=>{
//         console.log(this.words)
//         console.log(this)
//     }
// }

// pet.speak()// 箭头函数找不到this

// let pet = {
//     words: '...',
//     speak: function(){
//         console.log(this.words)
//         console.log(this)
//     }
// }

// pet.speak()

// let pet = function(words){
//     this.words = words;
//     console.log(this.words)
//     console.log(this===global) 
// }

// pet('....')


function Pet(words){
    this.words = words;
    this.speak = function(){
        console.log(this.words)
    }
}

let pet = new Pet('Miao')

pet.speak();


