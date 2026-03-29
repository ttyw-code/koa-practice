import sockjs from 'sockjs';

const SOCKJS_OPEN = 1;

function createSocketServer(): sockjs.Server {
  const sockjsServer = sockjs.createServer({ prefix: '/sockjs' });

  const connections = new Set<sockjs.Connection>();

  sockjsServer.on('connection', (conn: sockjs.Connection) => {
    connections.add(conn);
    console.log('SockJS connected:', conn.id);

    conn.on('data', (message: string) => {
      console.log('Socket message:', message);
      connections.forEach((client) => {
        if (client.readyState === SOCKJS_OPEN) {
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

export default createSocketServer;
