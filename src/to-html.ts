/* eslint-disable @typescript-eslint/no-use-before-define */
import type { Ast } from './index'
import { Vdom } from './vdom'
import clsx from 'clsx'

interface GenHtmlOptions {
  paren?: number, // level of parenthesis
  dist?: number, // last note distance
}

const initHtml = () => {

  const genPiece = (ast: Ast, options: GenHtmlOptions): Vdom => {
    const res = new Vdom({
      tag: 'div',
      attr: { class: 'jianpu' },
      children: ast.value.map((ast: Ast) => genHtml(ast, options)),
    })
    return res
  }
  const genBar = (ast: Ast, options: GenHtmlOptions): Vdom => {
    const res = new Vdom({
      tag: 'div',
      attr: { class: 'jianpu-bar' },
      children: ast.value.map((ast: Ast) => genHtml(ast, options)),
    })
    options.dist = (options.dist || 0) + 1
    return res
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
    options.paren = (options.paren || 0) + 1
    const res = new Vdom({
      children: ast.map((v: Ast) => genHtml(v, options)),
    })
    options.paren -= 1
    return res
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
    const tildeChildren = (dist = 0, children: string) => [
      { tag: 'span', attr: { class: 'tilde' + dist }, children: '⌢' },
      { children },
    ]
    const dot = '.'.repeat(ast.dot || 0)
    const dash = '-'.repeat(ast.dash || 0).split('').join(' ')
    const alter = ast.alter === 1 ? '♯' : ast.alter === -1 ? '♭' : ''
    const value = alter + ast.value
    const note = new Vdom({
      tag: 'span',
      attr: { class: clsx('jianpu-note', octaveClass(ast.octave), ulClass(options.paren)) },
      children: !ast.tilde ? value : tildeChildren(options.dist, value),
    })
    options.dist = 1
    if (dot || dash) {
      if (dot) options.dist += 1
      else if (dash) options.dist += ast.dash || 0
      return new Vdom({
        children: [
          note,
          {
            tag: 'span',
            attr: { class: clsx('jianpu-note', ulClass(options.paren)) },
            children: dot || dash,
          },
        ]
      })
    }
    return note
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
