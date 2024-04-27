import { Server } from "socket.io";
import dotenv from 'dotenv';
import http from 'http';

dotenv.config();
const PORT = process.env.PORT || 8800;

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://chat-app-pgpl.vercel.app"]
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }
    // send all active users to new user
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });

  // send message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("Sending from socket to :", receiverId);
    console.log("Data: ", data);
    if (user) {
      io.to(user.socketId).emit("receive-message", data); // Corrected typo here
    }
  });
});

server.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`);
});

io.on("error", (error) => {
  console.error("Socket server error:", error);
});
