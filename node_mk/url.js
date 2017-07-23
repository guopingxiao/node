const url = require('url');

const urlText = 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'

const urlObj = url.parse(urlText)
//url.parse(urlString[, parseQueryString[, slashesDenoteHost]])
console.log(urlObj)

url.resolve('/one/two/three', 'four')         // '/one/two/four'
url.resolve('http://example.com/', '/one')    // 'http://example.com/one'
url.resolve('http://example.com/one', '/two') // 'http://example.com/two'

const str = url.format(urlObj)

console.log(str)