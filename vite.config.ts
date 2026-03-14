import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import preload from 'vite-plugin-preload';

import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [viteReact(), preload()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
});
