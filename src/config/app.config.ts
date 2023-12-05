export default () => ({
  app: {
    port: parseInt(process.env.APP_PORT) || 3000,
    api_prefix: process.env.API_PREFIX || 'api',
  },
});
