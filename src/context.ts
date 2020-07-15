/** 作用域 */
export class Context {

    parent: Context | null;
    varMap: Record<string, any>;
    constructor(parent: Context | null) {
        this.parent = parent
        this.varMap = {}
    }


}





export const globalContext = new Context(null)