import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['mapbox-draw-circle-mode'] 
  },
  build: {
    commonjsOptions: {
      include: [/mapbox-draw-circle-mode/, /node_modules/] 
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'mapbox-draw-circle-mode': ['mapbox-draw-circle-mode']
        }
      }
    }
  }
});