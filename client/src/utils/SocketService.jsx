import { io } from "socket.io-client";

// const socket = io('http://localhost:8800');
const socket = io('https://chat-app-thbf.vercel.app');

export default socket;
