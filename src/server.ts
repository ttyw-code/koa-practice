import http from 'http';
import app from './app.js';
import config from './config/index.js';
import * as db from './db/mongoose.js';
import createSocketServer from './webSocket/server.js';

async function start(): Promise<void> {
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
