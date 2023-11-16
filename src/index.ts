import { Lexer, Parser, LexerState, Grammar } from 'nearley'
import initGrammar from './grammar.js'
import initLexer from './lexer.js'
import initHtml from './to-html.js'
import { Vdom } from './vdom.js'

export type Ast = any

export class Jianpu {
  public lexer: Lexer
  public parser: Parser
  private genHtml: ((ast: Ast) => Vdom)
  private initState: { [key: string]: any; lexerState: LexerState }
  constructor() {
    const lexer = this.lexer = initLexer()
    const grammar = initGrammar(lexer)
    const compiledGrammar = Grammar.fromCompiled(grammar)
    this.parser = new Parser(compiledGrammar)
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

  public toHtml(code: string): string {
    this.parser.restore(this.initState)
    const ast = this.parse(code)
    console.dir(ast, { depth: 10 })
    const str = this.genHtml(ast).toString()
    console.log(str)
    return str
  }
}
