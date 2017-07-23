var globalVar = 'Global Var'

function globalFunc(){
    let localVar = 'localVar'

    console.log('---------Global---------')
    console.log(globalVar)
    console.log(localVar)

    globalVar = 'GlobalVar Changed'
    console.log(globalVar)

    function localFunc(){
        let innerLocalVar = 'innerLocalVar'
        console.log('---------Local---------')
        console.log(globalVar)
        console.log(localVar)
        console.log(innerLocalVar)
    }
    localFunc()
}

globalFunc();