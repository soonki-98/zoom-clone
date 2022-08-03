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

const handleConnection = (socket) => {
  console.log(socket);
};

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", handleConnection);

server.listen(3000, handleListen);
