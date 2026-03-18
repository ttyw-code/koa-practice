const http = require('http');
const app = require('./app');
const config = require('./config');
const db = require('./db/mongoose');
const createSocketServer = require('./webSocket/server');

async function start() {
  await db.connect();
  console.log('MongoDB connected');

  const httpServer = http.createServer(app.callback());
  const sockjsServer = createSocketServer();
  sockjsServer.installHandlers(httpServer);

  httpServer.listen(config.port, () => {
    console.log(`Server started at http://localhost:${config.port}`);
    console.log(`WebSocket ready at ws://localhost:${config.port}/sockjs`);
  });
}

start().catch((err) => {
  console.error('Failed to start app', err);
  process.exit(1);
});
