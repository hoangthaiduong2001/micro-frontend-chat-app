import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import routes from './app/routes';
import { ChatSocket } from './app/sockets/chat.socket';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());
app.use('/api', routes);

ChatSocket(io);

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
