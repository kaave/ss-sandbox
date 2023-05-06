/**
 * @file Vitest にのみ用いる。
 */

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    // globals でないと挙動が怪しいテストがいくつかある。 AsyncCounter など。
    globals: true,
    // より高速な happy-dom を利用したいが、トラブルがあるため避ける。
    // 例: input[type="text"] に対する fireEvent.change の挙動がおかしい。
    // environment: 'happy-dom',
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    exclude: ['node_modules/**/*'],
  },
});
