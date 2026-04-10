import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import moviesRouter   from './routes/moviesRoute';
import cartoonsRouter from './routes/cartoonsRoute';
import { initSocket } from './socket';
 
const app    = express();
const server = createServer(app);
const io     = new Server(server, { cors: { origin: process.env.CLIENT_URL } });
 
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
 
app.use('/api/movies',   moviesRouter);
app.use('/api/cartoons', cartoonsRouter);
 
initSocket(io);
 
server.listen(process.env.PORT || 5000, () =>
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
);
