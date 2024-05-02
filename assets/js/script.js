const messages = [
  "I'm a software developer based in Nairobi, Kenya.",
  "My favorite food is pizza.",
  "I love coding and solving problems.",
  "I enjoy reading books and playing video games.",
];

const messageContainer = document.querySelector(".message-container");
let message = messageContainer.querySelector(".message");

let currentIndex = 0;

function showNextMessage() {
  currentIndex = (currentIndex + 1) % messages.length;
  const nextMessage = messages[currentIndex];

  let newMessageElement = document.createElement("div");
  newMessageElement.classList.add("message");
  newMessageElement.innerHTML = `<p>${nextMessage}</p>`;
  newMessageElement.style.transform = "translateX(100%)";

  messageContainer.appendChild(newMessageElement);

  setTimeout(() => {
    message.style.transform = "translateX(-100%)";
    newMessageElement.style.transform = "translateX(0)";
  }, 10);

  setTimeout(() => {
    messageContainer.removeChild(message);
    message = newMessageElement;
  }, 500);
}

//change the message every 5 seconds
setInterval(showNextMessage, 2000);
