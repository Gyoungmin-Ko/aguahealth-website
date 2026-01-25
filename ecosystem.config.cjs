module.exports = {
  apps: [
    {
      name: 'aguahealth-website',
      script: 'python3',
      args: '-m http.server 3000 --directory dist',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork'
    }
  ]
}
