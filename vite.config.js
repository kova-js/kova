const { join } = require('path')
const reactRefresh = require('@vitejs/plugin-react-refresh')
const genericNames = require('generic-names')

/**
 * @type {import('vite').UserConfig}
 */
module.exports = {
  plugins: [
    reactRefresh()
  ],
  define: {
    __isBrowser__: true
  },
  css: {
    modules: {
      generateScopedName: function (name, filename, css) {
        // 对齐 css-loader 与 postcss-modules 生成 hash 方式, 不要修改
        return genericNames('[name]__[local]___[hash:base64:5]', {
          context: process.cwd()
        })(name, filename)
      }
    }
  },
  resolve: {
    alias: {
      '@': join(process.cwd(), './web'),
      _build: join(process.cwd(), './build')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  build: {
    rollupOptions: {
      input: './node_modules/ssr-plugin-react/esm/entry/client-entry.js'
    }
  }
}
