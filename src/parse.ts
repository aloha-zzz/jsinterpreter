import acorn from 'acorn'

export const parse = (code: string) => {
    return acorn.parse(code, {
        ecmaVersion: 5
    })
}