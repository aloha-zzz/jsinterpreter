import { isFunction } from 'utils';
import estree from 'estree'
export class Context {

    parent: Context | null;
    varMap: Record<string, any>;
    constructor(parent: Context | null) {
        this.parent = parent
        this.varMap = {}
    }


    findVar = (key: string): any => {
        if (!this.varMap[key]) {
            if (this.parent) {
                return this.parent.findVar(key)
            }
            // TODO: 处理 global
        }
    }


    addVar = (key: string, val: any) => {
        this.varMap[key] = val
    }


    addFunction = (key: string, innerAST: estree.ExpressionStatement[], args: string[]) => {
        this.varMap[key] = {
            ast: innerAST,
            args: args
        }
    }

    getReturnValue = (key: string, ...args) => {
        const variable = this.findVar(key)
        if (!variable) {
            throw new Error(`key: ${key} not found`)
        }

        if (isFunction(variable)) {
            return variable.apply(null, args)
        }
        return variable
    }


    invokeFunc = (...args) => {
        // args.forEach(i => {
        //     this.addVar()
        // })
    }




}





export const globalContext = new Context(null)