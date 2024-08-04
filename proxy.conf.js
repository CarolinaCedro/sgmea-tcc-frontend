const PROXY_CONFIG = [
  {
    context: [
      "/api/auth/login"
    ],
    "target": "http://localhost:8083",
    "secure": false,
    "logLevel": "debug"
  }
];

module.exports = PROXY_CONFIG;
