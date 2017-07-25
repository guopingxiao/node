var fs = require('fs')

fs.createReadStream('4.png').pipe(fs.createWriteStream('pipe-4.png'))