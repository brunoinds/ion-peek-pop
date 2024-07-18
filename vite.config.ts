import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    cssCodeSplit: true,
    
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'IonPeekPop',
      fileName: (format) => `ion-peek-pop.${format}.js`,
    },

    //These packages should be imported as dependencies and not bundled as lib deps: "@ionic/vue":  "^7.0.0", "@capacitor/haptics": "5.0.6", "@vueuse/components": "^10.11.0", "@vueuse/core": "^10.11.0"
    rollupOptions: {
      external: ['vue', '@ionic/vue', '@capacitor/haptics', '@vueuse/components', '@vueuse/core'],
      output: {
        globals: {
          vue: 'Vue',
          '@ionic/vue': 'IonicVue',
          '@capacitor/haptics': 'Haptics',
          '@vueuse/components': 'useComponents',
          '@vueuse/core': 'useCore'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == "index.css") return "styles.css";
          return assetInfo.name;
        }
      }
    }
  }
})

