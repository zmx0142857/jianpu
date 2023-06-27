# Jianpu

Simple music markup language.

> This repo is under construction.

Example:

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