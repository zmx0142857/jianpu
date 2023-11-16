/* eslint-disable @typescript-eslint/no-use-before-define */
import type { Ast } from './index'
import { Vdom } from './vdom'
import clsx from 'clsx'

interface GenHtmlOptions {
  paren?: number,
}

const initHtml = () => {

  const genPiece = (ast: Ast, options: GenHtmlOptions): Vdom => {
    return new Vdom({
      tag: 'div',
      attr: { class: 'jianpu' },
      children: ast.value.map((ast: Ast) => genHtml(ast, options)),
    })
  }
  const genBar = (ast: Ast, options: GenHtmlOptions): Vdom => {
    return new Vdom({
      tag: 'div',
      attr: { class: 'jianpu-bar' },
      children: ast.value.map((ast: Ast) => genHtml(ast, options)),
    })
  }

  const genGroup = (ast: Ast, options: GenHtmlOptions): Vdom => {
    return new Vdom({
      tag: 'div',
      attr: { class: 'jianpu-group' },
      children: [
        genHtml(ast.value, options),
      ]
    })
  }

  const genParen = (ast: Ast, options: GenHtmlOptions): Vdom => {
    return new Vdom({
      tag: '',
      children: ast.map((v: Ast) => genHtml(v, {
        ...options,
        paren: (options.paren || 0) + 1
      }))
    })
  }

  const genNote = (ast: Ast, options: GenHtmlOptions): Vdom => {
    const octaveClass = (octave: number) => {
      if (octave < 0) {
        return 'lo' + (octave === -1 ? '' : -octave)
      } else if (octave > 0) {
        return 'hi' + (octave === 1 ? '' : octave)
      } else {
        return ''
      }
    }
    const ulClass = (paren = 0) => {
      if (paren === 1) return 'ul'
      if (paren > 1) return 'ul' + paren
      return ''
    }
    return new Vdom({
      tag: 'span',
      attr: { class: clsx('jianpu-note', octaveClass(ast.octave), ulClass(options.paren)) },
      children: ast.value,
    })
  }

  /**
   * @param {Ast} ast nearley 生成的抽象语法树
   */
  const genHtml = (ast: Ast, options: GenHtmlOptions = {}): Vdom => {
    if (Array.isArray(ast)) return genParen(ast, options)
    switch (ast.type) {
      case 'piece': return genPiece(ast, options)
      case 'bar': return genBar(ast, options)
      case 'group': return genGroup(ast, options)
      case 'note': return genNote(ast, options)
      default: {
        console.error(ast)
        throw new Error(`unknown ast type ${ast.type}`)
      }
    }
  }

  return genHtml
}

export default initHtml
