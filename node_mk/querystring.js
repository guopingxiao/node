/**
 * querystring.parse(str[, sep[, eq[, options]]])
 * querystring.stringify(obj[, sep[, eq[, options]]])
 * querystring.escape(str)
 * querystring.unescape(str)
 */
const querystring = require('querystring');

const queryObj = querystring.parse('foo=bar&abc=xyz&abc=123')

console.log(queryObj)

const querystr = querystring.stringify(queryObj)

console.log(querystr)

const escapestr = querystring.escape('哈哈')

console.log(escapestr)

