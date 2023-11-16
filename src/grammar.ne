@{%
function processPiece (d) {
  return { type: 'piece', value: d[0].map(id) }
}
function processPiece2 ([bars, lastBar]) {
  return { type: 'piece', value: [...bars.map(id), lastBar] }
}
function processBar (d) {
  return { type: 'bar', value: d[0].map(id) }
}
function processGroup (d) {
  return { type: 'group', value: d[0] }
}
function processParen (d) {
  return d[2].map(v => v[0][0])
}
function processNote (d) {
  const res = { ...d[1], type: 'note', tilde: !!d[0] }
  const dotDash = d[2] && d[2][0][1]
  if (dotDash) {
    if (dotDash[0].type === 'dot')
      res.dot = dotDash.length // 附点数
    else if (dotDash[0].type === 'dash')
      res.dash = dotDash.length // 横杠数
  }
  return res
}
function processPitch (d) {
  return {
    value: d[1].value, // 音名
    alter: !d[0] ? 0 : d[0][0].type === 'sharp' ? 1 : -1, // 变化音: +1 升高半音, -1 降低半音
    octave: !d[2] ? 0 : d[2][0][0].type.slice(0, 2) === 'hi' ? d[2][0].length : -d[2][0].length, // octave: +1 升高八度, -1 降低八度
  }
}
function processText (d) {
  return { type: 'text', value: d[1] ? d[1].value.slice(0, -1) : '' }
}
%}

@lexer lexer

# 乐段, 最后一个 %bar 是可选的
piece -> (bar _):+ {% processPiece %}
  | (bar _):* lastBar {% processPiece2 %}

# 小节
bar -> lastBar %bar {% id %}
lastBar -> (group _):+ {% processBar %}

# 节奏组
group -> note {% id %}
  | paren {% processGroup %}

# 括号组
paren -> %lparen _ ((note | paren) _):+ %rparen {% processParen %}

# 音符
note -> (%tilde _):? pitch ((_ %dot:+) | (_ %dash:+)):? {% processNote %}

# 音高
pitch -> (%sharp | %flat):? %note_name (%hi_octave:+ | %lo_octave:+):? {% processPitch %}

# 空格, tab 以及换行
_ -> (%space | %newline):* {% d => '' %}

# 文本
text -> %text %textEnd {% processText %}