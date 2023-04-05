import type { PluginOption } from 'vite';
import { defineConfig, UserConfigExport } from 'vite';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig(({ mode }) => {
  // const env = loadEnv(mode, process.cwd());

  const config: UserConfigExport = {
    base: './',
    server: {
      port: 9000,
      open: '/',
    },
    build: {
      rollupOptions: {
        input: {
          index: './index.html',
          'root-config': './src/root-config.ts'
        },
        output: {
          format: 'system',
          entryFileNames: '[name].js',
          assetFileNames: 'assets/[name][ext]',
          globals: {
            'single-spa': 'singleSpa',
            'single-spa-layout': 'singleSpaLayout'
          }
        },
        preserveEntrySignatures: 'strict',
        external: ['single-spa', 'single-spa-layout']
      }
    },
    plugins: [
      handlebars({ context: { isLocal: mode === 'development' } }) as unknown as PluginOption,
    ]
  };

  return config;
});
