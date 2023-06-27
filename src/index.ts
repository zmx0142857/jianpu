import Nearley from 'nearley'
import initGrammar from './grammar.js'
import initLexer from './lexer.js'
import initHtml from './to-html.js'

export type Ast = any

class Jianpu {
  public lexer: Nearley.Lexer
  public parser: Nearley.Parser
  private genHtml: ((ast: Ast) => string)
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
  }

  public toHtml(code: string): string {
    this.parser.restore(this.initState)
    this.parse(code)
    return this.genHtml(this.parser.results)
  }
}

export {
  Jianpu,
}
