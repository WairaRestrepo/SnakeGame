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
let interval;
let accumulator = 1;
let divs;
let idInterval;
let foodIndex;
let scoreCount = 0;

let buttonsmusic =new Audio ('./music/lifeandfood.wav');
let muertemusic = new Audio ('./music/muerte.wav');
let playgamemusic = new Audio ('./music/comenzar.wav');


//https://www.javascripttutorial.net/javascript-dom/javascript-keyboard-events/#:~:text=The%20keyboard%20event%20properties&text=The%20key%20property%20returns%20the,code%20returns%20KeyZ%20.
//http://www.java2s.com/example/javascript/dom/switch-on-key-code-in-key-down-event-handler.htmlhttp://www.java2s.com/example/javascript/dom/switch-on-key-code-in-key-down-event-handler.html
document.addEventListener('keydown', (event) => {
  switch (event.code) {
      case 'ArrowUp':
          up();
          buttonsmusic.play();
          break;
      case 'ArrowDown':
          down();
          buttonsmusic.play();
          break;
      case 'ArrowLeft':
          left();
          buttonsmusic.play();
          break;
      case 'ArrowRight':
          right();
          buttonsmusic.play();
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
  console.log(interval)
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
    clearInterval(idInterval)
    console.log("Entra a eatFood")
    divs[foodIndex].classList.remove('food');
    snake.unshift(tail);
    divs[tail].classList.add('snake');

    if (scoreCount <= 5) {//para que cuando coma cambie la velocidad
      score.innerText = ++scoreCount;
      randomFood();
      if(interval != 100){
        interval = interval - 100; //Velocidad limite
      }
      idInterval = setInterval(moveSnake, interval);
      
      console.log('test de ingreso a quitar velocidad')
    } else {

      alert('¡Felicidades ganador! has completado todos los puntos permitidos');
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
    muertemusic.play();
  }
  return false;
}

function startGame() {// se activa cuando le damos a el boton playButton
  buttonsmusic.play();
  console.log("Esta llamando StartGame")
  clearGame();
  idInterval = setInterval(() => {
    moveSnake();
  }, interval);
}

function clearGame() {
  snake = [0, 1, 2];
  box.innerHTML = '';
  accumulator = 1;
  interval = 500;
  console.log(interval)
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