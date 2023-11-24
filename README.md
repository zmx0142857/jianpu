# Jianpu

Simple music markup language.

Try live demo at: https://zmx0142857.github.io/jianpu

## Quick start

    $ cd jianpu
    $ pnpm i       # install dependencies
    $ pnpm build   # build jianpu.js

    $ pnpm i -g serve     # install a local static server
    $ serve -L -l 1234 &  # start server

Open browser at `http://localhost:1234` and try it yourself!

## Examples

> This part is under construction...

```text
title { "Some Music" }
author { "icouldfran" }
tone { "G" }
time { "4/4" }
bpm { "120" }

// this is a comment
main {
  (4'1') (4'1') (3'7) (3'7) |
  (4'1') (4'1') (3') 7. |
  (6'3') (6'3') (#5'3') (#5'3') |
  (6'3') (6'3') (#5') 3'. |
  (6'3') (6'3') (7'6') (3'1') |
  (6'3') (1'3') 6 (#567)_3 |
  (1'6) (1'6) (7#5)(7#5) |
  (1'6) (1'6) (7) #5. |
  (1'6) (1'6) (7#5) (2'1'7)_3 |
  (1'7) (6#5) 6 - |
}
```

Chords:
```text
(<1,:3 b3,:2 5,:1> <4 6 1'>)
```
