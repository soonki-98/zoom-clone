const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
const socket = new WebSocket(`ws://${window.location.host}`);
const senderID = Math.floor(Math.random() * 100);

socket.addEventListener("open", (e) => {
  console.log("Connected to Server");
});

socket.addEventListener("message", (message) => {
  console.log("New message: ", message.data, " from the server");
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server");
});

const handleSubmit = (e) => {
  e.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(JSON.stringify({ message: input.value, sender: senderID }));
  input.value = "";
};

messageForm.addEventListener("submit", handleSubmit);
