const { loadConfig } = require('@kova/cli')
const config = loadConfig()
/**
 * @type {import('ssr-server-utils').UserConfig}
 */
module.exports = {
  css: () => ({
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: require('less-vars-to-js').default?.(
            require('fs').readFileSync('./web/variables.less', 'utf8'),
          ),
          javascriptEnabled: true,
        },
      },
    },
  }),
  chainClientConfig(config) {
    config.optimization.get('splitChunks').chunks = 'initial'
    if (process.env.BUNDLE_ANALYZE === 'true') {
      config
        .plugin('webpack-bundle-analyzer')
        .use(new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({ analyzerPort: 9999 }))
    }
    config.plugin('antd-dayjs-webpack-plugin').use(new (require('antd-dayjs-webpack-plugin'))())
    return config.toConfig()
  },
}
