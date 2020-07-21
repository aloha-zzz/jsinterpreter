import { parse } from './parse'
import { Context } from 'context'
import { execute } from 'exec'
import { Program } from 'estree'

export const interpreter = (code: string) => {
    const ast = parse(code)

    const globalContext = new Context(null)

    const result = execute(ast, globalContext)


    return result

}