module.exports = {
  apps: [
    {
      name: 'xtracover-b2e-backend',
      script: './server/index.js',
      instances: 1, // Or 'max' for cluster mode
      exec_mode: 'fork', // Set to 'cluster' for load balancing across CPUs
      watch: false,
      env: {
        NODE_ENV: 'development',
        PORT: 5012
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5012
      }
    }
  ]
}
