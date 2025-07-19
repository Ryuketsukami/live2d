// nuxt.config.ts
import path from 'path'

const config = {
  // Enable Nuxt 4 features
  future: {
    compatibilityVersion: 4,
  },

  // Development server configuration
  devServer: {
    port: 5000,
  },

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: false,
  },

  // Modules
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui'
  ],

  // Vite configuration for Cubism SDK
  vite: {
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
      alias: {
        '@framework': path.resolve(__dirname, 'public/sdk/Framework/src'),
      },
    },
    build: {
      target: 'esnext',
      sourcemap: process.env.NODE_ENV === 'development',
    },
    server: {
      fs: {
        allow: ['..'],
      },
    },
    optimizeDeps: {
      exclude: ['live2dcubismcore'], // Exclude from optimization
    },
    define: {
      // Define global for Live2D
      global: 'globalThis',
    },
  },

  // Add app configuration for client-side setup
  app: {
    head: {
      script: [
        {
          src: '/sdk/Core/live2dcubismcore.min.js',
          defer: true
        }
      ]
    }
  },
  // SSR configuration - DISABLE for Cubism SDK
  ssr: false, // Cubism SDK requires client-side only

  runtimeConfig: {
    public: {},
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  content: {},
  image: {},

  compatibilityDate: '2024-07-19',
}

export default config