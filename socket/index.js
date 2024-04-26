// main.js
import { server } from './server.js';
import { Server } from 'socket.io';

const io = new Server(server, {
  pingTimeout: 60000, // Increase the ping timeout to 60 seconds
});

// Additional Socket.IO server configuration and event handlers can be added here
