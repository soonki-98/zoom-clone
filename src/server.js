import http from "http";
import SocketIO from "socket.io";
import express from "express";
import { SOCKET_EVENTS } from "./core/types";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));

const httpServer = http.createServer(app);
const io = SocketIO(httpServer);
const rooms = {};

io.on("connection", (socket) => {
  socket.on(SOCKET_EVENTS.ENTER_ROOM, (payload, done) => {
    const { roomName } = payload;
    rooms[roomName] = {
      name: roomName,
      status: "opened",
    };
    setTimeout(() => {
      done();
    }, 1000);
    console.log(rooms);
  });
});

httpServer.listen(3000, () => console.log("Listening on http://localhost:3000"));
