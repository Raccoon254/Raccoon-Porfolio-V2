const messages = [
  {
    title: "Fun fact",
    icon: "⚡️",
    message: "I'm a developer based in Nairobi, Kenya.",
  },
  { title: "Food", icon: "🍗", message: "My favorite food is grilled meat." },
  { title: "Gamer", icon: "🎮", message: "I love playing video games." },
  { title: "Music", icon: "🎵", message: "I like diverse content" },
  { title: "Movie", icon: "🎬", message: "My favorite movie is The Dictator." },
  { title: "Show", icon: "🍿", message: "My favorite TV show is Money Heist." },
];

const messageContainer = document.querySelector(".message-container");
let message = messageContainer.querySelector(".message");
const titleElement = document.querySelector(".title");
const iconElement = document.querySelector(".icon");

let currentIndex = 0;

function showNextMessage() {
  currentIndex = (currentIndex + 1) % messages.length;
  const nextMessage = messages[currentIndex];

  let newMessageElement = document.createElement("div");
  newMessageElement.classList.add("message");
  newMessageElement.innerHTML = `<p>${nextMessage.message}</p>`;
  newMessageElement.style.transform = "translateX(100%)";

  messageContainer.appendChild(newMessageElement);

  setTimeout(() => {
    message.style.transform = "translateX(-100%)";
    newMessageElement.style.transform = "translateX(0)";
  }, 40);

  setTimeout(() => {
    messageContainer.removeChild(message);
    message = newMessageElement;
    titleElement.textContent = nextMessage.title;
    iconElement.textContent = nextMessage.icon;
  }, 500);
}

//change the message every 5 seconds
setInterval(showNextMessage, 2000);

//Icons on a circle
function positionIcons() {
  const container = document.querySelector('.icon-container');
  const icons = container.querySelectorAll('i');
  const radius = container.offsetWidth / 2;
  const iconCount = icons.length;

  icons.forEach((icon, index) => {
      const angle = (index / iconCount) * 2 * Math.PI;
      const x = radius + radius * Math.cos(angle) - icon.offsetWidth / 2;
      const y = radius + radius * Math.sin(angle) - icon.offsetHeight / 2;

      icon.style.left = `${x}px`;
      icon.style.top = `${y}px`;
  });

  //make the icons rotate
  container.style.animation = 'rotation 20s infinite linear';
  //prevent the icons from rotating as the container rotates
  icons.forEach(icon => {
      icon.style.animation = 'reverse-rotation 20s infinite linear';
  });
}

window.addEventListener('load', positionIcons);
window.addEventListener('resize', positionIcons);