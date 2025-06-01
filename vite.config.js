import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js', // Assuming this path is correct for your project
    
    // THIS IS THE NEW SECTION TO ADD FOR COVERAGE
    coverage: {
      reporter: ['text', 'json', 'html', 'clover', 'lcov'], // Ensure 'lcov' is here
      dir: './coverage', // Directory where reports will be saved
      // You might also want to include:
      // provider: 'v8', // or 'istanbul', default is 'v8' with Vitest 1.x+
      // all: true, // Collect coverage from all files, even if not tested
      // include: ['src/*/.{js,jsx,ts,tsx}'], // Specify files to include in coverage
      // exclude: ['node_modules/', 'dist/', '.vite/', 'coverage/', '*/index.ts', '/main.ts', '/.d.ts'], // Exclude paths
    },
  },
});