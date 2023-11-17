import * as Nearley from 'nearley'
import initGrammar from './grammar.js'
import initLexer from './lexer.js'
import initHtml from './to-html.js'
import { Vdom } from './vdom.js'

export type Ast = any

export class Jianpu {
  public lexer: Nearley.Lexer
  public parser: Nearley.Parser
  private genHtml: ((ast: Ast) => Vdom)
  private initState: { [key: string]: any; lexerState: Nearley.LexerState }
  constructor() {
    const lexer = this.lexer = initLexer()
    const grammar = initGrammar(lexer)
    const compiledGrammar = Nearley.Grammar.fromCompiled(grammar)
    this.parser = new Nearley.Parser(compiledGrammar)
    this.initState = this.parser.save()
    this.genHtml = initHtml()
  }

  private parse(code: string) {
    this.parser.feed(code)
    if (this.parser.results.length === 0) {
      throw new Error('unexpected end of input')
    }
    else if (this.parser.results.length > 1) {
      console.dir(this.parser.results, { depth: 10 })
      throw new Error('ambiguous parse')
    }
    return this.parser.results[0]
  }

  public toHtml(code: string): Vdom {
    this.parser.restore(this.initState)
    const ast = this.parse(code)
    console.dir(ast, { depth: 10 })
    const vdom = this.genHtml(ast)
    console.log(vdom.toString())
    return vdom
  }
}
