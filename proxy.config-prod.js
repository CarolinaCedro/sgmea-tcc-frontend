const PROXY_CONFIG = [
  {
    context: ["/api"],
    target: "https://ec2-3-208-47-127.compute-1.amazonaws.com", // HTTPS na porta 443 por padrão
    secure: true, // Certifique-se de que está true, pois o servidor usa HTTPS
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
