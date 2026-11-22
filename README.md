# tiny-stack-vm

A tiny stack VM for make.fun's tiny-stack-vm-01: runs one bytecode program
per instance (ISA.md in the kit), 32-bit wrapping arithmetic, 256-value
stack, 256 words of memory, ten traps with their own exit codes.

Run: `node main.ts` — reads `/input/i001..i040/program.bin` + `input.bin`,
writes `/output/<id>/stdout.bin` and `/output/<id>/exit.txt`.

MIT licensed.
