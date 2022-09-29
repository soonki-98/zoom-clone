const SOCKET_EVENTS = {
  CREATE_ROOM: "CREATE_ROOM",
  ENTER_ROOM: "ENTER_ROOM",
};

const socket = io();

const welcomeDiv = document.getElementById("welcome");
const roomDiv = document.getElementById("room");
const form = welcomeDiv.querySelector("form");

let roomName = "";

roomDiv.hidden = true;

const showRoom = () => {
  welcomeDiv.hidden = true;
  roomDiv.hidden = false;
  roomDiv.querySelector("h1").innerText = roomName;
  alert("join room!");
};

const handleRoomSubmit = (e) => {
  e.preventDefault();
  const input = form.querySelector("input");
  roomName = input.value;
  socket.emit(SOCKET_EVENTS.ENTER_ROOM, { roomName }, showRoom);
  input.value = "";
};

form.addEventListener("submit", handleRoomSubmit);
