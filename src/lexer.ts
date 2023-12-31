// https://github.com/no-context/moo#usage
import moo from './moo.esm.js'

const initLexer = () => {
  return moo.states({
    main: {
      newline: { match: '\n', lineBreaks: true },
      space: /[ \t\v\f]+/u,
      note_name: /[X0-7]/u,
      finger: /:[X0-9]+/u,
      text: { match: /"/u, push: 'text' },
      hi_octave: /'+/u,
      lo_octave: /,+/u,
      tilde: '~',
      sup: '^',
      sub: '_',
      sharp: '#',
      flat: 'b',
      dot: '.',
      dash: /-/u,
      bar: '|',
      lparen: '(',
      rparen: ')',
      lbrace: '{',
      rbrace: '}',
      langle: '<',
      rangle: '>',
      identifier: /[a-zA-Z][_0-9a-zA-Z]*/u,
      comment: /\/\/.*/u,
    },
    text: {
      // 文本内容及后引号
      text_end: { match: /(?:\\"|[^"])*"/u, lineBreaks: true, pop: 1 },
    },
  })
}

export default initLexer
