import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
//import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	//preprocess: vitePreprocess()
	
	preprocess: [
		preprocess({
			postcss: true,
		}),
	],
};

export default config;
