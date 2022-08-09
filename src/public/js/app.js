const socket = io();

const welcomeDiv = document.getElementById("welcome");
const form = welcomeDiv.querySelector("form");

const handleRoomSubmit = (e) => {
  e.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enterRoom", { payload: input.value });
  input.value = "";
};

form.addEventListener("submit", handleRoomSubmit);
