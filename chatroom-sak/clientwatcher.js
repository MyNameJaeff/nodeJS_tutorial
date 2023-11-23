const express = require("express");
const { time } = require("node:console");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("userIsTyping", (isTyping) => {
    io.emit("someone is writing", isTyping);
    console.log("A user is typing");
  });
  socket.on("stop typing", () => {
    console.log("User stopped typing");
    io.emit("not any more");
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
