'use strict';
/**
 * @type {import('ssr-server-utils').UserConfig}
 */
module.exports = {
  corejs: true,
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
    return config.toConfig()
  },
}
