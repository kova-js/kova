const bundleInfo = require('./package.json')

module.exports = {
  apps: [
    {
      name: bundleInfo.name,
      script: 'dist/main.js',
      exec_mode: 'cluster',
      max_memory_restart: '800M',
      instances: 0,
      env: {
        NODE_ENV: 'production',
        ENABLE_NODE_LOG: 'YES',
      },
    },
  ],
}
