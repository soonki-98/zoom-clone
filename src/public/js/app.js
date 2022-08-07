const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nicknameForm = document.querySelector("#nickname");
const socket = new WebSocket(`ws://${window.location.host}`);
let senderNickname = "";

socket.addEventListener("open", (e) => {
  console.log("Connected to Server");
});

socket.addEventListener("message", (message) => {
  const { msg, sender } = JSON.parse(message.data);
  const li = document.createElement("li");
  li.style.listStyle = "none";
  if (sender === senderNickname) {
    li.style.textAlign = "right";
  }
  li.innerText = `${sender}: ${msg}`;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server");
});

const handleSubmit = (e) => {
  e.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(JSON.stringify({ message: input.value, sender: senderNickname }));
  input.value = "";
};

const handleNickname = (e) => {
  e.preventDefault();
  const input = nicknameForm.querySelector("input");
  senderNickname = input.value;
  input.value = "";
};

console.log(nicknameForm);
messageForm.addEventListener("submit", handleSubmit);
nicknameForm.addEventListener("submit", handleNickname);
