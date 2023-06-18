import { defineConfig } from 'tsup'

export default defineConfig({
  format: ['esm', 'cjs'],
  entry: [
    'src/index.ts',
  ],
  dts: {
    entry: [
      'src/index.ts',
    ],
  },
  clean: true,
  minify: true,
})
