const { parse } = require('./dist')

const code = `console.log('wuhu')`


console.log(parse(code))