import { Server } from 'socket.io';
import { getTrending } from './controllers/tmdbController';
 
export const initSocket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);
 
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
 
  // Push trending updates every 5 minutes to ALL clients
  setInterval(async () => {
    const [movies, tv] = await Promise.all([
      getTrending('movie'),
      getTrending('tv'),
    ]);
    io.emit('trending:update', { movies, tv });
    console.log('📡 Trending update pushed to all clients');
  }, 5 * 60 * 1000);
};
