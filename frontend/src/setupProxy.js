const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use('/gdpr', createProxyMiddleware({
    target: process.env.GDPR_BACKEND_URL || 'http://127.0.0.1:5000',
    changeOrigin: true,
  }));
};
