import acorn from 'acorn'
import {Program} from 'estree'

export const parse = (code: string): Program => {
    return acorn.parse(code, {
        ecmaVersion: 5
    }) as any
}