const sockjs = require('sockjs');

function createSocketServer() {
  const sockjsServer = sockjs.createServer({ prefix: '/sockjs' });

  const connections = new Set();
  sockjsServer.on('connection', (conn) => {
    connections.add(conn);
    console.log('SockJS connected:', conn.id);

    conn.on('data', (message) => {
      console.log('Socket message:', message);
      connections.forEach((client) => {
        if (client.readyState === sockjs.OPEN) {
          client.write(`Echo: ${message}`);
        }
      });
    });

    conn.on('close', () => {
      connections.delete(conn);
      console.log('Socket closed:', conn.id);
    });
  });

  return sockjsServer;
}

module.exports = createSocketServer;
