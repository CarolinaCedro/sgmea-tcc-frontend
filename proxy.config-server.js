const PROXY_CONFIG = [
  {
    context: [
      "*"
    ],
    target: "http://localhost:8083",
    secure: false,
    logLevel: "debug",
    changeOrigin: true
  }
];

module.exports = PROXY_CONFIG;
