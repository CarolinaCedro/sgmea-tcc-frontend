const PROXY_CONFIG = [
  {
    context: ["/api"],
    target: "http://ec2-3-208-47-127.compute-1.amazonaws.com:8083", // Altere para o seu servidor de produção
    secure: false, // Defina como true se o servidor de produção usar HTTPS
    logLevel: "debug",
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      // Repassa o header de autorização
      if (req.headers.authorization) {
        proxyReq.setHeader('Authorization', req.headers.authorization);
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      // Adiciona cabeçalhos de CORS se necessário
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
      proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With';
      proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
    }
  }
];

module.exports = PROXY_CONFIG;
