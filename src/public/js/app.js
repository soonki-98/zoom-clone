const SOCKET_EVENTS = {
  CREATE_ROOM: "CREATE_ROOM",
  ENTER_ROOM: "ENTER_ROOM",
  SEND_MESSAGE: "SEND_MESSAGE",
};

const socket = io();

const welcomeDiv = document.getElementById("welcome");
const roomDiv = document.getElementById("room");
const form = welcomeDiv.querySelector("form");
const sendForm = roomDiv.querySelector("form");

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
sendForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = sendForm.querySelector("input");
  socket.emit(SOCKET_EVENTS.SEND_MESSAGE, { message: input.value });
  input.value = "";
});

function sendMessage(message) {
  const ul = roomDiv.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

socket.on(SOCKET_EVENTS.SEND_MESSAGE, sendMessage);
