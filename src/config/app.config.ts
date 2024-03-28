export default () => ({
  app: {
    port: parseInt(process.env.PORT) || 3000,
    api_prefix: process.env.API_PREFIX || 'api',
    timezone: process.env.APP_TIMEZONE || 'Asia/Jakarta',
  },
});
