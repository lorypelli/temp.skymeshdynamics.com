import build from '@hono/vite-build/vercel';
import devServer from '@hono/vite-dev-server';
import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 3000,
    },
    plugins: [
        devServer({ entry: 'src/index.ts' }),
        build({ entry: 'src/index.ts', emptyOutDir: true }),
    ],
});
