const { parse } = require('./dist')

const code = `console.log('wuhu')`

const ast = parse(code)
console.log(ast.type)

