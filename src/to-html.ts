/* eslint-disable @typescript-eslint/no-use-before-define */
import type { Ast } from './index'

const initTex = () => {
  /**
   * @param {Ast} ast nearley 生成的抽象语法树
   */
  const toTex = (ast: Ast): string => {
    if (ast === null)
      return ''
    if (typeof ast === 'string')
      return ast
    if (Array.isArray(ast))
      return ast.map(v => toTex(v)).join(' ')
    switch (ast.type) {
      default: {
        console.error(ast)
        throw new Error(`unknown ast type ${ast.type}`)
      }
    }
  }

  return toTex
}

export default initTex
