/**
 * @file Vitest にのみ用いる。
 */

import react from '@vitejs/plugin-react';
import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';
import type { InlineConfig } from 'vitest';

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

export default defineConfig({
  plugins: [react()],
  test: {
    // globals でないと挙動が怪しいテストがいくつかある。 AsyncCounter など。
    globals: true,
    // happy-dom は input[type="text"] に対する fireEvent.change の挙動がおかしい。
    // environment: 'happy-dom',
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    exclude: ['node_modules/**/*'],
  },
} as VitestConfigExport);
