const klass = require('./klass')


exports.add = (klasses) =>{
    klasses.forEach((item,index) =>{
        var _klass = item,
        techerName = item.teachName,
        students = item.students;

        klass.add(teachName, students)
    })
}
// klass.add('Scott', ['白富美','高富帅'])