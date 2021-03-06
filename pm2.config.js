module.exports = {
  apps: [
    {
      name: 'kova',
      script: 'dist/main.js',
      exec_mode: 'cluster',
      max_memory_restart: '800M',
      max_restarts: 10,
      min_uptime: 5000,
      instances: 0,
      env: {
        NODE_ENV: 'production',
        ENABLE_NODE_LOG: 'YES',
      },
    },
  ],
}
