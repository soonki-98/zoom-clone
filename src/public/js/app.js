const SOCKET_EVENTS = {
  CREATE_ROOM: "CREATE_ROOM",
  ENTER_ROOM: "ENTER_ROOM",
};

const socket = io();

const welcomeDiv = document.getElementById("welcome");
const form = welcomeDiv.querySelector("form");

const backendDone = () => {
  alert("::::::done");
};

const handleRoomSubmit = (e) => {
  e.preventDefault();
  const input = form.querySelector("input");
  socket.emit(SOCKET_EVENTS.ENTER_ROOM, { roomName: input.value }, backendDone);
  input.value = "";
};

form.addEventListener("submit", handleRoomSubmit);
