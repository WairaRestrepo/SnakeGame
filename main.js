let snake = [0, 1, 2];
const size = 10;
//Elementos Html
const box = document.getElementById('snake-box');
const playButton = document.getElementById('play-button');
const downButton = document.getElementById('down-button');
const upButton = document.getElementById('up-button');
const leftButton = document.getElementById('left-button');
const rightButton = document.getElementById('right-button');
const score = document.getElementById('score');

//Configuraciones del juego 
let interval = 500;
let accumulator = 1;
let divs;
let idInterval;
let foodIndex;
let scoreCount = 0;

/*let buttonsmusic = new Audio;
let muertemusic = new Audio('./music/muerte.wav');
let playgamemusic = new Audio;
muertemusic.play();*/


document.addEventListener('keydown', (event) => {
  switch (event.code) {
      case 'ArrowUp':
          up();
          break;
      case 'ArrowDown':
          down();
          break;
      case 'ArrowLeft':
          left();
          break;
      case 'ArrowRight':
          right();
          break;
  }
});

playButton.addEventListener('click', () => {
  startGame();
});
upButton.addEventListener('click', () => {
  up();
});
downButton.addEventListener('click', down);
leftButton.addEventListener('click', () => {
  left();
});
rightButton.addEventListener('click', () => {
  right();
});

function createBox() {//para crear el box de la culebrita 
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const div = document.createElement('div');
      box.appendChild(div);
    }
  }
}

function drawSnake() {//Dibujar la serpiente
  divs = document.querySelectorAll('.box div');
  snake.forEach((index) => divs[index].classList.add('snake'));
}

function moveSnake() {//Para que se mueva
  const tail = snake.shift();
  divs[tail].classList.remove('snake');
  const head = snake[snake.length - 1] + accumulator;
  if (isCollision(head) || isCollision(snake)) {
    alert('game over');
    clearGame();
    return;
  }

  snake.push(head);
  divs[head].classList.add('snake');

  // food
  eatFood(tail);
}




function eatFood(tail) {//para que coma la culebrita tail=cola
  if (snake[snake.length - 1] === foodIndex) {
    divs[foodIndex].classList.remove('food');
    snake.unshift(tail);
    divs[tail].classList.add('snake');

    if (scoreCount <= 4) {//para que cuando coma cambie la velocidad
      score.innerText = ++scoreCount;
      randomFood();
      interval = interval - 15;
      idInterval = setInterval(() => { moveSnake(); }, interval);
      console.log('test de ingreso a quitar velocidad')
    } else {

      alert('!Felicidades ganador¡ has completado todos los puntos permitidos');
      clearGame();

    }

  }
}



function isCollision(index) {//Cuando choca
  if (
    index >= size * size
    || index < 0
    || (accumulator === 1 && index % size === 0)
    || (accumulator === -1 && (index + 1) % size === 0)
  ) {
    return true;
  }
  return false;
}

function startGame() {// se activa cuando le damos a el boton playButton
  clearGame();
  idInterval = setInterval(() => {
    moveSnake();
  }, interval);
}

function clearGame() {
  snake = [0, 1, 2];
  box.innerHTML = '';
  accumulator = 1;
  /*interval = 500;*/
  scoreCount = 0;
  score.innerText = scoreCount;
  clearInterval(idInterval);
  createBox();
  drawSnake();
  randomFood();
}

function up() {
  accumulator = -size;
}

function down() {
  accumulator = size;
}

function left() {
  accumulator = -1;
}

function right() {
  accumulator = 1;
}

function randomFood() {//para ubicar la comida en un lugar
  foodIndex = Math.floor(Math.random() * divs.length);
  while (snake.includes(foodIndex)) {
    foodIndex = Math.floor(Math.random() * divs.length);
  }
  divs[foodIndex].classList.add('food');
}

clearGame();