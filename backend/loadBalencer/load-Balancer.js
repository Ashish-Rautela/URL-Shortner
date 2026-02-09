const http = require('http');
const httpProxy = require('http-proxy');
const axios = require('axios');

const proxy = httpProxy.createProxyServer();

const servers = [
  { url: 'http://localhost:3000', active: 0 },
  { url: 'http://localhost:3001', active: 0 },
  { url: 'http://localhost:3002', active: 0 },
];

function getLeastLoadedServer() {
  return servers.reduce((prev, curr) =>
    curr.active < prev.active ? curr : prev
  );
}

const balancer = http.createServer((req, res) => {
  const server = getLeastLoadedServer();
  server.active++;

  proxy.web(req, res, { target: server.url });

  res.on('finish', () => {
    server.active--;
  });
});

async function healthCheck() {
  for (const server of servers) {
    try {
      await axios.get(server.url + '/health');
      server.down = false;
    } catch {
      server.down = true;
    }
  }
}

setInterval(healthCheck, 5000);

balancer.listen(8080, () => {
  console.log('Smart Load Balancer running on 8080');
});
