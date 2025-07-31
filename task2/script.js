const socket = new WebSocket("ws://localhost:3000");

const chatBox = document.getElementById("chat");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send");

// Send message
sendButton.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (message) {
    socket.send(message);
    messageInput.value = "";
  }
});

// Receive message
socket.addEventListener("message", async (event) => {
  if (event.data instanceof Blob) {
    const text = await event.data.text(); // FIX for Blob issue
    chatBox.value += "Friend: " + text + "\n";
  } else {
    chatBox.value += "Friend: " + event.data + "\n";
  }
});
