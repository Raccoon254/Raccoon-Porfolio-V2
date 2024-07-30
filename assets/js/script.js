const messages = [
	{
		title: 'Fun fact',
		icon: '⚡️',
		gif: '<iframe src="https://giphy.com/embed/26tn33aiTi1jkl6H6" width="480" height="269" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/screen-monitor-closeup-26tn33aiTi1jkl6H6">via GIPHY</a></p>',
		message: "I'm a developer based in Nairobi, Kenya.",
	},
	{ title: 'Food', icon: '🍗',gif: '<iframe src="https://giphy.com/embed/3osxY7eI6enqNBo2mQ" width="480" height="379" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/afv-funny-lol-fail-3osxY7eI6enqNBo2mQ">via GIPHY</a></p>', message: 'My favorite food is grilled meat.' },
	{ title: 'Gamer', icon: '🎮', gif: '<iframe src="https://giphy.com/embed/fDxtUfyFNbNy99dG03" width="480" height="269" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/xbox-game-xbox-series-x-s-fDxtUfyFNbNy99dG03">via GIPHY</a></p>', message: 'I love playing video games.' },
	{ title: 'Music', icon: '🎵', gif: '<iframe src="https://giphy.com/embed/RLcQGYmQU36d3FceiP" width="480" height="480" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/workingtitlefilms-mr-bean-rowan-atkinson-beans-holiday-RLcQGYmQU36d3FceiP">via GIPHY</a></p>', message: 'I like diverse content' },
	{ title: 'Movie', icon: '🎬', gif: '<iframe src="https://giphy.com/embed/8FX0j4oARp3J6" width="480" height="360" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/movie-film-8FX0j4oARp3J6">via GIPHY</a></p>', message: 'My favorite movie is The Dictator.' },
	{ title: 'Show', icon: '🍿', gif: '<iframe src="https://giphy.com/embed/CCFFPwOK9xbamQksxU" width="480" height="271" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/TheSwoon-netflix-swoon-theswoon-CCFFPwOK9xbamQksxU">via GIPHY</a></p>', message: 'My favorite TV show is Money Heist.' },
]

const messageContainer = document.querySelector('.message-container')
let message = messageContainer.querySelector('.message')
const titleElement = document.querySelector('.title')
const iconElement = document.querySelector('.icon')

let currentIndex = 0

function showNextMessage() {
	currentIndex = (currentIndex + 1) % messages.length
	const nextMessage = messages[currentIndex]

	let newMessageElement = document.createElement('div')
	newMessageElement.classList.add('message')
	newMessageElement.innerHTML = `<p>${nextMessage.message}</p>`
	newMessageElement.style.transform = 'translateX(100%)'

	messageContainer.appendChild(newMessageElement)

	setTimeout(() => {
		message.style.transform = 'translateX(-100%)'
		newMessageElement.style.transform = 'translateX(0)'
	}, 40)

	setTimeout(() => {
		messageContainer.removeChild(message)
		message = newMessageElement
		titleElement.textContent = nextMessage.title
		iconElement.textContent = nextMessage.icon
	}, 500)
}

//change the message every 5 seconds
setInterval(showNextMessage, 2000)

//Icons on a circle
function positionIcons() {
	const container = document.querySelector('.icon-container')
	const icons = container.querySelectorAll('i')
	const radius = container.offsetWidth / 2
	const iconCount = icons.length

	icons.forEach((icon, index) => {
		const angle = (index / iconCount) * 2 * Math.PI
		const x = radius + radius * Math.cos(angle) - icon.offsetWidth / 2
		const y = radius + radius * Math.sin(angle) - icon.offsetHeight / 2

		icon.style.left = `${x}px`
		icon.style.top = `${y}px`
	})

	//make the icons rotate
	container.style.animation = 'rotation 20s infinite linear'
	//prevent the icons from rotating as the container rotates
	icons.forEach((icon) => {
		icon.style.animation = 'reverse-rotation 20s infinite linear'
	})

	container.addEventListener('mouseover', () => {
		container.style.animationPlayState = 'paused'
		icons.forEach((icon) => {
			icon.style.animationPlayState = 'paused'
		})
	})

	container.addEventListener('mouseout', () => {
		container.style.animationPlayState = 'running'
		icons.forEach((icon) => {
			icon.style.animationPlayState = 'running'
		})
	})
}

window.addEventListener('load', positionIcons)
window.addEventListener('resize', positionIcons)

function createBackground() {
	const background = document.createElement('div');
	background.classList.add('background');
	document.body.appendChild(background);

	const characters = '01';
	const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
	const gridSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--grid-size'));

	const columns = Math.floor(window.innerWidth / gridSize) + 1;
	const rows = Math.floor(window.innerHeight / gridSize) + 1;

	for (let i = 0; i < columns; i++) {
		for (let j = 0; j < rows; j++) {
			const char = document.createElement('span');
			char.classList.add('character');
			background.appendChild(char);

			const x = i * gridSize;
			const y = j * gridSize;
			char.style.left = `${x}px`;
			char.style.top = `${y}px`;

			setInterval(() => {
				const random = Math.random();
				if (random < 0.8) {
					char.textContent = characters[Math.floor(Math.random() * characters.length)];
				} else {
					char.textContent = specialChars[Math.floor(Math.random() * specialChars.length)];
				}
			}, Math.random() * 5000 + 1000);

			//Random color
			setInterval(() => {
				char.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
			}, Math.random() * 5000 + 1000);
		}
	}
}

window.addEventListener('load', createBackground);
window.addEventListener('resize', () => {
	document.querySelector('.background').remove();
	createBackground();
});

//ABCDEFGHIJKLMNOPQRSTUVWXYZ
const letters = "abcdefghijklmnopqrstuvwxyz";

let interval = null;

document.querySelector(".name").onmouseover = event => {  
  let iteration = 0;
  
  clearInterval(interval);
  
  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return event.target.dataset.value[index];
        }
      
        return letters[Math.floor(Math.random() * 26)]
      })
      .join("");
    
    if(iteration >= event.target.dataset.value.length){ 
      clearInterval(interval);
    }
    
    iteration += 1 / 3;
  }, 60);
}