import { describe, expect, it } from 'vitest'
import type Nearley from 'nearley'
import { Jianpu } from '../src/index'
import { examples } from './examples'

// 打印 token 列表
export const traceLex = (input: string, lexer: Nearley.Lexer) => {
  lexer.reset(input)
  const buf: Nearley.Token[] = []
  let res = lexer.next()
  while (res) {
    buf.push(res)
    res = lexer.next()
  }
  console.error('traceLex:', buf)
  return true
}

describe('test nearley to-tex', () => {
  const jianpu = new Jianpu()
  examples.forEach((item, index) => {
    traceLex(item.input, jianpu.lexer)
    it(`#${index} ${item.desc ? `[${item.desc}] ` : ''}${item.input}`, () => {
      expect(jianpu.toHtml(item.input)).toBe(item.html)
    })
  })
})
