interface Example {
  input: string
  html: string
  desc?: string
}

const $ = String.raw
const nonewline = (arr: TemplateStringsArray) => [...arr].map(str => str.replace(/\n\s*/g, '')).join('')

const passedExamples: Example[] = [
  {
    input: "(#4'1,)",
    html: nonewline`
<div class="jianpu">
  <div class="jianpu-bar">
    <div class="jianpu-group">
      <span class="jianpu-note hi ul">4</span>
      <span class="jianpu-note lo ul">1</span>
    </div>
  </div>
</div>`
  },
]

// no idea why this fails ˉ\_(ツ)_/ˉ
const whyThisFails: Example[] = [
]

const todoExamples: Example[] = [
  {
    input: "(4'1,) (4''(1,,)) ((3'''(7,,, ))) (3'7) |",
    html: nonewline`
<div class="jianpu">
  <div class="jianpu-bar">
    <div class="jianpu-group">
      <span class="jianpu-note hi ul">4</span>
      <span class="jianpu-note lo ul">1</span>
    </div>
    <div class="jianpu-group">
      <span class="jianpu-note hi2 ul">4</span>
      <span class="jianpu-note lo2 ul2">1</span>
    </div>
    <div class="jianpu-group">
      <span class="jianpu-note hi3 ul2">3</span>
      <span class="jianpu-note lo3 ul3">7</span>
    </div>
    <div class="jianpu-group">
      <span class="jianpu-note hi ul">3</span>
      <span class="jianpu-note ul">7</span>
    </div>
  </div>
</div>`
  },
]

export const examples: Example[] = [
  // ...passedExamples,
  ...todoExamples,
  // ...whyThisFails,
]
