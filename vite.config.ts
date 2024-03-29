import { defineConfig } from 'vitest/config';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
	plugins: [
		AutoImport({
			imports: ['vitest'],
			dts: true,
		}),
	],
	test: {
		environment: 'happy-dom'
	}
});