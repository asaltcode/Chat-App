import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from "cors"

dotenv.config();

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: ["http://localhost:5173", "https://chat-app-pgpl.vercel.app"],
    methods: ["GET", "POST", "OPTIONS"]
  },
  pingTimeout: 6000 // Increase the ping timeout to 6 seconds
});

let activeUsers = [];

app.get('/', (req, res) => {
  res.status(200).send({
    message: `Socket Server run successfully ${process.env.PORT}`
  });
});

io.on("connection", (socket) => {
  socket.on("new-user-add", (newUserId) => {
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user?.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    io.emit("get-users", activeUsers);
  });

  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user?.userId === receiverId);
    console.log("Sending from socket to :", receiverId);
    console.log("Data: ", data);
    if (user) {
      io.to(user.socketId).emit("receive-message", data);
    }
  });
});

server.listen(process.env.PORT || 8800, () => {
  console.log(`Socket server running on port ${process.env.PORT || 8800}`);
});
