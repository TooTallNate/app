const proxy = require("http-proxy-middleware");
const Agent = require("agentkeepalive");

module.exports = function(app) {
  app.use(
    proxy("/api", {
      target: process.env.NAV_BASE_URL,
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
      agent: new Agent({
        maxSockets: 100,
        keepAlive: true,
        maxFreeSockets: 10,
        keepAliveMsecs: 1000,
        timeout: 60000,
        freeSocketTimeout: 30000
      }),
      onProxyRes: proxyRes => {
        var key = "www-authenticate";
        proxyRes.headers[key] =
          proxyRes.headers[key] && proxyRes.headers[key].split(",");
      }
    })
  );
};
