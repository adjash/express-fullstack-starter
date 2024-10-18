import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import path from "path";

import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.get("/users", (req, res) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.json({ users: ["user1", "user2", "use3"] });
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
