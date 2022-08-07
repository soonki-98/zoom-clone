import http from "http";
import express from "express";
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));

const handleListen = () => {
  console.log("Listening on http://localhost:3000");
};

const sockets = [];

const handleConnection = (socket) => {
  console.log("Connect to Browser");
  sockets.push(socket);
  socket.on("close", () => console.log("Disconnected from Browser"));
  socket.on("message", (data, isBinary) => {
    const { message, sender, id } = JSON.parse(data.toString());
    sockets.forEach((s) => {
      s.send(JSON.stringify({ msg: message, sender: sender || "익명", id }));
    });
  });
};

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", handleConnection);

server.listen(3000, handleListen);
