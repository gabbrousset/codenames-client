import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    css: {
        // semantic-ui-css has selectors browsers already reject
        // (e.g. ":after .header"); drop them instead of failing the minify.
        lightningcss: { errorRecovery: true },
    },
    build: {
        // server.js serves ../ui/build
        outDir: 'build',
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/setupTests.js',
    },
});
