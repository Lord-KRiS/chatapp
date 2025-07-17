import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const port = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  },
});

io.on("connect", (socket) => {
  console.log("User connected", socket.id);
  socket.join("public");

  socket.on("join-room", (room) => {
    console.log("Rooom joined", room);
    socket.join(room);
  });

  socket.on("leave-room", (room) => {
    console.log("Rooom left", room);
    socket.leave(room);
  });

  socket.on("msg for room", (room, message) => {
    console.log(`Message received ${message} for room ${room}`);
    socket.to(room).emit("msg for clients", message);
  });

  socket.on("message", (msg) => {
    console.log("Msg received:", msg);
    io.emit("receive-message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
