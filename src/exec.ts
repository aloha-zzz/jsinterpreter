import { Context } from './context'
import estree from 'estree'

/** execute ast logic */

const executeMap = {
    'VariableDeclaration': (node: estree.VariableDeclaration, ctx: Context) => {
        node.declarations.forEach(i => {
            if (i.init?.type === 'Literal') {
                const { name } = i.id as estree.Identifier
                const { value } = i.init as estree.Literal
                ctx.addVar(name, value)
            }

            if (i.init?.type === 'ObjectExpression') {
                const { name } = i.id as estree.Identifier
                const { properties } = i.init as estree.ObjectExpression


                const resolveObjValue = (properties: (estree.Property|estree.SpreadElement)[]) => {
                    return properties.map(i => {
                        if (i.type === 'Property') {
                            const { name } = i.key as estree.Identifier
                            if (i.value.type === 'Literal') {
                                return {
                                    [name]: i.value.value
                                }
                            }
                            if (i.value.type === 'ObjectExpression') {
                                return resolveObjValue(i.value.properties)
                            }
                        }
                        if (i.type === 'SpreadElement') {
                            throw `not implement`
                        }
                    })
                }

                const value = resolveObjValue(properties)
                ctx.addVar(name, value)
            }


            if (i.init?.type === 'FunctionExpression') {
                if (i.init.body.body.length === 0) {
                    return
                }
                const subCtx = new Context(ctx)
                executeBody(i.init.body.body, subCtx)
            }
        })
    },

    'FunctionDeclaration': (node: estree.FunctionExpression, ctx: Context) => {
        const key = node.id?.name

        // const args =

        const subCtx = new Context(ctx)

    },

    'ExpressionStatement': (node: estree.ExpressionStatement, ctx: Context) => {
        if (node.expression.type === 'CallExpression') {
            if (node.expression.callee.type === 'Identifier') {
                const value = ctx.getReturnValue(node.expression.callee.name, node.expression.arguments)

                return value
                // return .call(null, node.expression.arguments)
            }

            if (node.expression.callee.type === 'MemberExpression') {
                const invoke = (node: estree.MemberExpression) => {
                    if (node.object.type === 'MemberExpression') {
                        return invoke(node.object)
                    }
                }
            }
        }
    },


    'ForStatement': (node: estree.ForStatement, ctx: Context) => {

    },


    'BinaryExpression': (node: estree.BinaryExpression, ctx: Context) => {

    },

    "IfStatement": (node: estree.IfStatement, ctx: Context) => {

    }
}


/** 执行逻辑 */
export const execute = (ast: estree.Program, ctx: Context) => {
    return executeBody(ast.body as Array<estree.Statement>, ctx)
}


export const executeBody = (ast: estree.Statement[], ctx: Context) => {
    ast.forEach(statement => {
        return executeMap[statement.type](statement, ctx)
    })
}

