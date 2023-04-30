const { createProxyMiddleware } = require('http-proxy-middleware');

const host = "http://localhost:4000/"

module.exports = function(app) {
  app.use(
    '/wordl', 
    createProxyMiddleware({
      target: host,
      changeOrigin: true,
    })
  );
};