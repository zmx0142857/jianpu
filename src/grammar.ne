@{%
function processText (d) {
  return { type: 'text', value: d[1] ? d[1].value.slice(0, -1) : '' }
}
function processParen (d) {
  return { type: 'paren', value: d[2].map(v => v[0]) }
}
%}

@lexer lexer

# 乐段, 最后一个 %bar 是可选的
piece -> (bar _):+
  | (bar _):* (group _):+

# 小节
bar -> (group _):+ %bar

# 节奏组
group -> note
  | paren

# 括号组
paren -> %lparen _ ((note | paren) _):+ %rparen {% processParen %}

# 音符
note -> (%tilde _):? pitch _ (%dot | %dash):?

# 音高
pitch -> altered_tone
  | altered_tone %hi_octave:+
  | altered_tone %lo_octave:+

# 变化音 
altered_tone -> (%sharp | %flat):? %note_name

# 空格, tab 以及换行
_ -> (%space | %newline):* {% d => ' ' %}

# 文本
text -> %text %textEnd {% processText %}