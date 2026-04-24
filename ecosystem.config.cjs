/** PM2 process file — run from the app root: `pm2 start ecosystem.config.cjs` */

module.exports = {
  apps: [
    {
      name: "commpledges",
      cwd: __dirname,
      script: "npm",
      args: "run start",
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
