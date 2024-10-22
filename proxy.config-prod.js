const PROXY_CONFIG = [
  {
    context: ["/api"],
    target: "https://cedro.dev.br",
    secure: true,
    logLevel: "debug",
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      if (req.headers.authorization) {
        proxyReq.setHeader('Authorization', req.headers.authorization);
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
      proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With';
      proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
    }
  }
];

module.exports = PROXY_CONFIG;
